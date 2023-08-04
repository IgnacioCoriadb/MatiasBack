const {DataTypes}  = require('sequelize');
const { sequelize, uuidv4 }= require('../Database/db');

const Images = sequelize.define('Images',{
    
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(), 
        primaryKey: true,
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    folderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idCloud:{
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = {Images,uuidv4,sequelize};