const express = require('express');
const route = express.Router();

//CONTOLLERS
const homeControler = require('./src/controllers/homeController');

route.get('/', homeControler.index)

module.exports = route