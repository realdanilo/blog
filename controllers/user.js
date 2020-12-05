const mongoose = require("mongoose")
const User = require("../models/user")

module.exports = {
    async getUser(req,res){
        try{
            const userFound = await User.findOne({_id:req.params.id})
            return res.render("user/show",{userFound})
        }catch(e){
            return res.redirect("/blog")
        }
    },
    async updateUser(req,res){
        try{
            req.body.user.name = req.sanitize(req.body.user.name)
            req.body.user.description = req.sanitize(req.body.user.description)
            const userFound = await User.findByIdAndUpdate(req.params.id, req.body.user)
            return res.render("user/show",{userFound})
        }catch(e){
            return res.redirect("/blog")
        }
    }

}

// show elements that contain this id 
// db.bios.find(
//     { _id: { $in: [ 5, ObjectId("507c35dd8fada716c89d0013") ] } }
//  )
