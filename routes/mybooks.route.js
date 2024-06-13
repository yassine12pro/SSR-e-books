const route=require("express").Router()
const bookController =require("../controllers/ourbooks")
const multer=require("multer")
const auth=require("./guardAuth")

route.get("/",bookController.getmybooks)
route.get("/delete/:id",bookController.deletebookController)
route.get("/update/:id",bookController.getupdatepage)
route.post("/update",multer({
    storage : multer.diskStorage({
       destination: function (req, file, cb) {
         cb(null, 'assets/uploades')
       },
       filename: function (req, file, cb) {
         cb(null, Date.now() + "-"+ file.originalname )
       }
     })
}).single("image"),auth.isAuth,bookController.postupdatepageController)


module.exports=route 