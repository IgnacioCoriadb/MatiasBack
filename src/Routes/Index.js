const {Router} = require('express');
const images = require("./Images");
const  folders = require("./Folders");
const contact = require("./Contact");
const router = Router();


router.use("/folders",folders);
router.use("/images",images);
router.use("/contact",contact);


module.exports = router;