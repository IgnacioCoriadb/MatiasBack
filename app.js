const express = require('express');
const server = express();

const http = require('http').createServer(server);
const WebSocket = require('ws');

const routes = require('./src/Routes/Index');
const cors = require('cors');


server.use(cors());
// Middleware para analizar el cuerpo de las solicitudes JSON
server.use(express.json());
// Middleware para analizar el cuerpo de las solicitudes de formulario
server.use(express.urlencoded({ extended: true }));

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://longoperrig.com.ar');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

  const wss = new WebSocket.Server({ server });

  wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');
  
    ws.on('message', (message) => {
      console.log(`Mensaje recibido: ${message}`);
    });
  
    ws.on('close', () => {
      console.log('Cliente WebSocket desconectado');
    });
  });

server.use('/', routes);



module.exports = http;