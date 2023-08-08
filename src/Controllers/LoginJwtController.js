const jwt = require('jsonwebtoken');
const {User} = require('../Models/User');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();

const secretKey =process.env.SECRET_KEY_JWT;

const login = async( username, password ) => {
  const user = await User.findOne();
  const userDb = await user.user;
  const passwordDb = await user.password;
  const userId = await user.id;
  const userRole = await user.role;

  const resultCompareLogin= await compareLogin(username, password, userDb, passwordDb);
  console.log("resultCompareLogin " + resultCompareLogin)

  // Verificación ficticia de usuario
if (resultCompareLogin) {
    // Si las credenciales son válidas, generamos un token JWT
    const payload = { user_id: userId, role: userRole }; // Puedes personalizar el payload según tus necesidades
    const token = jwt.sign(payload, secretKey, { expiresIn: '2h' }); // Puedes ajustar el tiempo de expiración según tus necesidades

    return { token };
  } else {
    return { error: 'Usuario o contraseña incorrecto' };
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
    console.error('Error al comparar contraseñas:', error);
    return false;
  }
}




module.exports= {
    login,
    verifyToken
}