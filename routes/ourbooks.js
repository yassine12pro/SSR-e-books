
const ourbooksController=require("../controllers/ourbooks")
const router =require("express").Router()
const auth=require("./guardAuth")
const multer =require("multer")



router.get("/books",auth.isAuth,ourbooksController.AllbooksController)
router.get("/books/:id",auth.isAuth,ourbooksController.getOneBookDetailsController)


router.get("/addbook",auth.isAuth,ourbooksController.getAddbookController)
router.post("/addbook",multer({
     storage : multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'assets/uploades')
        },
        filename: function (req, file, cb) {
          cb(null, Date.now() + "-"+ file.originalname )
        }
      })
}).single("image"),auth.isAuth,ourbooksController.postAddbookController)


module.exports=router     