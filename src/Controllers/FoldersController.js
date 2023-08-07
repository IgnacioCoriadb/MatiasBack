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

const allFolder =async() => {
    try{
        const folder = await Folders.findAll()
        const substringRemove= "imagesMatias/";
        const folderName = folder.map(name=> (
          {
           name:name.folderName.replace(substringRemove,""),
           id: name.id
          }
        ));
        return folderName;
    }catch(error){
        console.log(error)
        return "Error al obtener las carpetas";
    }
}



module.exports = {
    createFolder,
    allFolder
}