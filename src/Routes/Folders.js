const {Router} = require("express");
const router = Router();
const {createFolder,allFolder,deleteFolder, folder} =require("../Controllers/FoldersController");
const {verifyToken} = require('../Controllers/LoginJwtController');

router.post("/createFolder",verifyToken,async(req, res)=>{
    const { subfolder,description,measurements,year } = req.body;
    try{
       res.json(await createFolder(subfolder,description,measurements,year));
    }catch(err){
        console.log("No se pudo ejecutar la funcion createFolder " +err);
        res.status(err.status || 500).json(err.message);
    }
});

router.get("/allFolders",verifyToken, async(req,res) => {
    try{
        res.json(await allFolder());
    }catch(error){
        console.log("No se pudo ejecutar la funcion allFolder " +err);
        res.json("No se pudo ejecutar la funcion allFolder " +err);
    }
});

router.get("/folder/:folderName", async(req,res) => {
    try{
        const folderName= req.params.folderName;
        res.json(await folder(folderName));
    }catch(err){
        console.log("No se pudo ejecutar la funcion folder " +err);
        res.json("No se pudo obtener los datos de la carpeta");
    }
})

router.delete("/deleteFolder/:idDb",verifyToken,async(req, res) => {
    const {idDb} = req.params
    try{
        res.json(await deleteFolder(idDb));
    }catch(err){
        console.log("No se pudo ejecutar la funcion deleteFolder " +err);
        res.json("No se pudo ejecutar la funcion deleteFolder " +err);
    }
});

module.exports = router;