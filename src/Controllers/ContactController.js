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
        to: 'matlongx@gmail.com', // Cambia esto por tu dirección de correo de destino
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


const validateForm = (name,lastname,email,message)=>{
  let status = true;
  let messageResponse = [];
  const strings =/^[a-zA-Z]+$/;
  const emailInput=/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  console.log(name,lastname,email,message)
  try {
    switch (true) {
      case !name:
        status = false;
        messageResponse.push({err:"El nombre es obligatorio "});
      case !lastname:
        status = false;
        messageResponse.push({err:"El apellido es obligatorio "});
      case !email:
        status = false;
        messageResponse.push({err:"El email es obligatorio "});
      case !message:
        status = false;
        messageResponse.push({err:"El mensaje es obligatorio "});
      case !strings.test(name) :
        status = false;
        messageResponse.push({err:"No se permiten numeros o simbolos en el campo nombre"});
      case  !strings.test(lastname):
        messageResponse.push({err:"No se permiten numeros o simbolos en el campo apellido"});
      case !emailInput.test(email):
        messageResponse.push({err:"Debe ingresar un email"});
    }
    return { status, messageResponse };
    }catch(err){
        return "No se pudo validar el formulario";
    }
}

module.exports ={
    contact,
    validateForm
}