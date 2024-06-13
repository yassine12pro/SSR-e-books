const router =require("express").Router()
const authController=require("../controllers/auth.controller")
const body=require("express").urlencoded({extended:true})
const auth=require("./guardAuth")



router.get("/register",auth.notAuth,authController.getRegisterPage)
router.post("/register",body,authController.postRegisterData)

router.get("/login",auth.notAuth,authController.getLoginPage)
router.post("/login",body,authController.postLoginData)


router.post("/logout",body,authController.logoutfn)

module.exports=router