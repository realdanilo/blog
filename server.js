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
const str = "mongodb://localhost:27017/blog"
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
    res.redirect("/blog")
})
const blogRoute = require("./routes/blogRoutes")
app.use("/blog", blogRoute)

const searchRoutes = require("./routes/searchRoutes")
app.use("/search",searchRoutes)

const googleRoute = require('./routes/googleRoutes')
app.use("/google", googleRoute)


app.use("/bad", (req,res)=>{
    return res.send("Something bad happened")
})

app.get("/logout",(req,res)=>{
    req.logout()
    return res.redirect("/blog")
})
// invalid address
app.get("*",(req,res)=>{
    res.render("404")
})

// seed DB of blogs
const Blog = require("./models/blog")
let tagsTest = ["code", "javascript","weather","user","xmen","nodejs","army", "today", "danilo", "yesterday", "super", "hello", "beatles", "french", "ecommerce","bad","goodbye","javascript","csharp","fake","news","coka cola","kansas", "lowerCase","UPPERCASE","uppercase","yesItIs"]
let description = " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." + "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n --Danilo\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
let bulk =[]
async function seedDB(){
    console.log("seeding DB")
    await Blog.deleteMany()
    console.log("Db dropped")
    for(let i =0; i<10; i++){
        let randomTag1 = Math.floor(Math.random() *tagsTest.length )
        let randomTag2 = Math.floor(Math.random() *tagsTest.length) 
        bulk.push({
            title: `title ${i}`,
            tags: [tagsTest[randomTag1], tagsTest[randomTag2]],
            description
        })
    }
    Blog.insertMany(bulk)
    console.log("Done Seeding")
}
// seedDB()

 



// Connection
const port = process.env.PORT || 8000
app.listen(port, ()=>{
    console.log("Server is On")
})

// http://localhost:8000/google/redirect
