const bookController=require("../controllers/book")
const router =require("express").Router()

router.get("/",bookController.ThreeBooksController)




module.exports=router