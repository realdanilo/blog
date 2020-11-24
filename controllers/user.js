const mongoose = require("mongoose")
const User = require("../models/user")

module.exports = {
    async getUser(req,res){
        // const userFound = await User.findById(req.params.id).project({googleId:0})
        const userFound = await User.findOne({_id:req.params.id},{googleId:0})
        console.log(userFound)
       return res.render("user/show",userFound)
    }

}

// show elements that contain this id 
// db.bios.find(
//     { _id: { $in: [ 5, ObjectId("507c35dd8fada716c89d0013") ] } }
//  )
