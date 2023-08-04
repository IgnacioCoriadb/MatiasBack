const {Router} = require("express");
const router = Router();
// const cloudinary = require("../Cloudinary/Cloudinary");

router.post("/",  (req, res)=>{
    res.json("funciona")
})


module.exports = router;