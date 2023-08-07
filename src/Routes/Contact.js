const {Router} = require("express");
const router = Router();
const {contact} = require("../Controllers/ContactController");


router.get("/",async(req, res) => {
    const {name,lastname,email,message} = req.body;
    try{
        res.json(await contact(name,lastname,email,message))
    }catch(err){
        console.log("No se pudo ejecutar la funcion contact " +err);
        res.json("No se pudo ejecutar contact " +err);
    }
})


module.exports = router;