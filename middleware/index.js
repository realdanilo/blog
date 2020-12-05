const Blog = require("../models/blog")
module.exports ={
    bodySanitizer(req,res,next){
        req.body.blog.tags = req.body.blog.tags.split(",").map(x =>x.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")).splice(0,3)
        // sanitize
        req.body.blog.tags.forEach(tag =>{
            return req.sanitize(tag)
        })
        req.body.blog.title = req.sanitize(req.body.blog.title)
        req.body.blog.description = req.sanitize(req.body.blog.description)
        next()
    },
    isLoggedIn(req,res,next){
        if(!res.locals.user) return res.redirect("back")
        return next()
    },
    async isOwner(req,res,next){
        const blog = await Blog.findById(req.params.id)
        if(blog.author.equals(res.locals.user._id)){
            return next()
        }
        return res.redirect("back")
    }
}