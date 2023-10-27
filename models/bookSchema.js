const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        
    },

}, { collection: "books" }); 

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
