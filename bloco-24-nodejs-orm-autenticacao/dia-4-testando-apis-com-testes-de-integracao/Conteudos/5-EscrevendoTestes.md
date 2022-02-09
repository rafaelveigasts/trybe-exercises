## Escrevendo testes

**Escrevendo um teste base**

Iremos testar nossa API de maneira integrada, ou seja, queremos testar que dado um valor de entrada, o mesmo será processado pelas diversas partes da API, e então, nos dar um retorno conforme estabelecido pelo nosso "contrato". Diferente de como fizemos antes testando cada unidade da API com os testes unitários por camada.

Aqui vamos validar a criação de um User . Mas vamos começar com um teste simples primeiro?

Vamos construir então um teste que valida a requisição GET para nossa rota /api/users : Ou seja, um teste que espera que exista, na API, a comunicação controller <-> service <-> model , onde o model é um mock que traz um conjunto de dados hardcoded . O que caracteriza um teste de integração.

No fundo, estamos validando se a partir de uma requisição em uma ponta, existe o acesso (ou a tentativa de acesso) a um modelo na outra ponta. No nosso caso, se o model User é acessado em algum momento no service , e em **condições normais** , nos retorna aquilo que é esperado.

Para parametrizar nosso teste, **nosso contrato** aqui diz que uma requisição GET em /api/users retorna:

  com o status http 200 - OK ;
  com uma lista inicial contendo dois registros de pessoas usuárias.

**A partir da definição do contrato** (aquilo que é esperado no consumo da API). Podemos **transformá-lo em teste convertendo-o para asserções/ afirmações** , igual já fizemos anteriormente com o mocha e o chai :

Nesse sentido, crie um arquivo em ./tests , chamado createUsers.test.js e escreva o seguinte teste:
./tests/createUsers.test.js

const chai = require('chai');

const { expect } = chai;

describe('Rota /api/users', () => {
    describe('Consulta a lista de pessoas usuárias', () => {
        let response;

        before(async () => {
            response = await minhaRequisicao();
        });

        it(
            'A requisição GET para a rota traz uma lista inicial ' +
            'contendo dois registros de pessoas usuárias',
            () => {
              expect(response.body).to.have.length(2);
            }
        );

        it('Essa requisição deve retornar código de status 200', () => {
            expect(response).to.have.status(200);
        });
    });
});

Aqui temos uma definição boa de asserções para começarmos, mas que deve falhar pois minhaRequisicao() é um placeholder (tá só de enfeite) sem funcionalidade.

Agora precisamos de algum recurso que nos ajude a validar nossa API nesse processo.

Para nos ajudar com esse desafio, utilizaremos o plugin Chai HTTP ! Com esse plugin poderemos simular uma request a nossa API, sem inicializa-la manualmente .

Primeiro precisamos instalar esse novo pacote, para isso, execute:

**npm install -D chai-http**

E então no nosso teste iremos adicionar o seguinte trecho, adicionando o plugin na instância do chai:

  ./tests/createUsers.test.js

// const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

// const { expect } = chai;

// ...

Adicionado o plugin ao chai, poderemos consumir nosso server em express através dele, sem que haja a necessidade de subirmos a api manualmente. Para isso basta importarmos nossa api e então passamos ela como parâmetro ao método request do chai.

Nesse caso, uma boa prática para a arquitetura da API, é fazer a separação **do conjunto da definição das rotas e regras de middlewares** (Em um arquivo app.js , por exemplo. Que vai ser consumido pelo chaiHttp ) , do servidor propriamente dito, que consome essas regras (Esse continuaria em server.js , para utilizarmos em contextos de não-teste) :

  ./api/app.js

  const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();

apiRoutes.get('/api/posts', routes.getPosts);
apiRoutes.post('/api/users', routes.createUsers);
apiRoutes.get('/api/users', routes.getUsers);
apiRoutes.post('/api/login', routes.login);

app.use(apiRoutes);

/*
    Detalhe para a exportação do `app`, já que
    precisaremos dele nos testes com `chaiHttp` e
    para rodar nosso `server.js`
*/
module.exports = app;


  ./api/server.js

const app = require("./app");
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));  

