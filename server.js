require('dotenv').config()
const expressSanitizer = require("express-sanitizer")
const methodOverride = require("method-override")
const bodyParser = require("body-parser")
const passport = require("passport")
const express = require("express")
const path = require("path")
const app = express()

// Files
app.use(express.static(path.join(__dirname,"public")))
app.set("view engine", "ejs")
app.set("views", path.join(__dirname,"views"))
// DB
const mongoose = require("mongoose")
const str = process.env.DB || "mongodb://localhost:27017/blog"
mongoose.connect(str,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false,
})
// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
// method override 
app.use(methodOverride("_method"))
// sanitizer
app.use(expressSanitizer())


// Cookie
const session = require("express-session")
app.use(session({
    secret: process.env.SESSION,
    resave: true,
    saveUninitialized: true
}))
// passport init 
app.use(passport.initialize())
app.use(passport.session())
const passportSetup= require("./passportInit")

// locals
app.use((req,res,next)=>{
    // console.log(req.user)
    res.locals.user = req.user
    next()
})




// Routes
app.get("/", (req,res)=>{
    return res.redirect("/blog")
})
const blogRoutes = require("./routes/blogRoutes")
app.use("/blog", blogRoutes)

const searchRoutes = require("./routes/searchRoutes")
app.use("/search",searchRoutes)

const googleRoutes = require('./routes/googleRoutes')
app.use("/google", googleRoutes)

const userRoutes = require("./routes/userRoutes")
app.use("/user", userRoutes)

// routes for bad google auth
app.use("/bad", (req,res)=>{
    // return res.send("Something bad happened")
    return res.redirect("/")
})

app.get("/logout",(req,res)=>{
    req.logout()
    return res.redirect("/blog")
})
// invalid address
app.get("*",(req,res)=>{
    res.render("404")
})

// Connection
const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log(`Server is On, using port number ${port}`)
})

