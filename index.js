// import commonJs
const express = require("express");
const app = express();

//http://localhost:3000
//http://192.168.1.100:3000

const PORT = 4467;

//API REST FULL
// Rota - Endpoint - callback
// ====> Req -> Request - Requisição
// <==== Res -> Response - Resposta
app.get("/", (req, res) => {
    res.send("Olá Mundo!");
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
})