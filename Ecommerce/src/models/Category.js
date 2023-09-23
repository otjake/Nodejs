const mongoose = require('mongoose')
const CategoryModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxlength: 50
    },
})

module.exports = mongoose.model('Category',CategoryModel)