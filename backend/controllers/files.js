const fs = require("fs")
const multer = require("multer")

const utils = require("../helpers/utils")
const Work = require("../models/work")

exports.download = function(req, res){
  Work.findOne({ _id: req.params.id }, { files: { $elemMatch: { filename: req.params.filename } } }, function(err, work){
    if(err) return res.send(err)
    var file = work.files[0]
    res.download(`${destination(work)}/${file.filename}`, file.original, function(err){
      if(err) return res.send(err)
      Work.update({ _id: req.params.id }, { $inc: { downloads: 1 } }, function(err, data){
        if(err) return res.send(err)
        return
      })
    })
  })
}

exports.handle = function(req){
  var files = {
    remove: req.body.files.filter(function(file){ return file._remove }),
    save: req.body.files.filter(function(file){ return !file._remove })
  }
  for(file of files.remove){
    fs.unlink(`${destination(req.work)}/${file.filename}`)
  }
  req.work.files = files.save
  delete req.body.files
}

exports.upload = function(req, res){
  var upload = multer({ storage: storage(req.work) }).single("file")
  upload(req, res, function(err){
    if(err) return res.send(err)
    Work.update({ _id: req.params.id }, { $push: { files: prepare(req.file) } }, function(err, data){
      if(err) return res.send(err)
      res.send(200)
    })
  })
}

function destination(work){ return `uploads/${work._id}` }

function filename(file){
  file.extension = file.originalname.split(".").pop()
  file.filename = `${Date.now()}${utils.hashCode(file.originalname)}.${file.extension}`
  return file.filename
}

function prepare(file){
  return {
    original: file.originalname,
    filename: file.filename,
    extension: file.extension,
    size: file.size
  }
}

function storage(work){
  return multer.diskStorage({
    destination: destination(work),
    filename: function(req, file, cb){ cb(null, filename(file)) }
  })
}
