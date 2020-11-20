const GoogleStrategy = require("passport-google-oauth20")
const passport = require("passport")
const mongoose = require("mongoose")
const User = require("./models/user")

passport.serializeUser((user,done)=>{
    done(null, user._id)
})
passport.deserializeUser(async(id,done)=>{
   const user= await User.findById(id)
    done(null, user )
})
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "/google/redirect"
  },
 async (accessToken, refreshToken, profile, done)=>{
    let user = await User.findOne({"googleId":profile.id})
    if(!user){
        // console.log("user not found, creating user")
        user = await new User({
            name:profile.displayName,
            googleId:profile.id
        })
        await user.save()
    }
    done(null, user)
 })
);

