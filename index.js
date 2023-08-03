const server = require('./app');
const PORT = 3001;
const dotenv = require('dotenv');
dotenv.config();
const {conn} = require('./src/Database/db');

conn.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log("SERVER IN PORT " + PORT));
}).catch((error) => {
  console.error("Error al conectar con la base de datos:", error);
});