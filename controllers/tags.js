const Blog = require("../models/blog")

module.exports = {
    async getByTag(req,res){
        // blogs = await Blog.distinct("tags" ,{ tags: req.params.tag}) >> finds all tags
        blogs = await Blog.find({tags:{ $in : req.params.tag}})
        return res.render("tags/show", {blogs, search:req.params.tag})
    }
}