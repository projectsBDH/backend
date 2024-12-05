const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backend',
    port: 3306, // porta padrao DB
})

db.connect((error) =>{
    if(error) {
        console.log(error);
    } else {
        console.log("Conexão com DB efetuada com sucesso!")
    }
})

module.exports = db // para exportar pra fora