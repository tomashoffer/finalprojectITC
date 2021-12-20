const express = require('express')
const router = express.Router()
const petsControllers = require('../controllers/petsControllers')
const auth = require('../middleware/auth')



// routes

router.post('/',
auth,
petsControllers.createPet
)

router.get('/',
petsControllers.getAllPets
)
// search pet
router.get('/search', 
petsControllers.searchPet
)
// get pet by id
router.get('/:id',
petsControllers.getPetById
)
// edit pet
router.put('/:id', 
petsControllers.updatePet
)

// delete pet
router.delete('/:id', 
petsControllers.deletePet
)

// Get pets adopted pets from an user
router.get('/user/:id',
petsControllers.getUserPets
)

// get save pet to user
router.get('/user/:id/saved',
petsControllers.getSavedPets
)

module.exports = router;