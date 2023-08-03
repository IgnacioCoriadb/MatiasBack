const express = require('express');
const server = express();
const routes = require('./src/Routes/Index');

server.use('/', routes);

module.exports = server;