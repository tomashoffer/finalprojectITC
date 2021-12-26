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
router.post('/getpet',
petsControllers.getPetById
)
// edit pet
router.put('/update', 
petsControllers.updatePet
)

// delete pet
router.delete('/delete', 
petsControllers.deletePet
)

// Get pets adopted pets from an user
router.get('/user/:id',
petsControllers.getUserPets
)

// get save pet to user
router.post('/user/saved',
petsControllers.postSave
)
// Adopt pet
router.post('/user/adopt',
petsControllers.postAdopt
)
// Adopt pet
router.post('/user/returnAdopt',
petsControllers.returnAdoptPet
)
// Unsave pet
router.post('/user/unsave',
petsControllers.unsavePet
)
// Foster pet
router.post('/user/foster',
petsControllers.fosterPet
)
// Unfoster pet
router.post('/user/unfoster',
petsControllers.unfosterPet
)
// Get save pets
router.post('/user/getSaved',
petsControllers.getUserSavedPets
)
// Get Foster pets
router.post('/user/getFoster',
petsControllers.getFosterUserPets
)
// Get Adopt pets
router.post('/user/getAdopt',
petsControllers.getAdoptUserPets
)

module.exports = router;