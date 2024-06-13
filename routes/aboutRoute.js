const router =require("express").Router()
const aboutController=require("../controllers/about.controller")

router.get("/",aboutController.aboutController)





module.exports=router