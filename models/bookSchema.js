const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

}, { collection: "books" }); 

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
