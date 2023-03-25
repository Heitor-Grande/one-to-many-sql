//express
const express = require("express")
const order = express()

//database 
const database = require("../models/database")

//create
order.post("/CreateOrder/:idUser", function(req, res){
    let idUser = req.params.idUser

    let qtdade_product = req.body.qtdade_product
    let id_product = req.body.id_product
    
    let amount = 0
    try {
        if(id_product.length == 1){
            database.all(`select amount from product where id = "${id_product}"`, function(erro, [amount_]){
                if(erro){
                    console.log(erro)
                }
                else{
                    amount = amount + (amount_.amount * qtdade_product)

                    for(let i = 0; i < id_product.length; i = i + 1){
                        database.all(`select amount from product where id = "${id_product}"`, function(erro, [amount_]){
                            if(erro){
                                console.log(erro)
                            }
                            else{
                                amount = amount + (amount_.amount * qtdade_product)
                            }
                        })
                    }
            
                    database.run(`insert into orders (user_id, total_amout) values("${idUser}", "${amount}")`, function(erro){
                        if(erro){
                            res.send("probelma ao fazer order: " +erro)
                            console.log(erro)
                        }
                        else{
                            database.all(`select id from orders where user_id = "${idUser}"`, 
                            function(erro, [id_order]){
                                if(erro){
                                    console.log(erro)
                                }
                                else{
                                    for(let i = 0; i < id_product.length; i = i + 1){
                                        database.run(`insert into order_product (order_id, product_id) 
                                        values("${id_order.id}", "${id_product}")`, 
                                        function(erro){
                                            if(erro){
                                                console.log(erro)
                                            }
                                        })
                                    }
                                    res.send("Order feita com sucesso")
                                }
                            })
                        }
                    })
                    
                }
            })
        }
        else{
            for(let i = 0; i < id_product.length; i = i + 1){
                database.all(`select amount from product where id_product = "${id_product[i]}"`, function(erro, [amount_]){
                    if(erro){
                        console.log(erro)
                    }
                    else{
                        amount = amount + (amount_.amount * qtdade_product[i])
                    }
                })
            }
    
            database.run(`insert into orders (user_id, total_amount) values("${idUser}", "${amount}")`, function(erro){
                if(erro){
                    res.send("probelma ao fazer order: " +erro)
                    console.log(erro)
                }
                else{
                    database.all(`select id from order where user_id = "${idUser}" and total_amount = "${amount}"`, 
                    function(erro, [id_order]){
                        if(erro){
                            console.log(erro)
                        }
                        else{
                            for(let i = 0; i < id_product.length; i = i + 1){
                                database.run(`insert into order_product (order_id, product_id) 
                                values("${id_order.id}", "${id_product[i]}")`, 
                                function(erro){
                                    if(erro){
                                        console.log(erro)
                                    }
                                })
                            }
                            res.send("Order feita com sucesso")
                        }
                    })
                }
            })
        }

    } catch (erro) {
        res.send("Não foi possível criar a order: " + erro)
        console.log(erro)
    }

})




module.exports = order