const {Router} = require("express");
const router = Router();
const Folders = require("../Models/Folders");
const cloudinary = require("../Cloudinary/Cloudinary");


router.post("/createFolder",  async(req, res)=>{
    const folder = 'imagesMatias';
    const { subfolder } = req.body;
    const routeSubFolder = `${folder}/${subfolder}`;
    // Crea la subcarpeta en Cloudinary
     cloudinary.api.create_folder(routeSubFolder, (error, result) => {
        if (error) {
            console.error('Error al crear la subcarpeta:', error);
            res.json('Error al crear la subcarpeta')
        } else {
            try{
                Folders.create({folderName:subfolder})
                res.json(`Subcarpeta ${subfolder} creada exitosamente:`)
              }catch(error){
                console.error('Error al crear la subcarpeta:', error)
                res.json('Error al crear la subcarpeta')
              }
        }
    });
})

router.get("/allFolders", async(req,res) => {
    try{
        const folder = await Folders.findAll()
        const substringRemove= "imagesMatias/";
        const folderName = folder.map(name=> (
          {
           name:name.folderName.replace(substringRemove,""),
           id: name.id
          }
        ));
        res.json(folderName)
    
      }catch(error){
        console.log(error)
        res.json("Error al obtener las carpetas");
      }
    
})

module.exports = router;