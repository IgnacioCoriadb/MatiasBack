const jwt = require('jsonwebtoken');
const {User} = require('../Models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const secretKey =process.env.SECRET_KEY_JWT;
const activeTokens=[];

const login = async( username, password ) => {
  const user = await User.findOne();
  const userDb = await user.user;
  const passwordDb = await user.password;
  const userId = await user.id;
  const userRole = await user.role;

  const resultCompareLogin= await compareLogin(username, password, userDb, passwordDb);
  // console.log("resultCompareLogin " + resultCompareLogin)

  if (resultCompareLogin) {
      const payload = { user_id: userId, role: userRole }; 
      const token = jwt.sign(payload, secretKey, { expiresIn: '3h' });
    return { success: true, token: token };
  } else {
    return { success: false, token: null }; 
  }
}
// Middleware para verificar el token en las rutas protegidas
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
 
   if (!authHeader || !authHeader.startsWith('Bearer ')) {
     return res.status(401).json({ error: 'Token no proporcionado' });
   }

   const token = authHeader.split(' ')[1]; // Obtenemos el token sin la palabra "Bearer" y el espacio
   jwt.verify(token, secretKey, (err, decoded) => {
     if (err) {
       return res.status(403).json({ error: 'Token inválido' });
     }
 
     req.user = decoded;
     next();
   });
 };
 

const compareLogin = async(plainUser, plainPassword, hashedUser, hashedPassword)=>{
  try{
    const isMatchUser = await bcrypt.compare(plainUser,hashedUser);
    const isMatchPassword = await bcrypt.compare(plainPassword,hashedPassword);
    if(isMatchUser && isMatchPassword){
      return true;
    }else{
      return false;
    }
  }catch(err){
    console.error('Error al comparar contraseñas:', err);
    return false;
  }
}

const logout =(token)=>{
  try{
    // Invalida el token y lo remueve de la lista de tokens activos
    const index = activeTokens.indexOf(token);
    if (index !== -1) {
      activeTokens.splice(index, 1);
    }
    return { message: "Sesión cerrada exitosamente" };
  }catch(err) {
    return { message: err.message}
  }
}



module.exports= {
    login,
    verifyToken,
    logout
}