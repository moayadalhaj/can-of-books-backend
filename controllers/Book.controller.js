const mongoose = require("mongoose");
const Book = require('../models/Book.model');
const { jwt, getKey } = require('./Auth0.controller');

const BookController = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    Book.find({}, (err, books) => {
      res.send(books);
    })
  })
}

const AddBook = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    const newBook = new Book({
      title: req.body.title,
      status: req.body.status,
      description: req.body.description,
      email: req.body.email
    });
    newBook.save();
    res.send(newBook);
  })
}

const DeleteBook = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    let bookId = req.params.id;
    Book.findByIdAndDelete({ _id: bookId }, (err, data) => {
      if (err) {
        res.send("delete faild")
      }
      Book.find({}, (err, data) => {
        res.send(data);
      })
    })
  })
}

const UpdateBook = (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    let bookId = req.params.id;
    Book.findOne({ _id: bookId }, (err, data) => {
      if (err) {
        res.send("delete faild")
      }
      data.title = req.body.title;
      data.status = req.body.status;
      data.description = req.body.description;
      data.save();
      res.send(data);
    })
  })
}
module.exports = { BookController, AddBook, DeleteBook, UpdateBook };
