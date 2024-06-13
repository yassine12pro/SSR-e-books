// const exp = require("constants")
const express = require("express")
const path=require("path")
const app = express()
const routerBook=require("./routes/book")
const routerOurBooks=require("./routes/ourbooks")
const authRouter=require("./routes/autth.route")
const session =require("express-session")
var MongoDBStore = require('connect-mongodb-session')(session);
const flash=require("connect-flash")
const routemybooks=require("./routes/mybooks.route")
const contactRoute=require("./routes/contactRoute")
const aboutRoute=require("./routes/aboutRoute")

app.use(express.static(path.join(__dirname,"assets")))
app.set("view engine","ejs")
app.set("views","views")
 
var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/Library',
    collection: 'mySessions'
  });


  app.use(flash())


  app.use(session({
    secret: 'This is a secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    
    saveUninitialized: true
  }));
app.use("/",routerBook)
app.use("/",routerOurBooks)
app.use("/",authRouter)
app.use("/mybooks",routemybooks)
app.use("/contact",contactRoute)

// app.get("/contact",(req,res,next)=>{
//     res.render("contact",{verifUser:req.session.userId})
// })
app.use("/about",aboutRoute)

// app.get("/about",(req,res,next)=>{
//     res.render("about",{verifUser:req.session.userId})
// })
// app.get("/addbook",(req,res,next)=>{
//     res.render("addbook",{verifUser:req.session.userId})
// })
 
// app.get("/mybooks",(req,res,next)=>{
//     res.render("mybooks",{verifUser:req.session.userId})
// })
// app.get("/details",(req,res,next)=>{
//     res.render("details")
// })

app.listen(3000,()=>{
    console.log("server run on port 3000")
})