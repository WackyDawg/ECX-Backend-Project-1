const { validationResult } = require("express-validator");
const Book = require("../models/bookSchema");

const createBook = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { name } = req.body;

    const bookExists = await Book.findOne({ name });

    if (bookExists) {
      return res.status(400).json({
        message: `Book with name "${name}" already exists`,
      });
    }

    const newBook = new Book({ name });
    await newBook.save();

    return res.status(201).json({
      message: "Book created successfully🎉",
      newBook: newBook,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getBook = async (req, res) => {
  const userId = req.params.bookID;

  try {
    const book = await Book.findById(userId);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      book: book,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateBook = async (req, res) => {
  const { name } = req.body;

  try {
    const updatedBook = await Book.findOneAndUpdate(
      { _id: req.params.bookID },
      { name: name },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({
      message: "Book updated successfully",
      updatedBook: updatedBook,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Book.deleteOne({ _id: req.params.bookID });

    if (deletedBook.deletedCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully🗑️" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createBook,
  getBook,
  updateBook,
  deleteBook,
};
