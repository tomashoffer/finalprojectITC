const express = require('express')
const router = express.Router()
const authControllers = require('../controllers/authControllers')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

// routes

router.post('/',[
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({min: 6})
],   
    authControllers.authUser
)

router.get('/', 
    auth,
    authControllers.getUserAuth
)


module.exports = router;