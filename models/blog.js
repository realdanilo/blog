const mongoose = require("mongoose")
const blogSchema =  mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        // required:true
    },
    tags:[
           {   
               type:String
            }
    ],
    description:{
        type:String,
        required:true,
    },
    createdAt:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Blog",blogSchema)