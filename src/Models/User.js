const {DataTypes}  = require('sequelize');
const { sequelize, uuidv4 }= require('../Database/db');

const User = sequelize.define('User',{
    id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(), 
        primaryKey: true,
    },
    user: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: true,
    }
})

module.exports = {User,sequelize};