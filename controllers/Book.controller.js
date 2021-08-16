const mongoose = require("mongoose");
const { BookSchema, SeedBooks } = require('../models/Book.model');

const Book = mongoose.model('Books', BookSchema);

const BookController = (req, res) => {
  Book.find({}, (err, value) => {
    res.send(value);
  })
}

module.exports = BookController;
