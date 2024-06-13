const mongoose = require("mongoose");

var schemaBook = mongoose.Schema({
    
    title: String,
    description: String,
    author: String,
    price: Number,
    image: String,
    userId:String,
});

var book = mongoose.model("book", schemaBook);
var url = "mongodb://localhost:27017/Library";

exports.getThreeBook = () => {
    return new Promise((resolve, reject) => { // Swapped resolve and reject
        mongoose.connect(url).then(() => {
            return book.find({}).limit(3);
        }).then((books) => {
            mongoose.disconnect();
            resolve(books);
        }).catch((err) => {
            reject(err);
        });
    });
};
exports.getAllbooks = () => {
    return new Promise((resolve, reject) => { // Swapped resolve and reject
        mongoose.connect(url).then(() => {
            return book.find({});
        }).then((books) => {
            mongoose.disconnect();
            resolve(books);
        }).catch((err) => {
            reject(err);
        });
    });
};

exports.getOneBookDetails=(id)=>{
    return new Promise((resolve,reject)=>{
    
     mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         return book.findById(id)
   
       }).then(books=>{
           mongoose.disconnect()
           resolve(books)
   
       }).catch(err=>reject(err))
    })
 }

 exports.postaddbookmodel=(title,description,author,price,image,userId)=>{
    return new Promise((resolve,reject)=>{
    
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            let bookk =new book({
                title:title,
                description:description,
                author:author,
                price:price,
                image:image,
                userId:userId
            })
             return bookk.save()
        }).then(()=>{
            mongoose.disconnect()
            resolve("added")
        }).catch(err=>{
            mongoose.disconnect()

            reject(err);
        })
       })
 }
 exports.getmybooks = (userId) => {
    return new Promise((resolve, reject) => { // Swapped resolve and reject
        mongoose.connect(url).then(() => {
            return book.find({userId:userId});
        }).then((books) => {
            mongoose.disconnect();
            resolve(books);
        }).catch((err) => {
            reject(err);
        });
    });
};

exports.deletebook = (id) => {
    return new Promise((resolve, reject) => { // Swapped resolve and reject
        mongoose.connect(url).then(() => {
            return book.deleteOne({_id:id});
        }).then((books) => {
            mongoose.disconnect();
            resolve(true);
        }).catch((err) => {
            reject(err);
        });
    });
};
exports.getupdatepageModel = (id) => {
    return new Promise((resolve, reject) => { // Swapped resolve and reject
        mongoose.connect(url).then(() => {
            return book.findById(id);
        }).then((books) => {
            mongoose.disconnect();
            resolve(books);
        }).catch((err) => {
            reject(err);
        });
    });
};
exports.postupdatepageModel = (bookId,title,description,author,price,image,userId) => {
    return new Promise((resolve,reject)=>{
    
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{

            
            return book.updateOne({_id:bookId},{title:title, description:description,author:author,price:price,image:image,userId:userId})

        }).then(()=>{
            mongoose.disconnect()
            resolve("updated")
        }).catch(err=>{
            mongoose.disconnect()

            reject(err);
        })
       })
};