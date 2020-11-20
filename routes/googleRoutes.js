const express = require("express")
const router = express.Router()
const passport = require("passport")

// MAIN: /google
// get main
router.get("/", passport.authenticate("google",{scope:['profile']}))
//  get  /redirect
router.get('/redirect', 
  passport.authenticate('google', { failureRedirect: '/bad' }),
  function(req, res) {
    res.redirect("/blog/create")
  });




module.exports = router