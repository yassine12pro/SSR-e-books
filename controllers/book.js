const bookModel =require("../models/book")

exports.ThreeBooksController=(req,res,next)=>{
    bookModel.getThreeBook().then(books=>{
        res.render("index",{
            books:books,
            verifUser:req.session.userId
        })
    })
}


