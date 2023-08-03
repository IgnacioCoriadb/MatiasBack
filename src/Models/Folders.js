const {DataTypes}  = require('sequelize');
const { sequelize, uuidv4 }= require('../Database/db');

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
    
})

module.exports = Folders;