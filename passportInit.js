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
    //  console.log(profile)
    let user = await User.findOne({"email":profile.emails[0].value})
    if(!user){
        // console.log("user not found, creating user")
        user = await new User({
            name:profile.displayName,
            email:profile.emails[0].value,
            avatar:profile.photos[0].value
        })
        await user.save()
        // console.log(user)
    }
    done(null, user)
 })
);

