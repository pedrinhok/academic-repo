const files = require("./files")
const utils = require("../helpers/utils")
const Work = require("../models/work")

exports.index = function(req, res){
  var query = searchQuery(req)
  Work.find(query, function(err, works){
    res.send(works)
  })
}

exports.create = function(req, res){
  var work = new Work()
  attributes(work, req.body)
  work.save(function(err){
    if(err) return res.send(err)
    res.send(work)
  })
}

exports.show = function(req, res){
  res.send(req.work)
}

exports.update = function(req, res){
  if(req.body.files) files.handle(req)
  attributes(req.work, req.body)
  req.work.updated_at = Date.now()
  req.work.save(function(err){
    if(err) return res.send(err)
    res.send(req.work)
  })
}

exports.delete = function(req, res){
  Work.remove({ _id: req.params.id }, function(err, work){
    if(err) return res.send(err)
    res.send(work)
  })
}

exports.get = function(req, res, next){
  Work.findById(req.params.id, function(err, work){
    if(!work) return utils.notFound(res, "work")
    req.work = work
    next()
  })
}

function attributes(work, params){
  for(var attribute in params){ work[attribute] = params[attribute] }
}

function searchQuery(req){
  var conditions = []
  if(req.query.text){
    conditions.push({ title: { $regex: new RegExp(req.query.text, "i") } })
    conditions.push({ description: { $regex: new RegExp(req.query.text, "i") } })
  }
  if(req.query.tags){
    var tags = req.query.tags.split(",")
    for(var tag of tags){
      conditions.push({ tags: tag })
    }
  }
  var query = conditions.length > 0 ? { $or: conditions } : {}
  return query
}
