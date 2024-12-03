const mongoose = require('mongoose');
const newUser = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phoneNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    profileImage:{
        type:String,

    },
    
},{timestamps:true});

const User = mongoose.model('User',newUser);

module.exports = User;