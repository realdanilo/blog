
module.exports ={
    bodySanitizer(req,res,next){
        console.log(req.body.blog)
        req.body.blog.tags = req.body.blog.tags.split(",").map(x =>x.trim().toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "")).splice(0,3)
        // sanitize
        req.body.blog.tags.forEach(tag =>{
            return req.sanitize(tag)
        })
        console.log(req.body.blog.tags)
        req.body.blog.title = req.sanitize(req.body.blog.title)
        req.body.blog.description = req.sanitize(req.body.blog.description)
        next()
    }
}