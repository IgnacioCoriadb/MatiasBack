const {Router} = require("express");
const router = Router();
const cloudinary = require("../Cloudinary/Cloudinary");
const multer = require('multer');
const sharp = require('sharp');
const  {Images,uuidv4,sequelize} = require("../Models/Images");


const upload = multer();

router.post("/uploadImage/:folder",upload.array('images', 20), async  (req, res)=>{
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
          const cloudinaryUrls = await Promise.all(uploadPromises);
          return  cloudinaryUrls;
    }catch (error){
        console.log(error);
        return "No se pudieron guardar las imágenes";
    }
}
  
  

module.exports = router;