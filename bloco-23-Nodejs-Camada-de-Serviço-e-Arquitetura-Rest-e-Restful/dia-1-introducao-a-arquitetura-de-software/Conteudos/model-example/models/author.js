const connection = require("./connection");

const getNewAuthor = ({ id, firstName, middleName, lastName }) => {
  const fullName = [firstName, middleName, lastName].filter((name)=> name).join(" ");

  return { id, firstName, middleName, lastName, fullName };
};

const serialize = (authorData) => {
  return {
    id: authorData.id,
    firstName: authorData.first_name,
    middleName: authorData.middle_name,
    lastName: authorData.last_name,
  };
};

const getAllAuthors = async () => {
  const [authors] = await connection.execute(
    'SELECT id, first_name, middle_name, last_name FROM model_example.authors;',
    );
  return authors.map(serialize).map(getNewAuthor);
};

module.exports = {
  getAllAuthors,
};

// quando desestruturamos o array [authors] pegamos apenas o primeiro elemento e jogamos na variavel authors.

// no primeiro momento o authors está no formato snakeCase, fazemor o serialize transformar para camelCase.
// depois retornamos o authors fazendo o map para transformar em camelCase.
