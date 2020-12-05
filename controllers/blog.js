const Blog = require("../models/blog")

module.exports={
    async blogIndex(req,res){
        // const blogs = await Blog.find({}).sort({_id:-1}).limit(30)
        const tags = await Blog.distinct("tags" )
        const blogs = await Blog.find({}).sort({_id:-1}).limit(100)
        return res.render("home", {blogs, tags})
    },
    async blogPost(req,res){
    //    console.log(res.locals.user._id)
        const blog = await Blog.create({...req.body.blog, author:res.locals.user._id})
        return res.redirect(`/blog/${blog._id}`)
    },
    async blogShow(req,res){
        try{
            const {id}= req.params
            const blog = await Blog.findById(id).populate("author",{name:1}).exec()
            return res.render("blog/show",{blog})
        }catch{
            return res.render("404")
        }
    },
    async blogUpdate(req,res){
        const {id} = req.params
        const blog = await Blog.findByIdAndUpdate(id,req.body.blog)
        return res.redirect(`/blog/${blog._id}`)
    },
    async blogDelete(req,res){
        await Blog.findByIdAndDelete(req.params.id)
        if(req.query.dashboard =="true"){ return res.redirect(`/user/${res.locals.user._id}`)}
        return res.redirect("/blog")
    }
}