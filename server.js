'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const app = express();
app.use(cors());
const { BookController, AddBook, DeleteBook, UpdateBook } = require('./controllers/Book.controller');
const router = express.Router();
const PORT = process.env.PORT || 8000;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/bookData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', (req, res) => {
  res.send('working well....')
});

app.get('/books', BookController);
app.post('/books', AddBook);
app.delete('/books/:id', DeleteBook);
app.put('/books/:id', UpdateBook);
app.listen(PORT, () => console.log(`listening on ${PORT}`));