Seu npm start , por tanto, deve apontar para o arquivo ./api/server.js (Separando as competências).

Após essa separação, voltando em createUsers.test.js , podemos testar nossos end-points utilizando a referência deles contida em ./api/app.js :

  ./tests/createUsers.test.js

  // const chai = require('chai');
// const chaiHttp = require('chai-http');

const server = require('../api/app');

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Rota /api/users', () => {
//     describe('Consulta a lista de pessoas usuárias', () => {
//         let response;

        before(async () => {
            response = await chai
                .request(server)
                .get('/api/users');
        });

//         it('Essa requisição deve retornar código de status 200', () => {
//             expect(response).to.have.status(200);
//         });

//         it('A requisição GET para a rota traz uma lista inicial contendo dois registros de pessoas usuárias', () => {
//             expect(response.body).to.have.length(2);
//         });
//     });
// });

Aqui, utilizamos o método request , que foi adicionado ao chai através do plugin. Esse método funciona de maneira parecida com o node-fetch ou o axios , a medida que retorna os dados da resposta, como corpo ( body ) e status .

Por tanto, ele nos permite chamar diretamente nossos end-points, simulando chamadas HTTP. Vejamos alguns exemplos disso:

/*
    Podemos chamar um `GET` que deve consumir nossa api,
    sem que pra isso precisemos subir ela manualmente
*/
const response = await chai.request(server)
  .get('/exemplo');

/*
    Da mesma forma, podemos chamar um `POST` passando um
    `body` e/ou um `header`, por exemplo:
*/
const response = await chai.request(server)
  .post('/favorite-foods')
  .set('X-API-Key', 'foobar')
  .send({
      name: 'jane',
      favoriteFood: 'pizza'
  });

Dessa forma, conseguimos encadear uma requisição get no endpoint definido.

Internamente, esse método já se encarrega de acessar a API e percorrer o pipeline daquele endpoint no express, até conseguir os dados da resposta.

Porém, esse teste ainda vai falhar... 🤦‍♀️ Isso porque não estamos isolando os models ! O que implica que eles tem que estar funcionando, ou seja, você precisa de um servidor MySQL rodando, como em condições de desenvolvimento normais.

Para resolver isso, vamos inserir nosso Mock no jogo, pois é através dele que conseguiremos enfim, rodar o teste completamente!

Para isso, vamos adicionar o Sinon ao script, fazendo um stub do método findAll do modelo User do nosso Sequelize , que é o que está no impedindo de concluir o teste atualmente:

  ./tests/createUsers.test.js

// const chai = require('chai');
const sinon = require('sinon');
// const chaiHttp = require('chai-http');

// const server = require('../api/app');

// Importação do modelo original, contido em `models`, a partir da raiz
const { User } = require('../models');
// Importação do mock utilizado nesse contexto
const { User: userMock }  = require('./mock/models')

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Rota /api/users', () => {
    before(() => {
        sinon.stub(User, 'findAll')
            .callsFake(userMock.findAll);
    });

    after(() => {
        User.findAll.restore();
    });

//     describe('Consulta a lista de pessoas usuárias', () => {
//         let response;

//         before(async () => {
//             response = await chai
//                 .request(server)
//                 .get('/api/users');
//         });

//         it('Essa requisição deve retornar código de status 200', () => {
//             expect(response).to.have.status(200);
//         });

//         it('A requisição GET para a rota traz uma lista inicial contendo dois registros de pessoas usuárias', () => {
//             expect(response.body).to.have.length(2);
//         });
//     });
// });

Aqui é importante notar duas coisas:

  1) O método utilizado no stub é o callFake , esse método substitui a chamada do método original, por aquela que você passar como parâmetro (no nosso caso, passando o nosso método userMock.findAll , que é fake);

  2) O conjunto before e after está a um nível antes do teste específico, ficando no escopo principal ( Rota /api/users ), isso porque podemos definir a aplicação e restauração do stub somente uma vez, e então utiliza-lo em mais de um teste.

Dessa forma, se rodarmos o comando npm test , conseguiremos concluir nosso primeiro teste de integração!

## Escrevendo um teste de criação de usuários

Agora vamos escrever testes para a rota de criação de usuários.

