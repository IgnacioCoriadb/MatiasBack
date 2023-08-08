const {Router} = require("express");
const router = Router();
const {contact,validateForm} = require("../Controllers/ContactController");


router.post("/",async(req, res) => {
    const {name,lastname,email,message} = req.body;
    try{
        const validate= validateForm(name,lastname,email,message);
        if(validate.status){
            console.log(validate.status)
            res.json(await contact(name,lastname,email,message))
        }else{
            let errors = "";
                validate.messageResponse.forEach(error => {
                    errors += error.err + ' ';
                  });
                console.log("Todos los campos son obligatorios" +errors);
                res.json(errors);
        }
    }catch(err){
        console.log("No se pudo ejecutar la funcion contact " +err);
        res.json("No se pudo ejecutar contact " +err);
    }
})


module.exports = router;