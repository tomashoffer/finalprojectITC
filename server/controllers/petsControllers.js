const Pets = require('../models/Pets')
const User = require('../models/User')
const AWS = require( 'aws-sdk' );
const config = require('../config/config')
var _ = require('lodash');


const spacesEndpoint = new AWS.Endpoint(config.EndPoint);

const s3 = new AWS.S3({
   endpoint: spacesEndpoint
})


exports.createPet = async (req, res) => {
    const file = req.files.file;
    const user = await User.findById(req.body.userId)
    if(user.role === 'user'){
        return res.status(401).json({msg: 'Only admin can add pets'});
    }

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
exports.getUserSavedPets = async (req, res) => { 
    try {
      const pets = await Pets.find({ saved: req.body.id })
      if(!pets) {
        return res.status(401).json({msg: 'No saved pets'});
    }
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.getAdoptUserPets = async (req, res) => { 
    try {
      const pets = await Pets.find({ adopted: req.body.id })
      if(!pets) {
        return res.status(401).json({msg: 'No adopted pets'});
    }
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.getFosterUserPets = async (req, res) => { 
    try {
      const pets = await Pets.find({ foster: req.body.id })
      if(!pets) {
        return res.status(401).json({msg: 'No foster pets'});
    }
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.getPetById = async (req, res) => { 
    try {
    let pets = await Pets.findById(req.body.id);
      res.json({pets})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

exports.searchPet = async (req, res) => { 
    const {datos} = req.query;
    const search =  _.omitBy(JSON.parse(datos), (v) => _.isUndefined(v) || _.isNull(v) || v === '');
    console.log(search)
    const pets = await Pets.find(search)
    if(pets.length === 0) {
        return res.status(401).json({msg: 'No pets founded'});
    }
    res.json({pets})
}

exports.postSave = async (req, res) => { 
    try {
        const usuario = req.body.usuario
        const user = await User.findById(usuario)
        if(user.role === 'admin'){
            return res.status(401).json({msg: 'Only user save pets'});
        }
        const petId = req.body.petId
        let findPet =  await Pets.findById(petId);
        if(findPet.saved && findPet.saved.toString().includes(usuario)) {
            return res.status(401).json({msg: 'Pet already saved'});
        }
     let savePet =  await Pets.updateOne(
        { _id: petId },
        { $push: { saved: usuario } }
     )
     res.json({savePet})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.postAdopt = async (req, res) => { 
    try {
    const usuario = req.body.usuario
    const user = await User.findById(usuario)
        if(user.role === 'admin'){
            return res.status(401).json({msg: 'Only user adopt pets'});
        }
    const petId = req.body.petId
    let pet = await Pets.findById(petId);
    const newPet = {}
    newPet.adopted = usuario
    newPet.adoptionStatus = true

    let petUpdate = await Pets.findOneAndUpdate({_id: petId }, newPet, {new: true}); 
    let petNoFoster = await Pets.findOneAndUpdate({_id: petId }, {$unset: {foster: ''}} , {new: true});
    res.json({petNoFoster})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

exports.returnAdoptPet = async (req, res) => { 
    try {
        const usuario = req.body.usuario
        const user = await User.findById(usuario)
        if(user.role === 'admin'){
            return res.status(401).json({msg: 'Only user return pets'});
        }
        const petId = req.body.petId
        let findPet =  await Pets.findById(petId);
        if(findPet.adopted && !findPet.adopted.toString().includes(usuario)) {
            return res.status(401).json({msg: 'Pet is not save'});
        }
    const newPet = {}
    newPet.adoptionStatus = false
    let petUpdate = await Pets.findOneAndUpdate({_id: petId }, newPet, {new: true});
    let returnAdopt = await Pets.updateOne({ _id: petId }, { $unset: {adopted: ''}})

     res.json({petUpdate})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.unsavePet = async (req, res) => { 
    try {
        const usuario = req.body.usuario
        const user = await User.findById(usuario)
        if(user.role === 'admin'){
            return res.status(401).json({msg: 'Only user unsave pets'});
        }
        const petId = req.body.petId
        let findPet =  await Pets.findById(petId);
        if(findPet.saved && !findPet.saved.toString().includes(usuario)) {
            return res.status(401).json({msg: 'Pet is not save'});
        }
    let unSave = await Pets.updateOne({ _id: petId }, { $pull: { saved: usuario } })
     res.json({unSave})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

exports.fosterPet = async (req, res) => { 
    try {
    const usuario = req.body.usuario
    const user = await User.findById(usuario)
        if(user.role === 'admin'){
            return res.status(401).json({msg: 'Only user foster pets'});
        }
    const petId = req.body.petId
    let pet = await Pets.findById(petId);
    const newPet = {}
    newPet.foster = usuario
    let petAdopt = await Pets.findOneAndUpdate({_id: petId }, newPet, {new: true}); 
    res.json({petAdopt})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}
exports.unfosterPet = async (req, res) => { 
    try {
        const usuario = req.body.usuario
        const user = await User.findById(usuario)
        if(user.role === 'admin'){
            return res.status(401).json({msg: 'Only user unfoster pets'});
        }
        const petId = req.body.petId
        let findPet =  await Pets.findById(petId);
        if(findPet.foster && !findPet.foster.toString().includes(usuario)) {
            return res.status(401).json({msg: 'Pet is fostered'});
        }
    let unFoster = await Pets.updateOne({ _id: petId }, { $unset: { foster: usuario } })
     res.json({unFoster})
    }catch(err){
        console.log(err)
        res.status(500).send('Hubo un error')
    }
}

exports.updatePet = async(req, res) =>{
    const file = req.files.file;
    const usuario = req.body.usuario
    const user = await User.findById(usuario)
    if(user.role === 'user'){
        return res.status(401).json({msg: 'Only admin update pets'});
    }
try{
    let pets = await Pets.findById(req.body.id);
    if(!pets){
        return res.status(404).json({msg: 'Pet not found'})
    }
     await s3.putObject({
        ACL: 'public-read', 
        Bucket: config.BucketName,
        Body: file.data,
        Key: file.name
     }).promise()

    const urlImage = `https://${config.BucketName}.${config.EndPoint}/${file.name}` 
 
     const newPet = {
        name: req.body.name,
        type: req.body.type,
        adoptionStatus: req.body.adoptionStatus,
        address: req.body.address,
        city: req.body.city,
        picture: urlImage,
        height: req.body.height,
        weight: req.body.weight,
        color: req.body.color,
        bio: req.body.bio,
        hypoallergenic: req.body.hypoallergenic,
        dietaryRestrictions: req.body.dietaryRestrictions,
        breed: req.body.breed
      }

        pets = await Pets.findByIdAndUpdate({_id: req.body.id}, {$set: newPet}, { new: true });
        res.json(pets);
    }catch(err){
        console.error(err)
        res.status(500).send('Error in the server')
    }
}

//  Delete pet
exports.deletePet = async (req, res ) => {
    const usuario = req.body.usuario
    const user = await User.findById(usuario)
    if(user.role === 'user'){
        return res.status(401).json({msg: 'Only admin delete pets'});
    }
    try {
        let pets = await Pets.findById(req.body.petId);  
        console.log(pets)
        if(!pets) {
            return res.status(404).json({msg: 'Pet not found'});
        }
        pets = await Pets.findOneAndRemove({ _id : req.body.petId });

        res.json(pets)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server')
    }
}
