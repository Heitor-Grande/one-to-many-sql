//express
const express = require("express")
const pedido = express()

//database
const database = require("../models/database")

//select 
pedido.get("/", function(req, res){
    database.all(`select pedido.titular, pedido.total, pedido_detalhes.produto, pedido_detalhes.valor_produto, 
    pedido_detalhes.quantidade_produto
     from pedido full join pedido_detalhes on pedido_detalhes.id_pedido = pedido.id_pedido`, function(erro, pedido){
        if(erro){
            res.send(erro)
        }
        else{
            console.log(pedido)
            res.send(pedido)
        }
     })
})

//select pedido espc
pedido.get("/Pedido/:id_pedido", function(req, res){

    let id_pedido = req.params.id_pedido

    database.all(`select pedido.titular, pedido.total, pedido_detalhes.produto, pedido_detalhes.valor_produto, 
    pedido_detalhes.quantidade_produto
     from pedido full join pedido_detalhes on pedido_detalhes.id_pedido = pedido.id_pedido 
     where pedido.id_pedido = "${id_pedido}"`, 
     function(erro, pedido){
        if(erro){
            res.send(erro)
        }
        else{
            res.send(pedido)
        }
     })
})

//create
pedido.post("/createPedido", function(req, res){

    //pedido_detalhes
    let produto = req.body.produto
    let valor_produto = req.body.valor_produto
    let quantidade_produto = req.body.quantidade_produto

    //pedido
    let titular = req.body.titular
    let cpfCnpj = req.body.cpfCnpj
    let total = valor_produto * quantidade_produto
    let dataPedido = new Date()
    console.log(dataPedido)
    database.run(`insert into pedido (titular, cpfCnpj, total, dataPedido) 
    values("${titular}", "${cpfCnpj}", "${total}", "${dataPedido}")`, function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            database.all(`select id_pedido from pedido where total = "${total}" and cpfCnpj = "${cpfCnpj}" 
            and dataPedido = "${dataPedido}"`, function(erro, [pedido]){
                if(erro){
                    res.send(erro)
                }
                else{
                    database.run(`insert into pedido_detalhes (produto, valor_produto, quantidade_produto, id_pedido)
                    values("${produto}", "${valor_produto}", "${quantidade_produto}", "${pedido.id_pedido}")`, function(erro){
                        if(erro){
                            res.send(erro)
                        }
                        else{
                            res.send("Pedido e pedido_detalhes criado com sucesso")
                        }
                    })
                }
            })
        }
    })
})
module.exports = pedido