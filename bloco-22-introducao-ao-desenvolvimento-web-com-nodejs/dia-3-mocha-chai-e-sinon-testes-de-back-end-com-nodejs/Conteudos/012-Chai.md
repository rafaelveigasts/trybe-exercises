## Chai
Em seguida vamos adicionar as asserções com o chai:
io-test/test.js

const { expect } = require('chai');

const leArquivo = require('./leArquivo');

const CONTEUDO_DO_ARQUIVO = 'VQV com TDD';

describe('leArquivo', () => {
  describe('Quando o arquivo existe', () => {
    describe('a resposta', () => {
      const resposta = leArquivo('arquivo.txt');

      it('é uma string', () => {
        expect(resposta).to.be.a('string');
      });

      it('é igual ao conteúdo do arquivo', () => {
        expect(resposta).to.be.equals(CONTEUDO_DO_ARQUIVO);
      });
    });
  });

  describe('Quando o arquivo não existe', () => {
    it('a resposta é igual a "null"', () => {
      const resposta = leArquivo('arquivo_que_nao_existe.txt');

      expect(resposta).to.be.equal(null);
    });
  });
});

Aqui utilizamos uma nova asserção do chai , o a , que validará o "tipo" daquele retorno. Como se tivéssemos escrito: "espera a resposta ser uma string" (ou expect response to be a string ).

Para que o teste seja executado, precisamos criar o arquivo que irá conter a função. Vamos começar com uma função vazia apenas para conseguir importá-la no arquivo de teste:
io-test/leArquivo.js

module.exports = () => {
    //
}

Agora vamos rodar o teste e ver o resultado:

npm test # ou npm run test

<img src="io-test-i.png" />
