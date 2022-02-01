const connection = require("./connection");
const Author = require('./author');


const getAllBooks = async () => {
  const [books] = await connection.execute(
    'SELECT id, title, author_id FROM model_example.books;',
  );
  return books
}

const findByBookId = async (id) => {
 
  const query = 'SELECT id, title,author_id FROM model_example.books WHERE id = ?'
  const [ bookData ] = await connection.execute(query, [id]);
  console.log(bookData);

  if (bookData.length === 0) return null;


  return bookData;
};

const isBookValid = async (title, authorId) => {
  if (!title || typeof title !== 'string' || title.length < 3) return false;
  if (!authorId || typeof authorId !== 'number' || !(await Author.findById(authorId))) return false;
  
  return true;
};

const createBook = async (title, authorId) => {
  console.log(title, authorId);
  connection.execute(
  'INSERT INTO model_example.books (title, author_id) VALUES (?,?)',
  [title, authorId],
  
  );
  };

module.exports = {
  getAllBooks,
  findByBookId,
  isBookValid,
  createBook,
}


/* Ainda usando a tabela books como referência crie uma rota books do tipo POST . Faça as seguintes validações:

Título não pode ser vazio;
Título precisa ter pelo menos três caracteres;
O campo author_id não pode ser vazio;
O campo author_id só é válido se existir uma pessoa autora com esse id;
Se algum dos requisitos anteriores não for atendido, retornar um json no seguinte formato { message: 'Dados inválidos' } com status 400 . Caso contrário, insira o livro na tabela books e retorne o json { message: 'Livro criado com sucesso! '} com o status 201 .
 */