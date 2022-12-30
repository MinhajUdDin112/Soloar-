const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    gender:{
        type: String,
        required:true,
    },
    img:{
        type: String,
        required:true,
    },
    vid:{
        type: String,
    },
    aud:{
        type: String,
    },
},{timestamps:true}
)

module.exports = mongoose.model('Data', DataSchema)