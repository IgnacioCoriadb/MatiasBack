const {Folders} = require("../Models/Folders");
const cloudinary = require("../Cloudinary/Cloudinary");
const  {Images,uuidv4,sequelize,QueryTypes} = require("../Models/Images");
const sharp = require('sharp');


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
  
const getImage = async(folder)=>{
    try{
        if(folder){
            return new Promise(async(resolve, reject)=>{
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
                resolve(imagesFolder)
                }else{
                reject("Carpeta no encontrada");
                }
            })
        }else{
            return new Promise(async(resolve, reject)=>{
                try{
                    const imagesFolder =await sequelize.query('SELECT DISTINCT ON ("folderName") "url","folderName" FROM public."Images"', {
                        type: QueryTypes.SELECT,
                    })
                    resolve(imagesFolder);
                }catch(err){
                    console.log(err);
                    reject("No se encontraron las carpetas");
                }
            })
        }
    }catch(error){
        return "No se pudieron obtener las imagenes " +error;
    }
}











module.exports = {
    insertCloudinary,
    getImage,
}