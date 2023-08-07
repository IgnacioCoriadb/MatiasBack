const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    user: process.env.USER_NODEMAILER, 
    pass: process.env.PASSWORD_NODEMAILER, //ESTA CONTRASEÑA SE GENERA DESDE GOOGLE
    },
});

const contact =async(name,lastname,email,message)=>{
    const mailOptions = {
        from: `${name} <${email}>`,
        to: 'ignaciocoriadb@gmail.com', // Cambia esto por tu dirección de correo de destino
        subject: name,
        text: `Nombre: ${name}\Apellido: ${lastname}\nCorreo electrónico: ${email}\nMensaje: ${message}`,
      };

    return new Promise((resolve, reject)=>{
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error(error);
              reject('Error al enviar el correo electrónico');
            } else {
              console.log('Correo enviado: ' + info.response);
              resolve('Mensaje enviado');
            }
          });
    })
     
}

module.exports ={
    contact
}