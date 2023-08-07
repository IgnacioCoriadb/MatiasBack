const {Router} = require("express");
const router = Router();
const multer = require('multer');
const {insertCloudinary,getImage,deleteImageDb} = require("../Controllers/ImagesController");
const upload = multer();

router.post("/uploadImage/:folder",upload.array('images', 50), async  (req, res)=>{
    try{
        const uploadedFiles = req.files;
        const {folder} = req.params;
        const subfolder =`imagesMatias/${folder}`;
        const result = await insertCloudinary(uploadedFiles,folder,subfolder)
        res.json(result);
    }catch(e){
      console.log("No se pudo ejecutar la funcion insertCloudinary " +err);
      res.json("No se pudo ejecutar la funcion insertCloudinary " +err);
    }
});

//si paso parametro obtengo de una carpeta especifica sino la primer imagen  de cada carpeta
router.get("/allImage/:folder?", async (req, res) =>{
  const {folder} =req.params;
  try{
    res.json(await getImage(folder))
  }catch(err){
      console.log("No se pudo ejecutar la funcion getImage " +err);
      res.json("No se encontró la carpeta " +folder);
  }
});

router.delete("/deleteImage/:idDb",async(req, res) => {
  const {idDb} = req.params;
  try{
    const resutl =await deleteImageDb(idDb);
    res.json(resutl)
  }catch(error){
    console.log("No se pudo eliminar la imagen " +error);
    res.json("No se pudo eliminar la imagen")
  }
});

module.exports = router;