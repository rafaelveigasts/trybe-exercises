const MovieService = require('../services/movieService');

const create = async (req, res) => {
  const { title, directedBy, releaseYear } = req.body;

  const movie = await MovieService.create({ title, directedBy, releaseYear });

  if (!movie) {
    return res.status(400).send('Dados inválidos');
  }
  res.status(201).send('Filme criado com sucesso!');
};

module.exports = {
  create
}