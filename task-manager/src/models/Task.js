const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type : String,
        trim: true,//remove white spaces
        required: [true,'must provide name'],
        maxlength: [20, 'name must not be more than 20 characters']
    },
    completed:{
        type: Boolean,
        default: false

    }
})

module.exports = mongoose.model('Task', TaskSchema)