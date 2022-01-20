// hello-msc/controllers/Author.js

const Author = require('../services/Author');

const getAll = async (req, res) => {
  const authors = await Author.getAll();

  return res.status(200).json(authors);
};


const findById = async (req, res, next) => {
  // Extraímos o id da request
  const { id } = req.params;

  // Pedimos para o service buscar o autor
  const author = await Author.findById(id);

  // Caso o service retorne um erro, interrompemos o processamento
  // e inicializamos o fluxo de erro
  if (author.error) return next(author.error);

  // Caso não haja nenhum erro, retornamos o author encontrado
  return res.status(200).json(author);
};

module.exports = {
  getAll,
  findById,
};