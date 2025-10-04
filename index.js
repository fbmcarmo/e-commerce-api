// import commonJs
const express = require("express");
const app = express();

app.use(express.json())

//http://localhost:3000
//http://192.168.1.100:3000

const PORT = 4467;
const products = [];

//API REST FULL
// Rota - Endpoint - callback
// ====> Req -> Request - Requisição
// <==== Res -> Response - Resposta
app.get("/", (req, res) => {
    res.send("Olá Bruno, seja bem vindo");
})

// C - Create - POST
// R - Read - GET
// U - Update - PUT
// D - Delete - DELETE

app.post("/products", (req, res) => {
    const { name, category, price } = req.body;
    
    products.push({
        name,
        category,
        price
    })

    res.status(201).send({
        message: "Produto criado com sucesso"
    })
})

app.get("/products", (req, res) => {
    res.send(products) 
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})