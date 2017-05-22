const port = 8080

require("./config/database")

const express = require("express")
const server = express()
const session = require("express-session")
const bodyParser = require("body-parser")

server.use(session({ secret: "academic-repo" }))
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(require('./config/cors'))
require("./config/routes")(server)

server.listen(port, function(){
  console.log(`running on port ${port}`)
})

module.exports = server
