const {Router} = require("express");
const router = Router();
const cloudinary = require("../Cloudinary/Cloudinary");
const multer = require('multer');
const sharp = require('sharp');
const  {Images,uuidv4,sequelize,QueryTypes} = require("../Models/Images");
const {Folders} = require("../Models/Folders");


const upload = multer();

router.post("/uploadImage/:folder",upload.array('images', 50), async  (req, res)=>{
    try{
        const uploadedFiles = req.files;
        const {folder} = req.params;
        const subfolder =`imagesMatias/${folder}`;
        const result = await insertCloudinary(uploadedFiles,folder,subfolder)
        res.json(result);
    }catch(e){
        console.log(e)
        res.status(500).send('Error al procesar las imágenes');
    }
})

const insertDb = (uploadedUrls)=>{
    Images.bulkCreate(uploadedUrls)
}

const insertCloudinary =async(uploadedFiles,folder,subfolder)=>{
  try{
    const folderExitst =await Folders.findAll({
      where:{
        folderName:folder
      }
    })
    console.log(folderExitst)
    if(folderExitst.length > 0){
        const uploadPromises = uploadedFiles.map(async (file) => {
            const compressedImageBuffer = await sharp(file.buffer)
              .resize({ fit: 'fill' })
              .toBuffer();
      
            return new Promise((resolve, reject) => {
              cloudinary.uploader.upload_stream(
                { resource_type: 'image', folder: subfolder },
                (error, result) => {
                  if (error) {
                    reject('Error al subir la imagen a Cloudinary: ' + error);
                  } else {
                    const imageUrl = result.secure_url;
                    const imageId = result.public_id;
                    // Insert db
                    const resObject = [{id: uuidv4(),url:imageUrl, folderName: folder, idCloud: imageId}];
                    insertDb(resObject)
                    resolve(resObject[0]); 
                  }
                }
              ).end(compressedImageBuffer);
            });
          });
          await Promise.all(uploadPromises);
          return  "Imagen cargada";

    }else{
      return "No se encontró la carpeta " + folder;
    }
  }catch (error){
    console.log(error);
    return "No se pudieron guardar las imágenes";
  }
}

//si paso parametro obtengo de una carpeta especifica sino la primer imagen  de cada carpeta
router.get("/allImage/:folder?", async (req, res) =>{
  const {folder} =req.params;
  try{
    if(folder){
      const folderExists = await Folders.findOne({
        where:{
          folderName:folder
        }
      });
    if(folderExists){
      const imagesFolder =await Images.findAll({
        where: {
          folderName: `${folder}`
        }
    })   
    res.json(imagesFolder)
    }else{
      res.json("Carpeta no encontrada")
    }
    }else{
      const imagesFolder =await sequelize.query('SELECT DISTINCT ON ("folderName") "url","folderName" FROM public."Images"', {
        type: QueryTypes.SELECT,
      })
      res.json(imagesFolder)
    }
  }catch(error){
    res.json("No se pudieron obtener las imagenes");
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