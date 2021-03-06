## Controllers e testes

E por último vamos escrever testes e implementar a camada de Controller .

Essa camada recebe as requisições dos clientes, preparando o input e o output da pessoa usuária de acordo com sua comunicação com a camada de Service .

Dessa forma, nos testes devemos contemplar qual a resposta para o cliente apropriado em cada cenário, qual o status e o body em cada resposta:

Ao chamar o método create do controller movieController esperamos:

1) Quando o payload informado não é válido:
  Retornar o código de status 400 - Bad Request ;
  Retornar a mensagem Dados inválidos .

2) Quando o payload informado é válido:
  Retornar o código de status 201 - Created ;
  Retornar a mensagem Filme criado com sucesso! .

Percebam que os testes do controller tem uma particularidade em sua implementação. Isso acontece porque diferente das outras camadas, o controller não possui funções simples que retornam um resultado qualquer, mas sim middlewares que funcionam a partir dos objetos req , res , next e error .

Dessa forma, para conseguirmos testar, precisaremos passar um input a partir do req e validar o output a partir do res , validando se os devidos métodos foram chamados e com os parâmetros esperados.

Para nos ajudar com essa tarefa iremos utilizar recursos do sinon , observe como irá ficar no teste do movieController

  tests/controllers/movieController.test.js

const sinon = require('sinon');
const { expect } = require('chai');

const MoviesController = {
  create: () => {}
};

describe('Ao chamar o controller de create', () => {
  describe('quando o payload informado não é válido', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {};

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 400', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(400)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Dados inválidos"', async () => {
      await MoviesController.create(request, response);

      expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
    });

  });

  describe('quando é inserido com sucesso', () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        title: 'Example Movie',
        directedBy: 'Jane Dow',
        releaseYear: 1999,
      };

      response.status = sinon.stub()
        .returns(response);
      response.send = sinon.stub()
        .returns();
    })

    it('é chamado o status com o código 201', async () => {
      await MoviesController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });

    it('é chamado o send com a mensagem "Filme criado com sucesso!"', async () => {
      await MoviesController.create(request, response);

      expect(response.send.calledWith('Filme criado com sucesso!')).to.be.equal(true);
    });

  });
});

Criamos stubs específicos para simular funções de resposta ( response ), dessa forma conseguimos utilizar o método calledWith fornecido pelo Sinon para testarmos se a função foi chamada com os parâmetros esperados.

Por exemplo, no trecho de código abaixo, validamos se o método res.status (ou response.status ) foi chamado passando o status code 400 . Lembre-se que é dessa forma que nossa API responde à requisição da pessoa usuária, utilizando API's REST com frameworks de middleware, como o express .

expect(response.status.calledWith(400)).to.be.equal(true);

Ao rodar os testes com NAME=movieController npm test , eles deverão quebrar. Por tanto, vamos à implementação da nossa camada. Podemos fazê-la da seguinte maneira:

  controllers/movieController.js

const MoviesService = require('../services/movieService');

const create = async (req, res) => {
  const { title, directedBy, releaseYear } = req.body;

  const movie = await MoviesService
  .create({ title, directedBy, releaseYear });

  if (!movie) {
    return res
      .status(400)
      .send('Dados inválidos');
  }

  /*
    Perceba que `middlewares`, ao invés de executar um `return` padrão,
    como outras funções, vão, na maior parte das vezes, devolver as
    funções passadas por parâmetro, através dos objetos `req, res, next`.

    No nosso caso, estamos utilizando os métodos `status()` e `send()`,
    de `res` (response) para escrever/devolver um valor para a
    requisição daquele `end-point`.
  */
  res
    .status(201)
    .send('Filme criado com sucesso!');
};

module.exports = {
  create,
};

Feito isso, vamos para o passo de refatoração ( refactor ), ajustando os testes para receberem nossa implementação e também isolar nosso controller das demais camadas:

  tests/controllers/movieController.test.js


// const sinon = require('sinon');
// const { expect } = require('chai');

const MoviesService = require('../../services/movieService');
const MoviesController = require('../../controllers/movieController');

// describe('Ao chamar o controller de create', () => {
//   describe('quando o payload informado não é válido', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {};

//       response.status = sinon.stub()
//         .returns(response);
//       response.send = sinon.stub()
//         .returns();

      /*
        Perceba que nosso stub também simula os comportamentos do `service`,
        dessa forma, conseguimos testar o comportamento do controller de
        maneira isolada.

        Aqui, todos os testes que requisitarem o serviço, devem receber
        retorno `false`.
      */
      sinon.stub(MoviesService, 'create')
        .resolves(false);
//     });

    // Restauraremos a função `create` original após os testes.
    after(() => {
      MoviesService.create.restore();
    });

//     it('é chamado o status com o código 400', async () => {
//       await MoviesController.create(request, response);

//       expect(response.status.calledWith(400)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Dados inválidos"', async () => {
//       await MoviesController.create(request, response);

//       expect(response.send.calledWith('Dados inválidos')).to.be.equal(true);
//     });

//   });

//   describe('quando é inserido com sucesso', () => {
//     const response = {};
//     const request = {};

//     before(() => {
//       request.body = {
//         title: 'Example Movie',
//         directedBy: 'Jane Dow',
//         releaseYear: 1999,
//       };

//       response.status = sinon.stub()
//         .returns(response);
//       response.send = sinon.stub()
//         .returns();

      /*
        Aqui, todos os testes que requisitarem o serviço, devem receber
        retorno `true`.
      */
      sinon.stub(MoviesService, 'create')
        .resolves(true);
//     })

    // Restauraremos a função `create` original após os testes.
    after(() => {
      MoviesService.create.restore();
    });

//     it('é chamado o status com o código 201', async () => {
//       await MoviesController.create(request, response);

//       expect(response.status.calledWith(201)).to.be.equal(true);
//     });

//     it('é chamado o send com a mensagem "Filme criado com sucesso!"', async () => {
//       await MoviesController.create(request, response);

//       expect(response.send.calledWith('Filme criado com sucesso!')).to.be.equal(true);
//     });

//   });
// });

Ao rodar nossos testes com NAME=movieController npm test teremos o seguinte resultado:

<img src="controller-test-i.png" />
