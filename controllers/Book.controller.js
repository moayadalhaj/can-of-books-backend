const mongoose = require("mongoose");
const Book = require('../models/Book.model');

const BookController = (req, res) => {
  Book.find({}, (err, elements) => {
    res.send(elements);
  })
}

const AddBook = (req, res) => {
  try {
    const newBook = new Book({
      title: req.body.title,
      status: req.body.status,
      description: req.body.description,
      email: req.body.email
    });
    newBook.save();
    res.send(newBook);
  } catch (error) {
    res.json(error.message);
  }
}

const DeleteBook = (req, res) => {
  try {
    let bookId = req.params["id"];
    Book.findByIdAndDelete({ _id: bookId }, (err, data) => {
      if (err) {
        res.send("delete faild")
      }
      Book.find({}, (err, data) => {
        res.send(data);
      })
    })
  } catch (error) {
    res.json(error.message);
  }
}
module.exports = { BookController, AddBook, DeleteBook };
