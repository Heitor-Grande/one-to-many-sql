//express config
const express = require("express")
const produto = express()

//database
const database = require("../models/models")

//select one - to - one
produto.get("/", function(req, res){
    database.all(`select produto.nome, nota.nota from produto left join nota on nota.id_produto = produto.id_produto`, 
    function(erro, produto){
        if(erro){
            res.send(erro)
        }
        else{
            res.send(produto)
        }
    })
})

//create
produto.post("/createProduto", function(req, res){

    let nome = req.body.nome

    database.run(`insert into produto (nome) values("${nome}")`, function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            res.send("Produto criado com sucesso")
        }
    })
})

//delete
produto.delete("/del/:id_produto", function(req, res){
    let id_produto = req.params.id_produto
    
    database.run(`delete from nota where id_produto = "${id_produto}"`, 
    function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            database.run(`delete from produto where id_produto = "${id_produto}"`, 
            function(erro){
                if(erro){
                    res.send(erro)
                }
                else{
                    res.send("Nota e produto deletados com sucesso")
                }
            })
        }
    })
})

module.exports = produto