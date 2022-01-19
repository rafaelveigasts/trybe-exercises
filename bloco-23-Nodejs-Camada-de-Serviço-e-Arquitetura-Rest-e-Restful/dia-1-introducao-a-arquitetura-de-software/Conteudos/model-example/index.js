const express = require('express');
const app = express();
const port = process.env.port || 3000;

const author = require('./models/author');
const book = require('./models/book');

app.get('/authors', async (_req, res) => {
  const authors = await author.getAllAuthors();

  res.status(200).json(authors);
});

app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;

  const authors = await author.findById(id);

  if (!authors) return res.status(404).json({ message: 'Not found' });

  res.status(200).json(authors);
});


app.get('/books', async (_req, res) => {
  const books = await book.getAllBooks();
  res.status(200).json(books);
});



app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});

