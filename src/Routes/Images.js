const {Router} = require("express");
const router = Router();
const multer = require('multer');

const  {Images,uuidv4,sequelize,QueryTypes} = require("../Models/Images");
const {Folders} = require("../Models/Folders");

const {insertCloudinary,getImage} = require("../Controllers/ImagesController");

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
})

//si paso parametro obtengo de una carpeta especifica sino la primer imagen  de cada carpeta
router.get("/allImage/:folder?", async (req, res) =>{
  const {folder} =req.params;
  try{
    res.json(await getImage(folder))
  }catch(err){
      console.log("No se pudo ejecutar la funcion getImage " +err);
      res.json("No se encontró la carpeta " +folder);
  }
})

router.delete("/deleteImage/:idDb",async(req, res) => {
  const {idDb} = req.params;
  try{
    const resutl =await deleteImageDb(idDb);
    res.json(resutl)
  }catch(error){
    console.log("No se pudo eliminar la imagen " +error);
    res.json("No se pudo eliminar la imagen")
  }
})

const deleteImageDb =async (idDb)=>{
  const image = await Images.findByPk(idDb);
  if(image){
    const idCloud = image.dataValues.idCloud;
    const deleteCloud =await deleteImageCloud(idCloud)
    await image.destroy();
    return deleteCloud
  }else{
    return "No se encontro imagen"
  }
}

const deleteImageCloud = async(idCloud)=>{
  const imagePublicId =idCloud;
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(imagePublicId, (error, result) => {
      if (error) {
        console.error('Error al eliminar la imagen:', error);
        reject('Error al eliminar la imagen');
      }else{
        console.log('Imagen eliminada exitosamente:', result);
        resolve('Imagen eliminada exitosamente');
      }
    });
  })
}
module.exports = router;