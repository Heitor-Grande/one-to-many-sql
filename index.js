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

//product
const product = require("./controllers/product")
app.post("/createProduct", product)
app.get("/selectProducts", product)

//user
const user = require("./controllers/user")
app.post("/CreateUser", user)
app.get("/VerUsers", user)

//order
const order = require("./controllers/order")
app.post("/CreateOrder/:idUser", order)

// order_product
const  order_product = require("./controllers/order_product")
app.get("/SelectOrderproduct",  order_product)