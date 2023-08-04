const {Router} = require('express');
const images = require("./Images");
const  folders = require("./Folders");
const router = Router();


router.use("/folders",folders);
router.use("/images",images);


module.exports = router;