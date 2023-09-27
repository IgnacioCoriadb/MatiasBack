const express = require('express');
const server = express();
const routes = require('./src/Routes/Index');
const cors = require('cors');


server.use(cors());
// Middleware para analizar el cuerpo de las solicitudes JSON
server.use(express.json());
// Middleware para analizar el cuerpo de las solicitudes de formulario
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  

server.use('/', routes);



module.exports = server;