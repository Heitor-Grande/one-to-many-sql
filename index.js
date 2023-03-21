//express config
const express = require("express")
const app = express()

//server door
const port = process.env.PORT || 8080
app.listen(port, function(){
    console.log("SERVER ON: " + port)
})

//body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

//database config
const database = require("./models/models")


//produto controllers
const produto = require("./controllers/produto")
    //select
app.get("/", produto)
    //insert
app.post("/createProduto", produto)
    //delete
app.delete("/del/:id_produto", produto)


//nota controller
const nota = require("./controllers/nota")

    //insert
app.post("/AddNota/ToProduto/:id_produto", nota)