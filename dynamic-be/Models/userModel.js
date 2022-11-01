const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3
    },
    email:{
        type: String,
        required: true,
        lowercase:true
    },
    gender:{
        type: String,
        required : true
    },
    employment:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true
    },
    address:{
        type : String,
        required: false
    },
    driving_license:{
        type: String,
        required: false
    },
    identity:{
        type: String
    },
    license_expiry:{
        type : Date
    },
    agreement:{
        type : Boolean
    }
})

module.exports=mongoose.model('User',userSchema)