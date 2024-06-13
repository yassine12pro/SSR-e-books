const bookModel =require("../models/book")

exports.AllbooksController=(req,res,next)=>{
    bookModel.getAllbooks().then(books=>{
        res.render("books",{books:books ,verifUser:req.session.userId})
    })
}

exports.getOneBookDetailsController=(req,res,next)=>{
    let id = req.params.id
  

    bookModel.getOneBookDetails(id).then(resbook => {
        if (!resbook) {
            // Handle case where the book is not found
            const error = new Error('Book not found');
            error.status = 404;
            return next(error);
        }
        res.render('details', { book: resbook ,verifUser:req.session.userId});
    })
    .catch(error => {
        next(error); 
    });
}

exports.getAddbookController=(req,res,next)=>{
    res.render("addbook",{verifUser:req.session.userId,smessage:req.flash("smessage")[0],emessage:req.flash("emessage")[0]})
}
exports.postAddbookController=(req,res,next )=>{
    console.log(req.body);
    console.log(req.file.filename);
    bookModel.postaddbookmodel(req.body.title,req.body.description,req.body.author,req.body.price,req.file.filename,req.session.userId).then((msg)=>{
        req.flash("smessage",msg)
        res.redirect("/addbook")
    }).catch(err=>{
        req.flash("emessage",err)
        res.redirect("/addbook")
    }
       
    )
}
exports.getmybooks=(req,res,next)=>{
    bookModel.getmybooks(req.session.userId).then((books)=>{
        res.render("mybooks",{verifUser:req.session.userId,books:books})

    })}



exports.deletebookController=(req,res,next)=>{
    let id=req.params.id
    bookModel.deletebook(id).then((verif)=>{
        res.redirect("/mybooks")
        //console.log(verif);
    }).catch(err=>{
        console.log(err);
    })

}
exports.getupdatepage=(req,res,next)=>{

    let id=req.params.id
    bookModel.getupdatepageModel(id).then((book)=>{
        console.log(book);
        res.render("update",{verifUser:req.session.userId,updateBook:book,smessage:req.flash("smessage")[0],emessage:req.flash("emessage")[0]})

    })

}

exports.postupdatepageController=(req,res,next)=>{

    if(req.file){
        bookModel.postupdatepageModel(req.body.bookId,req.body.title,req.body.description,req.body.author,req.body.price,req.file.filename,req.session.userId).then((msg)=>{
            req.flash("smessage",msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
    
        }).catch(err=>{
            req.flash("emessage",err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }else{
        bookModel.postupdatepageModel(req.body.bookId,req.body.title,req.body.description,req.body.author,req.body.price,req.body.oldImage,req.session.userId).then((msg)=>{
            req.flash("smessage",msg)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
    
        }).catch(err=>{
            req.flash("emessage",err)
            res.redirect(`/mybooks/update/${req.body.bookId}`)
        })
    }
  

}