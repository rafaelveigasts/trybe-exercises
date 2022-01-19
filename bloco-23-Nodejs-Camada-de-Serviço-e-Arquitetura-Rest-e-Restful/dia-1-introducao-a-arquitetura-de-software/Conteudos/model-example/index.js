const express = require('express');
const app = express();
const port = process.env.port || 3000;

const author = require('./models/author');

app.get('/authors', async (_req, res) => {
  const authors = await author.getAllAuthors();

  res.status(200).json(authors);
});


app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});

