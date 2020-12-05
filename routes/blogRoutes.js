const express = require("express")
const router = express.Router()
const {bodySanitizer,isLoggedIn,isOwner} = require("../middleware/index.js")
const { blogIndex, blogPost, blogShow,blogUpdate,blogDelete} = require("../controllers/blog")

router.get("/",blogIndex)
router.get("/create",isLoggedIn, (req,res)=> { return res.render("blog/new")})
router.post("/",isLoggedIn,bodySanitizer, blogPost)
router.get("/:id", blogShow)

router.put("/:id", isLoggedIn, isOwner,bodySanitizer, blogUpdate)
router.delete("/:id",isLoggedIn, isOwner, blogDelete)

module.exports = router
