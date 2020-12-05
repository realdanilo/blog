const express = require("express")
const router = express.Router()
const {getUser, updateUser} = require("../controllers/user")

// main >> /user/:id
router.get("/:id", getUser )
router.put("/:id", updateUser)

module.exports = router 