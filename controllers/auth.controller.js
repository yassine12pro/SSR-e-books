const authmodel=require("../models/auth.model")



exports.getRegisterPage=(req,res,next)=>{
    res.render("register",{verifUser:req.session.userId,message:req.flash("error")[0]})
}
exports.postRegisterData=(req,res,next)=>{
    authmodel.registerFunctionModel(req.body.name,req.body.email,req.body.password).then((user)=>{
        res.redirect("/login")
    }).catch((ERR)=>{
        // console.log(ERR)
        // res.render("alert")
        req.flash("error",ERR)
        res.redirect("/register")
    })
}




exports.getLoginPage=(req,res,next)=>{
    res.render("login",{verifUser:req.session.userId,message:req.flash("error")[0]})
}

exports.postLoginData=(req,res,next)=>{
    authmodel.LoginFunctionModel(req.body.email,req.body.password).then((id)=>{
        req.session.userId = id
        res.redirect("/")
    }).catch(err=>{
        req.flash("error",err)
        res.redirect("/login")
    })
}
exports.logoutfn=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
}