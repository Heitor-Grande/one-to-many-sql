//express
const express = require("express")
const app = express()

//body-parser
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: false}))

//porta servidor
const porta = process.env.PORT || 8080
app.listen(porta, function(){
    console.log("SERVIDOR ESTÁ RODANDO NA PORTA: " + porta)
})

//database
const database = require("./models/database")

//urls 
const pedido = require("./controllers/pedido")
app.get("/", pedido)
app.get("/Pedido/:id_pedido", pedido)
app.post("/createPedido", pedido)