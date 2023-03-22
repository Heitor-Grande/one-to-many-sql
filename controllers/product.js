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
        let title = req.body.title
        let amount = req.body.amount
        let stock = req.body.stock
        let brand = req.body.brand
    database.run(`insert into product
    (title, amount, stock, brand) values("${title}", "${amount}", "${stock}", "${brand}")`, function(erro){
        if(erro){
            res.send(erro)
            console.log(erro)
        }
        else{
            res.send("produto criado com sucesso")
        }
    })
})

//select 
product.get("/selectProducts", function(req, res){
    database.all(`select * from product`, function(erro, product){
        if(erro){
            console.log(erro)
        }
        else{
            res.send(product)
        }
    })
})

module.exports = product