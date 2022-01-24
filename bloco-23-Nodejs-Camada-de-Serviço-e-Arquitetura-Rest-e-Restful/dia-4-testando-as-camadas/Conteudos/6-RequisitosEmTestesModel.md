## Requisitos em testes (Model)

Vamos relembrar nosso primeiro requisito:

1) A API deverá permitir a inserção de filmes no banco de dados :

  Ela deve receber e registrar as seguintes informações do filme: Nome , Direção e Ano de lançamento ;

  Ao realizar a inserção de um novo filme, o endpoint deverá responder com o respectivo ID ;

Como estamos falando a princípio de um banco de dados com essas informações. Podemos descrever o requisito pensando primeiramente o Model com as seguintes asserções/ afirmações:

1) Insere um novo filme no DB
  quando é inserido com sucesso
    retorna um array
    o array está vazio
  quando existir filmes criados
    retorna um array
    o array não está vazio
    o array possui itens do tipo objeto
    tais itens possuem as propriedades: "id", "title", "releaseYear" e "directedBy"

Agora vamos reescrever essas mesmas asserções na estrutura de testes:
tests/models/movieModel.test.js

const { expect } = require('chai');

/*
  Como ainda não temos a implementação, vamos fixar
  um objeto simulando os métodos que iremos desenvolver,
  porém, eles não terão nenhum comportamento
*/
const MoviesModel = {
  create: () => {}
};

describe('Insere um novo filme no BD', () => {
  const payloadMovie = {
    title: 'Example Movie',
    directedBy: 'Jane Dow',
    releaseYear: 1999,
  }

  describe('quando é inserido com sucesso', () => {

    it('retorna um objeto', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.be.a('object')
    });

    it('tal objeto possui o "id" do novo filme inserido', async () => {
      const response = await MoviesModel.create(payloadMovie);

      expect(response).to.have.a.property('id')
    });

  });
});

