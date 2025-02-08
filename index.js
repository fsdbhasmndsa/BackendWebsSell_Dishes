const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const Router =  require("./Router/indexRouter")
const bodyParser = require('body-parser');
const Database =  require("./config/database")

const cors = require('cors')

const crosConfig = {
  origin:"*",
  Credential:true,
  methods:["GET","POST","PUT","DELETE","PATCH"]
}

const app = express()
const port =  8080

app.options("",cors(crosConfig))
app.use(cors(crosConfig))

app.use(express.json()); // Thay thế bodyParser.json()
app.use(express.urlencoded({ extended: true })); // Thay thế bodyParser.urlencoded()

Router(app)
Database.Connect()
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})