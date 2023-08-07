const {Router} = require("express");
const router = Router();
const {Folders,Op} = require("../Models/Folders");
const {Images} = require("../Models/Images");
const cloudinary = require("../Cloudinary/Cloudinary");

const {createFolder,allFolder} =require("../Controllers/FoldersController");

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
        const deleteFolder = await deleteFolders(idDb);
        res.json(deleteFolder);
    }catch(error){
        console.log(error)
        res.json("No se pudo eliminar la carpeta");
    }
});

const deleteFolders=async(idDb)=>{
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

module.exports = router;