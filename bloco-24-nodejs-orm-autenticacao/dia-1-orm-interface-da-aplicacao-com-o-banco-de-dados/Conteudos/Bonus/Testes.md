## Testes

Para testarmos os models criados com o Sequelize, seguiremos os mesmos conceitos vistos anteriormente: iremos isolar as operações de IO e utilizaremos bibliotecas específicas para nos ajudar com os stubs e asserções .
Antes de começar a realizar os testes, vamos instalar nossas dependências de desenvolvimento como nas aulas anteriores:

**npm i mocha chai sinon chai-http -D**

Agora vamos alterar a linha abaixo em nosso package.json para executar nossos testes com o comando npm test como nas aulas anteriores:

"scripts": {
  ...
  "test": "mocha ./tests/**/*$NAME*.test.js --exit"
},

Antes de partimos efetivamente para realização dos testes, utilize o arquivo index.js na raiz do seu projeto. Nele, não esqueça de exportar a constante app para utilização com os testes.

  ./index.js

// const express = require('express');
// const bodyParser = require("body-parser");

// const userController = require('./controllers/userController');

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());

// app.use('/user', userController);

// app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

module.exports = app;

Abaixo temos um exemplo de como podemos testar nosso controller de "busca de pessoas usuárias", que consome nosso model:

  tests/integration/controllers/user.test.js

const chai = require('chai');
const { stub } = require('sinon');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const { expect } = chai;

const app = require('../../../index');
const { User } = require('../../../models');

describe('Busca todos os usuários', () => {
  describe('quando não existe nenhum usuário cadastrado', () => {
    const findAllStub = stub(User, 'findAll');

    before(() => {
      findAllStub.resolves([]);
    });

    after(() => {
      findAllStub.restore();
    });

    it('called User.findAll', async () => {
      await chai.request(app)
        .get('/user');

      expect(User.findAll.calledOnce).to.be.equals(true);
    });

    it('o status é 200', async () => {
      const result = await chai.request(app)
        .get('/user');

      expect(result.status).to.be.equals(200);
    });

    it('a resposta é um array', async () => {
      const result = await chai.request(app)
        .get('/user');

      expect(result.body).to.be.an('array');
    });

    it('o array está vazio', async () => {
      const result = await chai.request(app)
        .get('/user');

      expect(result.body).to.be.empty;
    });
  });
});

Se quisermos testar nosso model em sí, podemos utilizar bibliotecas específicas para nos ajudar nessa tarefa. Uma bastante utilizada é a Sequelize Test Helpers . Vamos ver um exemplo de como podemos utilizá-la:

  tests/unit/models/user.test.js

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../../models/user');

describe('O model de User', () => {
  const User = UserModel(sequelize, dataTypes);
  const user = new User();

  describe('possui o nome "User"', () => {
    checkModelName(User)('User');
  });

  describe('possui as propriedades "fullName" e "email"', () => {
    ['fullName', 'email'].forEach(checkPropertyExists(user));
  });
});

É possível fazer essas asserções diretamente, porém, esse módulo já possui diversas funções prontas para facilitar a escrita dos testes.
