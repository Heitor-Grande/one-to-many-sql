//express
const express = require("express")
const product = express()

//database 
const database = require("../models/database")

//select
product.get("/SelectProduct", function(req, res){
    database.all(`select * from product`, function(erro, product){
        if(erro){
            res.send(erro)
        }
        else{
            res.send(product)
        }
    })
})


//create
product.post("/createProduct", function(req, res){
    
})