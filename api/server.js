require('dotenv').config()
const express = require('express');
const app = express();
const port = 53000;
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTMONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.emit('Successfuly to connect MongoDB');
}).catch(e => console.log(e));


const routes = require('./routes');
const { middlewareGlobal } = require('./src/middleware/middlewares.js');
app.use(routes);
app.use(middlewareGlobal)


app.on('Successfuly to connect MongoDB', () => {
    app.listen(port, () => {
        console.log(`Servidor executando na porta ${port}`);
        console.log(`Acesso ao servidor: http://localhost:${port}`);
    });
});
