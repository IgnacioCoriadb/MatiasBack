// const server = require('./app');
// const PORT = 3001;
// const {sequelize} = require('./src/Database/db');
// const  {createUser} = require("./src/createUser/createUser");
// //?-----------Moldels------------
// const Images = require('./src/Models/Images');
// const Folders = require('./src/Models/Folders');
// const User = require('./src/Models/User');
// //?------------------------------



// sequelize.sync({ force: false }).then(async() => await createUser())


// server.listen(PORT, () => console.log("SERVER IN PORT " + PORT));

const http = require('http');
const hostname = '127.0.0.1';
const port = 80;
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hola mundo!\n');
});
server.listen(port, hostname, () => {
    console.log(`Servidor corriendo en en http://${hostname}:${port}/`);
});