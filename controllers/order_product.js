//express
const express = require("express")
const order_product = express()

//database 
const database = require("../models/database")

//select 
order_product.get("/SelectOrderproduct", function(req, res){
    database.all(`select order_product.order_id, order_product.product_id, 
    product.title, product.amount, orders.total_amout
    from order_product
    join orders on order_id = order_product.order_id 
    join product on product.id = order_product.product_id`, function(erro, results){
        if(erro){
            console.log(erro)
        }
        else{
            res.send(results)
        }
    })
})

module.exports = order_product