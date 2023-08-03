const {Router} = require("express");
const router = Router();


router.get("/",  (req, res)=>{
    res.json("funciona")
})


module.exports = router;