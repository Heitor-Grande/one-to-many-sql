//database
const sqlite3 = require("sqlite3")
const database = new sqlite3.Database("./models/database.db", function(){
    console.log("BANCO CRIADO/CONECTADO COM SUCESSO")
})

module.exports = database