const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://i.pinimg.com/736x/3f/94/70/3f9470b34a8e3f526dbdb022f9f19cf7.jpg"
    },
    email:{
        type:String,
        unique:true
    },
    description:{
        type:String,
    },
    DOB:{
        type:Date
    }

})

module.exports = mongoose.model("User",userSchema)