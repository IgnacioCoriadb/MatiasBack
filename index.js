const server = require('./app');
const PORT = 3001;
const {sequelize} = require('./src/Database/db');
const  {createUser} = require("./src/createUser/createUser");
//?-----------Moldels------------
const Images = require('./src/Models/Images');
const Folders = require('./src/Models/Folders');
const User = require('./src/Models/User');
//?------------------------------



sequelize.sync({ force: true }).then(async() => await createUser())


server.listen(PORT, () => console.log("SERVER IN PORT " + PORT));
