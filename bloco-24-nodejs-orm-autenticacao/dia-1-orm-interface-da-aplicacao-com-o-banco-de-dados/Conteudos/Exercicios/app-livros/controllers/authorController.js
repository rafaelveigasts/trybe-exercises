// Bônus: Crie um endpoint para buscar o livro por author (pode adaptar algum que já exista);
const { Book } = require('../models');

const getByAuthorName = async (req, res) => {
  try {
    const { name } = req.params;
    const books = await Book.findAll({ where: { author: name } });
    res.status(200);
    res.json(books);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  getByAuthorName,
};