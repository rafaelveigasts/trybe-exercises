const connection = require("./connection");

const getAllBooks = async () => {
  const [books] = await connection.execute(
    'SELECT id, title, author_id FROM model_example.books;',
  );
  return books
}

module.exports = {
  getAllBooks,
}