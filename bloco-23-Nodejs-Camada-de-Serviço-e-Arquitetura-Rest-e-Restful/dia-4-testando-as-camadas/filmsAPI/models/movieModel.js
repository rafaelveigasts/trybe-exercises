const connection = require('./connection');

const create = async ({ title, directBy, releaseYear }) => {
  const [result] = await connection.execute(
    'INSERT INTO model_example.movies (title, directBy, releaseYear) VALUES (?, ?, ?)',
    [title, directBy, releaseYear]
  );
  return {
    id: result.insertId,
  };
};

module.exports ={
  create,
}