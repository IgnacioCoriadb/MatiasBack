const {User,sequelize} = require('../Models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const createUser = async () =>{
    try{
        const user = await User.findOne();
        if(user){
            console.log('El usuario ya existe en la base de datos.');       
        }else{
            const plainPassword = process.env.PASSWORD_JWT;
            const plainUser =process.env.USER_JWT;
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
            const hashedUser = await bcrypt.hash(plainUser,saltRounds);
            await User.create({user: hashedUser, password: hashedPassword, role:"admin"});
            console.log('Usuario creado exitosamente.');
        }
    }catch(err){
        console.log("No se pudo ejecutar la consulta createUser " + err)
    }
}

module.exports = { createUser };
