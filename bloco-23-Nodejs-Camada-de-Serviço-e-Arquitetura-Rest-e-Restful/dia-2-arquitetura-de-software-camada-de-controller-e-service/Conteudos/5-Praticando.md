## Praticando

Para colocar em prática os conceitos de controller e service vamos adicionar essas camadas à aplicação de autores que você viu ontem no conteúdo.

Crie os arquivos abaixo numa pasta chamada hello-msc :

// hello-msc/package.json

{
  "name": "hello-msc",
  "version": "0.0.1",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "Tryber",
  "license": "GPL-3.0",
  "dependencies": {
    "body-parser": "^1.19.0",
    "express": "^4.17.1",
    "express-rescue": "^1.1.31",
    "mysql2": "^2.2.5",
    "nodemon": "^2.0.7"
  }
}

Note que há duas dependências a mais no package.json do que vimos no exemplo de ontem: express-rescue e nodemon . O express-rescue garante que todos os erros assíncronos sejam passados para sua pilha de manipuladores de erros, permitindo que você tenha um código mais limpo e legível. O nodemon é uma ferramenta que reinicia automaticamente a aplicação node quando mudanças de arquivo no diretório são detectadas.

// hello-msc/index.js

const express = require('express');
const bodyParser = require('body-parser');

const Author = require('./models/Author');

const app = express();

app.use(bodyParser.json());

app.get('/authors', async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
});

app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: 'Not found' });

  res.status(200).json(author);
});

app.post('/authors', async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  if (!Author.isValid(first_name, middle_name, last_name)) {
    return res.status(400).json({ message: 'Dados inválidos' });
  }

  await Author.createAuthor(first_name, middle_name, last_name);

  res.status(201).json({ message: 'Pessoa autora criada com sucesso! ' });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});

Crie uma pasta models e dentro dela o arquivo os seguintes arquivos:


// hello-msc/models/connection.js

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'sua_senha',
  database: 'model_example'
});

module.exports = connection;

Use esse script para criar o banco de dados:

CREATE DATABASE IF NOT EXISTS model_example;

USE model_example;

CREATE TABLE IF NOT EXISTS authors (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    middle_name VARCHAR(100)
);



// hello-msc/models/Author.js

const connection = require('./connection');

// Cria uma string com o nome completo da pessoa autora

const getNewAuthor = (authorData) => {
const { id, firstName, middleName, lastName } = authorData;

const fullName = [firstName, middleName, lastName]
  .filter((name) => name)
  .join(' ');

return {
  id,
  firstName,
  middleName,
  lastName,
  name: fullName,
 };
};

// Converte o nome dos campos de snake_case para camelCase
const serialize = (authorData) => authorData.map((item) => getNewAuthor({
  id: item.id,
  firstName: item.first_name,
  middleName: item.middle_name,
  lastName: item.last_name}));

// Busca todos os autores do banco.

const getAll = async () => {
  const [authors] = await connection.execute(
    'SELECT id, first_name, middle_name, last_name FROM model_example.authors;'
  );
  return serialize(authors);
};

/*
Busca uma pessoa autora específica, a partir do seu ID
@param {String} id ID da pessoa autora a ser recuperado
*/
const findById = async (id) => {
  const query =
    'SELECT id, first_name, middle_name, last_name FROM model_example.authors WHERE id = ?';

  const [authorData] = await connection.execute(query, [id]);

  if (authorData.length === 0) return null;

  return serialize(authorData)[0];
};

const isValid = (firstName, middleName, lastName) => {
    if (!firstName || typeof firstName !== 'string') return false;
    if (!lastName || typeof lastName !== 'string') return false;
    if (middleName && typeof middleName !== 'string') return false;

    return true;
};

const createAuthor = async (firstName, middleName, lastName) => {
  const [author] = await connection.execute(
    'INSERT INTO model_example.authors (first_name, middle_name, last_name) VALUES (?, ?, ?)',
    [firstName, middleName, lastName]
  );
  return getNewAuthor({ id: author.insertId, firstName, middleName, lastName });
}

module.exports = {
  getAll,
  findById,
  isValid,
  createAuthor,
};

Por último, execute npm install dentro da pasta hello-msc para instalar as dependências.

Crie a pasta services e dentro dela o arquivo Authors.js, para onde transferiremos tudo aquilo que não precisa estar no model, como as funções getNewAuthor e isValid. A ideia é que na camada de services estejam os métodos que servirão como intermediários entre o index.js e as requisições ao banco de dados da camada de modelo.

// services/Authors.js

const Author = require('../models/Authors');

const getNewAuthor = (authorData) => {
  const { id, firstName, middleName, lastName } = authorData;

  const fullName = [firstName, middleName, lastName]
    .filter((name) => name)
    .join(' ');

  return {
    id,
    firstName,
    middleName,
    lastName,
    name: fullName,
  };
};

