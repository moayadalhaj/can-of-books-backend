'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const mongoose = require("mongoose");
const app = express();
app.use(cors());
const BookController = require('./controllers/Book.controller');
const router = express.Router();
const PORT = process.env.PORT || 8000;

mongoose.connect('mongodb://localhost:27017/booksData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const client = jwksClient({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}
app.get('/', (req, res) => {
  res.send('working well....')
});
app.get('/auth', (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, getKey, {}, (err, user) => {
    if (err) {
      res.send('invalid token');
    }
    res.send(user)
  })
});

app.get('/books', BookController);

app.listen(PORT, () => console.log(`listening on ${PORT}`));