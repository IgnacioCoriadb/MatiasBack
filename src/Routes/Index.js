const {Router} = require('express');
const images = require("./Images");
const router = Router();


router.use("/",images);


module.exports = router;