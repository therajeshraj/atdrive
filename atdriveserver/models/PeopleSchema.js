const mongoose = require('mongoose')

const peopleSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    phone: {
        type: String,
        required: false
    },

    email: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        required: false
    },

    country: {
        type: String,
        required: false
    },

    avatar: {
        type: String,
        required: false
    },

})

mongoose.model("PeopleSchema", peopleSchema)