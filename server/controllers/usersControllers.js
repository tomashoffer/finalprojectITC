const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.createUser = async (req, res) => {
      // revisar si hay errores 
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()})
      }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({ email });
        if(user){
            return res.status(400).json({ msg: "User exists!"})
        }

        user = new User(req.body);
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hr
        }, (error, token) => {
            if(error) throw error;
            res.json({token});
        })

    } catch (error) {
        console.log(error)
        res.status(400).send('There was an error')
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.find({});
        res.json(users);
    } catch (error) {
        console.log(error)
        res.status(400).send('There was an error')
    }
}

exports.deleteUser = async (req, res) => {
    const usuario = req.body.usuario
    const user = await User.findById(usuario)
    if(user.role === 'user'){
        return res.status(401).json({msg: 'Only admin delete users'});
    }
    try {
        let userToDelete = await User.findById(req.body.id);  
        if(!userToDelete) {
            return res.status(404).json({msg: 'User not found'});
        }
        userToDelete = await User.findOneAndRemove({ _id : req.body.id });
        res.json(user)
    } catch (error) {
        console.log(error);
        res.status(500).send('Error in the server')
    }
}

exports.updateUser = async (req, res) => {
    const usuario = req.body.usuario
    const user = await User.findById(usuario)
    if(user.role === 'user'){
        return res.status(401).json({msg: 'Only admin update users'});
    }
try{

    let userUpdate = await User.findById(req.body.id);
    if(!userUpdate){
        return res.status(404).json({msg: 'User not found'})
    }
     const newUser = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
      }
      console.log("new User", newUser)
      userUpdate = await User.findByIdAndUpdate({_id: req.body.id}, {$set: newUser}, { new: true });
      console.log("userUpdate", userUpdate)
        res.json(userUpdate);
    }catch(err){
        console.error(err)
        res.status(500).send('Error in the server')
    }
}