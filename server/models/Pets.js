const mongoose = require('mongoose');

const PetSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
       type: {
        type: String,
        required: true,
        trim: true
    },
    adoptionStatus: {
        type: Boolean,
        required: true,
        trim: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    picture : {
        type: String,
        trim: true,
    },
    height : {
        type: Number,
        required: true,
        trim: true,
    },
    weight : {
        type: Number,
        required: true,
        trim: true,
    },
    color : {
        type: String,
        required: true,
        trim: true,
    },
    bio : {
        type: String,
        required: true,
        trim: true,
    },
    hypoallergenic : {
        type: Boolean,
        required: true,
        trim: true,
    },
    dietaryRestrictions : {
        type: String,
        required: true,
        trim: true,
    },
    breed : {
        type: String,
        required: true,
        trim: true,
    }, 
    adopted: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    saved: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

});


// trim quita los espacios

module.exports = mongoose.model('Pet', PetSchema)