const isValid = (firstName, middleName, lastName) => {
  if (!firstName || typeof firstName !== 'string') return false;
  if (!lastName || typeof lastName !== 'string') return false;
  if (middleName && typeof middleName !== 'string') return false;

  return true;
  }

const getAll = async () => {
  const authors = await Author.getAll();

  return authors.map(getNewAuthor);
}

const findById = async (id) => {
  const author = await Author.findById(id);

  if (!author) return null;

  return getNewAuthor(author);
};

module.exports = {
  getAll,
  findById,
}

Vamos refatorar nossa função createAuthor , agora que a responsabilidade de implementar o método isValid não é mais do model, iremos fazer no service a validação das informações recebidas na função e não mais no index.js .

Precisaremos fazer algumas alterações no index.js para lidar com as implicações do uso da camada de serviço.

// index.js

// const express = require('express');
// const bodyParser = require('body-parser');

const Author = require('./services/Authors')

// const app = express();

// app.use(bodyParser.json());
// app.get('/authors', async (_req, res) => {
//   const authors = await Author.getAll();
//   res.status(200).json(authors);
// });

// app.get('/authors/:id', async (req, res) => {
//   const { id } = req.params;
//   const author = await Author.findById(id);
//   if (!author) return res.status(404).json({ message: 'Author not found' });
//   res.status(200).json(author);
// });

app.post('/authors', async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;

  const author = await Author.createAuthor(first_name, middle_name, last_name);

  if (!author) return res.status(400).json({ message: 'Dados inválidos' });

  res.status(201).json(author);
});

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`listening on port ${PORT}`);
// });

Por fim, vamos alterar mais uma vez o método createAuthor , para que ele retorne o autor criado e não apenas true .


// services/Authors.js


// const Author = require('../models/Authors');

// const getNewAuthor = (authorData) => {
//   const { id, firstName, middleName, lastName } = authorData;

//   const fullName = [firstName, middleName, lastName]
//     .filter((name) => name)
//     .join(' ');

//   return {
//     id,
//     firstName,
//     middleName,
//     lastName,
//     name: fullName,
//   };
// };

// const isValid = (firstName, middleName, lastName) => {
//   if (!firstName || typeof firstName !== 'string') return false;
//   if (!lastName || typeof lastName !== 'string') return false;
//   if (middleName && typeof middleName !== 'string') return false;

//   return true;
// };

// const getAll = async () => {
//   const authors = await Author.getAll();

//   return authors.map(getNewAuthor);
// }

// const findById = async (id) => {
//   const author = await Author.findById(id);

//   return getNewAuthor(author);
// };

// const createAuthor = async (firstName, middleName, lastName) => {
//   const validAuthor = isValid(firstName, middleName, lastName);

//   if (!validAuthor) return false;

  const [author] = await Author.createAuthor(firstName, middleName, lastName)

  authorId = author.insertId;

  return getNewAuthor({
    id: authorId,
    firstName,
    middleName,
    lastName,
  })
// };

// module.exports = {
//   getAll,
//   findById,
//   createAuthor,
// }

E agora vamos para a última etapa que é inserir a camada de controller .

Crie a pasta controllers e, dentro dela, o arquivo Author.js . Nesse arquivo, vamos implementar a lógica para realizar todas as operações que nossa aplicação realiza até agora, retirando essa responsabilidade de lidar com os middlewares do index.js .


// controllers/Authors.js

const Author = require('../services/Authors');

const getAll = async (_req, res) => {
  const authors = await Author.getAll();

  res.status(200).json(authors);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const author = await Author.findById(id);

  if (!author) return res.status(404).json({ message: 'Author not found' });

  res.status(200).json(author);
}

const createAuthor = async (req, res) => {
  const { first_name, middle_name, last_name } = req.body;


  const author = await Author.createAuthor(first_name, middle_name, last_name);

  if (!author) return res.status(400).json({ message: 'Dados inválidos' });

  res.status(201).json(author);
};

module.exports = {
  getAll,
  findById,
  createAuthor,
}


São necessários alguns ajustes no index.js , para que ele chame agora a camada de controller e não mais a de service e para que cada rota referencie a função correta do controller .

// index.js

const express = require('express');
const bodyParser = require('body-parser');

const Author = require('./controllers/Authors');

const app = express();

app.use(bodyParser.json());

app.get('/authors', Author.getAll);

app.get('/authors/:id', Author.findById);

app.post('/authors', Author.createAuthor);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});


E, agora sim, nossa aplicação está utilizando as três camadas: Model, Service e Controllers.

Dessa forma, fica muito mais fácil realizar alterações nessa aplicação, principalmente se ela for crescer, como a maioria das aplicações acaba crescendo.

O próximo passo será acrescentar validações para garantir o melhor funcionamento da nossa aplicação. É o que faremos na próxima seção 😃!
