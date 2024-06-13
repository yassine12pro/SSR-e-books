const router =require("express").Router()
const contactController=require("../controllers/contact.controller")

router.get("/",contactController.contactController)





module.exports=router