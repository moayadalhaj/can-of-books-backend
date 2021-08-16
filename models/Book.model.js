const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: String,
  status: String,
  description: String,
  email: String,
});

const Book = mongoose.model('Books', BookSchema);
const SeedBooks = () => {
  const richDadPoorDad = new Book({
    title: 'rich dad poor dad',
    status: 'perfect',
    description: 'Starting point for anyone lokking to gain control of their financial future',
    email: 'moayad.alhaj21@gmail.com',
  });
  const theDaVinciCode = new Book({
    title: 'the da vinci code',
    status: 'good',
    description: 'The Da Vinci Code follows "symbologist" Robert Langdon and cryptologist Sophie Neveu after a murder in the Louvre Museum in Paris causes them to become involved in a battle between the Priory of Sion and Opus Dei over the possibility of Jesus Christ and Mary Magdalene having had a child together.',
    email: 'moayad.alhaj21@gmail.com',
  });
  const sevenHabits = new Book({
    title: 'The 7 Habits of Highly Effective Teens',
    status: 'the best',
    description: "don't talk about fight club (first rule)",
    email: 'moayad.alhaj21@gmail.com',
  });
  richDadPoorDad.save();
  theDaVinciCode.save();
  sevenHabits.save();
};

module.exports = { Book, SeedBooks, BookSchema };
