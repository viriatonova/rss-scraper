require('dotenv').config()
const express = require('express');
const app = express();
const port = 53000;
const routes = require('./routes');
const { middlewareGlobal } = require('./src/middleware/middlewares.js');

// ROUTERS 
app.use(routes);

//MIDDLEWARES
app.use(middlewareGlobal)

app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
    console.log(`Acesso ao servidor: http://localhost:${port}`);
});