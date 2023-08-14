const {Folders,Op} = require("../Models/Folders");
const {Images,uuidv4} = require("../Models/Images");

const cloudinary = require("../Cloudinary/Cloudinary");

const createFolder = async (subfolder)=>{
    const folder = 'imagesMatias';
    const routeSubFolder = `${folder}/${subfolder}`;
    // Crea la subcarpeta en Cloudinary
    return new Promise((resolve,reject)=>{
        cloudinary.api.create_folder(routeSubFolder, async(error, result) => {
            if (error) {
                console.error('Error al crear la subcarpeta:', error);
                reject({ status: 500, message:'Error al crear la carpeta'})
            } else {
                try{
                    await Folders.create({id: uuidv4(),folderName:subfolder})
                    resolve(`Carpeta ${subfolder} creada exitosamente`)
                }catch(error){
                    console.error('Error al crear la subcarpeta:', error)
                    reject ({ status: 500, message:'Error al crear la carpeta'})
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

const deleteFolder = async(idDb)=>{
    const folder = await Folders.findByPk(idDb);
    if(folder){
        const folderName = `imagesMatias/${folder.folderName}`;
        const portfolio = await Images.findAll({
            attributes: ['id'], 
            raw: true, 
            where:{
            folderName: folder.folderName
            }
        });
        const idsToDelete = portfolio.map(user => user.id.toString());
        //delete Folder db
        await folder.destroy();
        //delete images in Folder db
        await Images.destroy({
            where: {
            id: {
                [Op.in]: idsToDelete,
            },
            },
        });
        //delete cloudinary folder
        const deleteCloud =()=>{
            return new Promise((resolve, reject) => {
            cloudinary.api.delete_resources_by_prefix(folderName, { type: 'upload' }, (error, result) => {
                if (error) {
                // console.error('Error al eliminar los recursos:', error);
                    reject('Error al eliminar las imagenes de la carpeta: ' +folder.folderName);
                } else {
                    console.log('Recursos eliminados correctamente:', result);
                    cloudinary.api.delete_folder(folderName, (error, result) => {
                        if (error) {
                        console.error('Error al eliminar la subcarpeta:', error);
                            reject('Error al eliminar la subcarpeta: '+folder.folderName);
                        } else {
                            console.log('Subcarpeta eliminada correctamente:', result);
                            resolve(`Carpeta ${folder.folderName} eliminada exitosamente`);
                        }
                    });
                }
            });
        });
    };
    const deleteCloudFolder = await deleteCloud();
    return deleteCloudFolder;
    }else{
      return "No se encontro carpeta"
    }
}

module.exports = {
    createFolder,
    allFolder,
    deleteFolder
}