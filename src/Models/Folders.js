const {DataTypes}  = require('sequelize');
const { sequelize, uuidv4,Op }= require('../Database/db');

const Folders = sequelize.define('Folders',{
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(), 
        primaryKey: true,
    },
    folderName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    measurements:{ //medidas
        type: DataTypes.STRING,
        allowNull: false,
    },
    year:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
})

module.exports = {Folders,Op};