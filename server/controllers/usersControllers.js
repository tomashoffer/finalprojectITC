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