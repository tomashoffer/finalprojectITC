const Pets = require('../models/Pets')
const AWS = require( 'aws-sdk' );
const config = require('../config/config')

const spacesEndpoint = new AWS.Endpoint(config.EndPoint);

const s3 = new AWS.S3({
   endpoint: spacesEndpoint
})


exports.createPet = async (req, res) => {
    const file = req.files.file;

    try {
        const uploadObject = await s3.putObject({
            ACL: 'public-read', 
            Bucket: config.BucketName,
            Body: file.data,
            Key: file.name
         }).promise()

        const urlImage = `https://${config.BucketName}.${config.EndPoint}/${file.name}` 
          console.log(uploadObject)
         console.log(urlImage)
         const pets = new Pets({
            name: req.body.name,
            type: req.body.type,
            adoptionStatus: false,
            address: req.body.address,
            city: req.body.city,
            picture: urlImage,
            height: req.body.height,
            weight: req.body.weight,
            color: req.body.color,
            bio: req.body.bio,
            hypoallergenic: req.body.hypoallergenic,
            dietaryRestrictions: req.body.dietaryRestrictions,
            breed: req.body.breed,
          });
        pets.save();
        res.json(pets)

    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

exports.getAllPets = async (req, res) => { 
    try {
      const pets = await Pets.find({})
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.getPetById = async (req, res) => { 
    try {
    let pets = await Pets.findById(req.params.id);
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.getUserPets = async (req, res) => { 
    try {
    let pets = await Pets.find({adopted: req.body}) 
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.getSavedPets = async (req, res) => { 
    try {
    let pets = await Pets.find({saved: req.body}) 
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

exports.updatePet = async(req, res) =>{
    const file = req.files.file;
try{
    let pets = await Pets.findById(req.param.id);
    if(!pets){
        return res.status(404).json({msg: 'Pet not found'})
    }
    const uploadObject = await s3.putObject({
        ACL: 'public-read', 
        Bucket: config.BucketName,
        Body: file.data,
        Key: file.name
     }).promise()

    const urlImage = `https://${config.BucketName}.${config.EndPoint}/${file.name}` 
      console.log(uploadObject)
     console.log(urlImage)
     const newPet = new Pets({
        name: req.body.name,
        type: req.body.type,
        adoptionStatus: false,
        address: req.body.address,
        city: req.body.city,
        picture: urlImage,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        bio: req.body.bio,
        hypoallergenic: req.body.hypoallergenic,
        dietaryRestrictions: req.body.dietaryRestrictions,
        breed: req.body.breed,
      });

        pets = await Pets.findOneAndUpdate({_id: req.params.id}, {$set: newPet}, { new: true });
        res.json({pets});
    }catch(err){
        console.error(err)
        res.status(500).send('Error in the server')
    }
}

//  Delete pet
exports.deletePet = async (req, res ) => {
    try {
        let pets = await Pets.findById(req.param.id);  

        if(!pets) {
            return res.status(404).json({msg: 'Pet not found'});
        }
        await Pets.findOneAndRemove({ _id : req.params.id });
        res.json({ msg: 'Pet deleted '})

        await s3.deleteObject({
            Bucket: config.BucketName,
            Key: file.name
        }).promise()

        res.json('pet deleted')
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server')
    }
}
