## Validações

### Inserindo validações na aplicações

Agora temos uma aplicação na qual as regras de negócio dizem respeito todas ao formato dos campos na entidade Author. Por exemplo: "Nome deve ser uma string e não pode ser vazio". No entanto, para ilustrar melhor o tipo de regra de negócio que costuma ser tratada pelo service, vamos introduzir uma nova regra: "Uma pessoa autora com mesmo nome completo não pode ser cadastrado duas vezes."

Essa é uma regra mais complexa, que exige mais lógica do que um simples if para ser validada. Sendo assim, é o tipo de regra que se encaixa perfeitamente no service que vamos criar agora!

Crie a pasta services e dentro dela o arquivo Author.js , adicione o código abaixo no arquivo:

const Author = require('../models/Author');

const create = async (firstName, middleName, lastName) =>
  Author.create(firstName, middleName, lastName);

const findById = async (id) => Author.findById(id);

const createAuthor = async (firstName, middleName, lastName) =>
  Author.createAuthor(firstName, middleName, lastName);

module.exports = {
  getAll,
  findById,
  createAuthor,
};

Até agora, nosso service realiza todas as três operações que o model também realiza, sem nenhuma lógica adicional. Repare como, em cada função, nós apenas retornamos uma chamada para aquela mesma função dentro do model. Chegou a hora de mudar isso!

Vamos começar a refatoração pelo método Create . Antes de tudo, vamos precisar de uma função no nosso model que nos permita buscar autores pelos três nomes. Isso vai permitir a implementação da regra "Uma pessoa autora com mesmo nome completo não pode ser cadastrado duas vezes."

Altere o arquivo hello-msc/models/Author.js da seguinte maneira:

// hello-msc/models/Author.js

/* ... */

//  const createAuthor = async (firstName, middleName, lastName) => {
//    const [author] = await connection.execute(
//      'INSERT INTO model_example.authors (first_name, middle_name, last_name) VALUES (?, ?, ?)',
//      [firstName, middleName, lastName]
//    );
//    return getNewAuthor({ id: author.insertId, firstName, middleName, lastName });
//  }

const findByName = async (firstName, middleName, lastName) => {
  // Determinamos se devemos buscar com ou sem o nome do meio
  let query = 'SELECT id, first_name, middle_name, last_name ' +
              'FROM model_example.authors ';
    if (middleName) {
      query += 'WHERE first_name = ? AND middle_name = ? AND last_name = ?';
    } else {
      query += 'WHERE first_name = ? AND last_name = ?';
    }

  const params = middleName ? [firstName, middleName, lastName] : [firstName, lastName];

  // Executamos a consulta e retornamos o resultado
  const [authorData] = await connection.execute(query, params);

  // Caso nenhum author seja encontrado, devolvemos null
  if (authorData.length === 0) return null;

  // Caso contrário, retornamos o author encontrado
  return serialize(authorData);
};

// module.exports = {
//   getAll,
//   findById,
//   isValid,
//   create,
    findByName
// };

Com essa função pronta, precisamos modificar o service para que ele a utilize e aplique nossa regra de negócio. Modifique o arquivo services/Author.js da seguinte forma:

// const Author = require('../models/Author');

// const getAll = async () => Author.getAll();

// const findById = async (id) => Author.findById(id);

const createAuthor = async (firstName, middleName, lastName) => {
  // Buscamos um autor com o mesmo nome completo que desejamos criar
  const existingAuthor = await Author.findByName(firstName, middleName, lastName);

  // Caso essa pessoa autora já exista, retornamos um objeto de erro informando
  // que não é possível criar a pessoa autora pois ele já existe
  if (existingAuthor) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Uma pessoa autora já existe com esse nome completo',
      },
    };
  }

  // Caso a pessoa autora não exista e, portanto, possa ser criado
  // chamamos o model e retornamos o resultado
  return Author.createAuthor(firstName, middleName, lastName);
};

// const findById = async (id) => Author.findById(id);

// const getAll = async () => Author.getAll();

// module.exports = {
//   getAll,
//   findById,
//   createAuthor,
// };


