const {Router} = require("express");
const router = Router();
const {Folders,Op} = require("../Models/Folders");
const {Images} = require("../Models/Images");
const cloudinary = require("../Cloudinary/Cloudinary");

const {createFolder,allFolder,deleteFolder} =require("../Controllers/FoldersController");

router.post("/createFolder",  async(req, res)=>{
    const { subfolder } = req.body;
    try{
       res.json(await createFolder(subfolder));
    }catch(err){
        console.log("No se pudo ejecutar la funcion createFolder " +err);
        res.json("No se pudo ejecutar la funcion createFolder " +err);
    }
});

router.get("/allFolders", async(req,res) => {
    try{
        res.json(await allFolder());
    }catch(error){
        console.log("No se pudo ejecutar la funcion allFolder " +err);
        res.json("No se pudo ejecutar la funcion allFolder " +err);
    }
});

router.delete("/deleteFolder/:idDb",async(req, res) => {
    const {idDb} = req.params
    try{
        res.json(await deleteFolder(idDb));
    }catch(err){
        console.log("No se pudo ejecutar la funcion deleteFolder " +err);
        res.json("No se pudo ejecutar la funcion deleteFolder " +err);
    }
});



module.exports = router;