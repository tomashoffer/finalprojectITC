const User = require('../models/User')
const bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.authUser = async (req, res) => {
      // revisar si hay errores 
      const errors = validationResult(req)
      if(!errors.isEmpty()){
          return res.status(400).json({errors: errors.array()})
      }

      const { email, password } = req.body;

      try {
          let user = await User.findOne({email})
          if(!user){
            return res.status(400).json({ msg: "User doesn't exist!"})
        }

        const passCorrect = await bcrypt.compare(password, user.password)
        if(!passCorrect){
            return res.status(400).json({msg: "Password is incorrect"})
        }

        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 360000000 // 1 hr
        }, (error, token) => {
            if(error) throw error;
            res.json({token});
        })
      } catch (error) {
          console.log(error)
          res.status(500).send({msg:'There was an error'})
      }
}

// Obtiene usuario autenticado
exports.getUserAuth = async (req, res) => {
    try {
        // req.usuario.id viene de jwt en authMiddleware (le pasamos todo menos password)
        const usuario = await User.findById(req.user.id).select('-password')
        res.json({usuario})
    } catch (error) {
        console.log(error)
        res.status(500).send({msg:'There was an error'})
    }
}