Esse teste, será um teste combinado . Dado que temos um teste anterior que valida nossa rota de consulta de pessoas usuárias, podemos validar a criação de um novo registro, fazendo uma consulta GET dos mesmos, validando se a criação ocorre de fato.

  Isso não é uma regra. Você pode optar por fazer testes com um escopo menor, sem a necessidade de "validar" dados no banco. Porém, para efeitos didáticos, esse exemplo deve ampliar um pouco o leque de possibilidades.

Conforme definido, ao criar um usuário com sucesso o endpoint deverá responder:

  com o status http 201 - Created ;
  com um objeto JSON , contendo a propriedade message com o valor "Novo usuário criado com sucesso" .

E, opcionalmente, como uma validação adicional, podemos complementar que:

  antes da adição de um novo registro, a lista de pessoas usuárias possui uma quantidade X de registros;

  após a adição, a lista de pessoas usuárias possui uma quantidade X + 1 de registros;
  
  após a adição, o registro adicionado aparece corretamente na lista de pessoas usuárias.

Mais uma vez, podemos transformá-lo em teste convertendo-o para asserções/ afirmações:

  ./tests/createUsers.test.js

// const chai = require('chai');
// const sinon = require('sinon');
// const chaiHttp = require('chai-http');

// const server = require('../api/app');

// const { User } = require('../models');
// const { User: userMock }  = require('./mock/models')

// chai.use(chaiHttp);

// const { expect } = chai;

// describe('Rota /api/users', () => {
//     before(() => {
        sinon.stub(User, 'create')
            .callsFake(userMock.create);
//         sinon.stub(User, 'findAll')
//             .callsFake(userMock.findAll);
//     });

//     after(() => {
        User.create.restore();
//         User.findAll.restore();
//     })

//     describe('Consulta a lista de pessoas usuárias', () => {
//         let response;

//         before(async () => {
//             response = await chai
//                 .request(server)
//                 .get('/api/users');
//         });

//         it('Essa requisição deve retornar código de status 200', () => {
//             expect(response).to.have.status(200);
//         });

//         it('A requisição GET para a rota traz uma lista inicial contendo dois registros de pessoas usuárias', () => {
//             expect(response.body).to.have.length(2);
//         });
//     });

    describe('Insere um novo registro', () => {
        let createRequest = {};
        let firstUserList = [];
        let secondUserList = [];
        const newUser = {
            username: 'jane',
            password: 'senha123',
        };

        before(async () => {
            firstUserList = await chai
                .request(server)
                .get('/api/users')
                .then(({body}) => body);
            createRequest = await chai
                .request(server)
                .post('/api/users')
                .send(newUser);
            secondUserList = await chai
                .request(server)
                .get('/api/users')
                .then(({body}) => body);
        });

        it('firstUserList: A primeira requisição GET para a rota deve retornar 2 registros', () => {
            expect(firstUserList).to.have.length(2);
        });

        it('createRequest: A requisição POST para a rota retorna o código de status 201', () => {
            expect(createRequest).to.have.status(201);
        });

        it('createRequest: A requisição deve retornar um objeto no corpo da resposta', () => {
            expect(createRequest.body).to.be.a('object');
        });

        it('createRequest: O objeto possui a propriedade "message"', () => {
            expect(createRequest.body)
              .to.have.property('message');
        });

        it('createRequest: A propriedade "message" possui o texto "Novo usuário criado com sucesso"',
          () => {
            expect(createRequest.body.message)
              .to.be.equal('Novo usuário criado com sucesso');
          }
        );

        it('secondUserList: A segunda requisição GET para rota deve retornar, por tanto, 3 registros', () => {
            expect(secondUserList).to.have.length(3);
        });

        it('secondUserList: O registro criado deve corresponder ao enviado na requisição POST', () => {
            expect(secondUserList[2]).to.contain(newUser);
        })
    });
// });


Agora que temos nosso contrato expresso em código, precisamos validar se nossa aplicação está obedecendo aquilo que está definido nele.

Para isso, rode novamente o comando npm test ;

Dessa forma, conseguimos validar a comunicação da API com o modelo, tanto para consultar pessoas usuárias, como para criar novas!

