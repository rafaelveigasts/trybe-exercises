const express = require('express');
const bodyParser = require('body-parser');

const booksController = require('./controllers/booksController');
const authorController = require('./controllers/authorController'); // Bônus: Crie um endpoint para buscar o livro por author (pode adaptar algum que já exista);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/books', booksController.getAll);
app.get('/book/:id', booksController.getById);
app.get('/author/:name', authorController.getByAuthorName); // Bônus: Crie um endpoint para buscar o livro por author (pode adaptar algum que já exista);
app.post('/book', booksController.createNew);
app.post('/book/:id', booksController.updateById);
app.delete('/book/:id', booksController.deleteById);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));