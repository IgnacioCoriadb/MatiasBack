const {Router} = require("express");
const router = Router();
const {contact} = require("../Controllers/ContactController");


router.get("/",async(req, res) => {
    const {name,lastname,email,message} = req.body;

    res.json(await contact(name,lastname,email,message))
})


module.exports = router;