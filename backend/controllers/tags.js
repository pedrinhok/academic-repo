const Work = require("../models/work")

exports.index = function(req, res){
  Work.aggregate({
    $unwind: "$tags"
  }, {
    $group: { _id: "$tags" }
  }, {
    $sort: { _id: 1 }
  }, function(err, tags){
    tags = tags.map(function(tag){ return tag._id })
    res.send(tags)
  })
}
