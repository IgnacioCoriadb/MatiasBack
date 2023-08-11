const {Router} = require('express');
const router = Router();
const {login,logout} = require('../Controllers/LoginJwtController');

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await login(username, password);
        res.status(200).json({ success: true, token: result.token });
    } catch (err) {
        res.status(401).json({ success: false, message: "Usuario o contraseña incorrecto" });
    }
});

router.post("/logout",async(req,res)=>{
    try{
        const {token} = req.body;
        res.json(await logout(token))
    }catch(err){
        console.log("No se pudo ejecutar la funcion allFolder " +err);
        res.json("No se pudo cerrar la sesion ");
    }
})

module.exports = router;