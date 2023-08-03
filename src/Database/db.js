const { Sequelize } = require('sequelize');
const {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST
} =process.env

const sequelize = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

  async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Conexión exitosa con la base de datos.');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }
  
  testConnection();


  module.exports = {conn:sequelize};
