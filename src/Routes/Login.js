const {Router} = require('express');
const router = Router();
const {login} = require('../Controllers/LoginJwtController');

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await login(username, password);
        res.status(200).json({ success: true, token: result.token });
    } catch (err) {
        res.status(401).json({ success: false, message: "Usuario o contraseña incorrecto" });
    }
});

module.exports = router;