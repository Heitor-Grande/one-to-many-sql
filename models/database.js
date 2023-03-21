//sqlite3
const sqlite3 = require("sqlite3")
const database = new sqlite3.Database("./models/onetomany.db", function(){
    console.log("conectado ou criado")
})

module.exports = database