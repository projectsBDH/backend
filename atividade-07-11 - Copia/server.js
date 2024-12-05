// 1. Criar um endpoint que mostra uma tela inicial para escolher: LOGIN e CADASTRO
// 2.Criar um endpoint que MOSTRA um html com cadastro
// 3. criar um endpoint que pega os dados e SALVA no DB 

const express = require("express")
const path = require('path')
const server = express()
const db = require('./config/db_connect')

//Estou liberando a pasta public para acesso externo
server.use(express.static('public'))

//Para receber os dados do formulario
server.use(express.urlencoded({extended:true}))

// endpoint que mostrara a minha home..
server.get('/', (req,res) => {   
    res.sendFile(path.join(__dirname, './views/home.html'))
});
server.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, './views/addProducts.html'))
});

server.get('/lista-produtos', (req, res) => {
    const sql = "SELECT *  FROM produtos";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).send("Ocorreu um erro ao buscar os produtos.");
        }

        // Envia os dados dos produtos como resposta
        res.json(results);
    });
});

server.post('/products', (req, res) => {
    res.sendFile(path.join(__dirname,"../views/addProducts.html"))
    //Receber as informações do cadastro e slavar no DB
    console.log(req.body);

    const { nome, descricao, preco } = req.body

    const sql = "INSERT INTO produtos (nome, descricao, preco) VALUES (?,?,?)"

    db.query(sql, [nome, descricao, preco], (error, reults) => {
        if (error) {
            console.log(error);

            console.log("Erro ao cadastrar...");
        } else {
            console.log("Usuario cadastrado com sucesso!");
            console.log(reults);
        }
    })
    
    res.redirect('/products')

})


server.listen(3010, ()=> {
    console.log("Servidor na porta 3010")
})