//express
const express = require("express")
const app = express()

//porta servidor
app.listen("8080", function(){
    console.log("rodando")
})

//body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

//database
const database = require("./models/database")