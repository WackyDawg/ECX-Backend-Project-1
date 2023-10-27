const express = require('express');
const router = express.Router(); 
//const {
 //  validateBookBody,
   //validateBookUpdateBody,
 //} = require("../middleware/validation");
const {allBooks, getBook, createBook, updateBook, deleteBook} = require('../controllers/bookController');


router.get("/api", (req, res) => {
   res.send('Woo-Hoo ths is my Book CRUD API!🙋')
})

router.get("/api/books", allBooks);

router.get("/api/:bookID", getBook);

router.post("/api",  createBook);

router.put("/api/:bookID",  updateBook);

router.delete("/api/:bookID", deleteBook);

module.exports = router;
