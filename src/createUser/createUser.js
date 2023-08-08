const {User,sequelize} = require('../Models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const createUser = async () =>{
    const user = await User.findOne();
    if(user){
        console.log('El usuario ya existe en la base de datos.');       
    }else{
        const plainPassword = process.env.PASSWORD_JWT;
        const plainUser =process.env.USER_JWT;
        const saltRounds = 10;
        const hashedPassword = bcrypt.hash(plainPassword, saltRounds);
        const hashedUser = bcrypt.hash(plainUser,saltRounds);
        await User.create({user: hashedUser, password: hashedPassword});
        console.log('Usuario creado exitosamente.');
    }
}




module.exports = { createUser };
