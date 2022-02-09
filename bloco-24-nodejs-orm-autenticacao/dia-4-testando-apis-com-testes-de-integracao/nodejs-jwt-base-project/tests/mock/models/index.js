/*
  A intenção aqui é gerar um Mock que simule o comportamento
  básico do Sequelize, dentro daquilo que é esperado na sua utilização
  (Ou seja, esse modelo prevê um uso/consumo específico da API).
  Então temos dois "Banco de Dados na Memória", ou seja, duas constantes
  armazenando Arrays que representam os dados de cada entidade.
  Esses dados não geram escrita no disco, a medida que quando o teste
  acaba, esses dados são descarregados da memória (Afinal, são duas
  constantes).
*/
const Users = require('./Users.json');
const Posts = require('./Posts.json');

/*
  Para acessar esses dados, foram criadas "funções fake" no mesmo formato
  das utilizadas nos modelos do Sequelize, mas que retornam valores que
  estão alocados temporariamente na memória da aplicação (A grosso modo,
  estamos manipulando arrays com o script e retornando seus dados).
  
  Você poderia fazer a mesma coisa, de forma mais ou menos 'hardcoded'.
  Aqui, optamos por colocar algum nível de dinamicidade para facilitar
  os testes.
*/
const mockCreate = (Instance, data) => {
  if (!data) {
    return;
  }

  const newData = data;
  if (Instance[0].id) {
    newData.id = Date.now();
  }
  Instance.push(newData);
  return newData;
};

const mockFindOne = (Instance, where) => {
  if (!where) {
    return Instance[0];
  }

  const entries = Object.entries(where);
  let result;

  entries.forEach((entry) => {
    const [key, value] = [entry[0], entry[1]];

    const index = Instance
      .findIndex((item) => !!item[key] && item[key] === value);
    if (index !== -1) {
      result = Instance[index];
    }
  });

  return result;
};

/*
  No nosso caso, os modelos aqui precisam de 3 funções principais
  (são aquelas que estão associadas às entidades nos `controllers`): 
  create, findAll e findOne para `User`;  um findAll para `Post`.
  Lembrando que todos as funções dos modelos do sequelize são assíncronas
  (Por isso a utilização do `async`).
*/
const User = {
  create: async (data) => mockCreate(Users, data),
  findAll: async () => Users,
  findOne: async ({ where }) => mockFindOne(Users, where),
};

const Post = {
  findAll: async () => Posts,
};

// Ao final, exportamos nossos Modelos falsos, para utilização nos testes
module.exports = {
  User,
  Post,
};