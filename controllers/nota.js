//express config
const express = require("express")
const nota = express()

//database
const database = require("../models/models")


//create
nota.post("/AddNota/ToProduto/:id_produto", function(req, res){
    let id_produto = req.params.id_produto
    let nota = req.body.nota

    database.run(`insert into nota (nota, id_produto) values("${nota}", "${id_produto}")`, 
    function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            res.send("Nota vinculada ao produto com sucesso")
        }
    })
})

module.exports = nota