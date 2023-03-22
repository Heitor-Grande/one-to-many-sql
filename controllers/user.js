//express
const express = require("express")
const user = express()

//database 
const database = require("../models/database")

//create
user.post("/CreateUser", function(req, res){
    let {name, email, gender, cpf, cellphone, password} = req.body

    database.run(`insert into user (name, email, gender, cpf, cellphone, password)
    values("${name}", "${email}", "${gender}", "${cpf}", "${cellphone}", "${password}")`, 
    function(erro){
        if(erro){
            res.send(erro)
        }
        else{
            res.send("Usuario criado com sucesso")
        }
    })
})

user.get("/VerUsers", function(req, res){
    database.all(`select * from user`, function(erro, user){
        if(erro){
            res.send(erro)
        }
        else{
            res.send(user)
        }
    })
})

module.exports = user