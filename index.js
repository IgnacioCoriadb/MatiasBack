const server = require('./app');
const PORT = 3001;
const {sequelize} = require('./src/Database/db');
const  {createUser} = require("./src/createUser/createUser");
const fs = require('fs');
//?-----------Moldels------------
const Images = require('./src/Models/Images');
const Folders = require('./src/Models/Folders');
const User = require('./src/Models/User');
//?------------------------------



sequelize.sync({ force: false }).then(async() => await createUser());

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/vps-3582101-x.dattaweb.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/vps-3582101-x.dattaweb.com/fullchain.pem')
  };
  

const serverRun = https.createServer(options, server);

serverRun.listen(PORT, () => console.log("SERVER IN PORT " + PORT));
