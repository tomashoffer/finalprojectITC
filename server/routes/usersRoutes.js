const express = require('express')
const router = express.Router()
const usersControllers = require('../controllers/usersControllers')
const { check } = require('express-validator')

// routes

router.post('/',[
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password must have at least 6 characters').isLength({min: 6})
],   
    usersControllers.createUser
)
router.get('/allusers', 
    usersControllers.getAllUsers
)
router.put('/update', 
    usersControllers.updateUser
)
router.post('/delete', 
    usersControllers.deleteUser
)

module.exports = router;