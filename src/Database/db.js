const { Sequelize,Op,QueryTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const dotenv = require('dotenv');
const { Pool } = require('pg');


dotenv.config();
const {
    DB_DATABASE,
    DB_USERNAME,
    DB_PASSWORD,
    DB_HOST,
    DB_DEPLOY
} =process.env

const sequelize = new Sequelize(`postgres://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});


// const sequelize = new Sequelize(`${DB_DEPLOY}`, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// });


  async function testConnection() {
    try {
      await sequelize.authenticate();
      console.log('Conexión exitosa con la base de datos.');
    } catch (error) {
      console.error('Error al conectar con la base de datos:', error);
    }
  }
  
  testConnection();


  module.exports = {sequelize:sequelize,Sequelize,Op, uuidv4,QueryTypes};
