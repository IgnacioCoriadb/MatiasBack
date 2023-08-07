const {Folders,Op} = require("../Models/Folders");
const cloudinary = require("../Cloudinary/Cloudinary");

const createFolder = async (subfolder)=>{
    const folder = 'imagesMatias';
    const routeSubFolder = `${folder}/${subfolder}`;
    // Crea la subcarpeta en Cloudinary
    return new Promise((resolve,reject)=>{
        cloudinary.api.create_folder(routeSubFolder, (error, result) => {
            if (error) {
                console.error('Error al crear la subcarpeta:', error);
                reject('Error al crear la subcarpeta')
            } else {
                try{
                    Folders.create({folderName:subfolder})
                    resolve(`Carpeta ${subfolder} creada exitosamente`)
                }catch(error){
                    console.error('Error al crear la subcarpeta:', error)
                    reject ('Error al crear la carpeta')
                }
            }
        });

    })
}





module.exports = {
    createFolder
}