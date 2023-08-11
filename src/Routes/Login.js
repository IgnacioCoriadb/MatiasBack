const {Router} = require('express');
const router = Router();
const {login} = require('../Controllers/LoginJwtController');

router.post("/", async(req, res) => {
    const { username, password } = req.body;

    res.json(await login(username, password ))
})

module.exports = router;