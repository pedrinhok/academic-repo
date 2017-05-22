const express = require("express")
const utils = require("../helpers/utils")

const controllers = {
  files: require("../controllers/files"),
  tags: require("../controllers/tags"),
  works: require("../controllers/works")
}

var router = express.Router()

router.route("/tags")
  .get(controllers.tags.index)

router.route("/works")
  .get(controllers.works.index)
  .post(controllers.works.create)

router.route("/works/:id")
  .all(controllers.works.get)
  .get(controllers.works.show)
  .put(controllers.works.update)
  .delete(controllers.works.delete)

router.route("/works/:id/upload")
  .all(controllers.works.get)
  .post(controllers.files.upload)

router.route("/works/:id/download/:filename")
  .all(controllers.works.get)
  .get(controllers.files.download)

module.exports = function(server){
  server.use("/api", router)
  server.use(function(req, res, next){
    res.send(404)
  })
}
