const express = require("express")
const router = express.Router()
const {getByTag }= require("../controllers/tags")

// @/search/

router.get("/:tag", getByTag)
module.exports = router