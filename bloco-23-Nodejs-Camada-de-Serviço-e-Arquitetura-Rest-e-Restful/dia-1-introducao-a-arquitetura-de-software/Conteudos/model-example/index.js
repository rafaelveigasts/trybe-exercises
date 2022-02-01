const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
const port = process.env.port || 3000;

const author = require("./models/author");
const book = require("./models/book");

app.get("/authors", async (_req, res) => {
  const authors = await author.getAllAuthors();

  res.status(200).json(authors);
});

app.get("/authors/:id", async (req, res) => {
  const { id } = req.params;

  const authors = await author.findById(id);

  if (!authors) return res.status(404).json({ message: "Not found" });

  res.status(200).json(authors);
});

app.post('/authors', async(req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  if(!author.isValid(first_name, middle_name, last_name)) {
    return res.status(400).json({message: 'Dados inválidos'})
  }

  await author.createAuthor(first_name, middle_name, last_name);

  res.status(201).json({message: 'Autor criado com sucesso'})
})

app.get("/books", async (_req, res) => {
  const books = await book.getAllBooks();
  res.status(200).json(books);
});

app.post('/books', async (req, res) => {
  const { title, author_id } = req.body;
  console.log(author_id);
  if (!book.isBookValid(title, author_id)) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }
  await book.createBook(title, author_id);
  res.status(201).json({ message: 'Livro criado com sucesso' });
})

app.get("/books/:id", async (req, res) => {
  const { id } = req.params;
  const books = await book.findByBookId(id);

  if (!books) return res.status(404).json({ message: "Not found" });

  res.status(200).json(books);
});

app.listen(port, () => {
  console.log(`Servidor online na porta ${port}`);
});
