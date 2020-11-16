const express = require("express")
const router = express.Router()
const {bodySanitizer} = require("../middleware/index.js")
const { blogIndex, blogPost, blogShow,blogUpdate,blogDelete} = require("../controllers/blog")

router.get("/",blogIndex)
router.get("/create", (req,res)=> { return res.render("blog/new")})
router.post("/",bodySanitizer, blogPost)
router.get("/:id", blogShow)
router.put("/:id",bodySanitizer, blogUpdate)
router.delete("/:id", blogDelete)

module.exports = router
