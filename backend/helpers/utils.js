exports.hashCode = function(str){
  var hash = 0
  if(str.length == 0) return hash
  for(i = 0; i < str.length; i++){
    var char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}

exports.notFound = function(res, record){
  res.send(404)
}
