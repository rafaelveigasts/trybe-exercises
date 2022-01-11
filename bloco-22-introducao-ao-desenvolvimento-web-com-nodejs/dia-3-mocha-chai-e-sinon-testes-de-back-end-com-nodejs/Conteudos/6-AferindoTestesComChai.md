## Aferindo testes com o Chai

O chai nos ajudará com as asserções, ou seja, ele nos fornece maneiras de dizermos o que queremos testar e então ele validará se o resultado condiz com o esperado.

Até aqui não estamos testando nada de fato, apenas descrevemos o teste. Para de fato testar nossa função precisamos chamá-la passando o input desejado e então validar se a resposta é aquela que esperamos.

Sem as ferramentas de testes fizemos essa verificação utilizando alguns ifs , o que é bem trabalhoso:

const respostaCenario1 = calculaSituacao(4);
if (respostaCenario1 === 'reprovado') {
  console.log(`Ok 🚀`);
} else {
  console.error('Resposta não esperada 🚨');
}

Essa validação é o que chamamos de assertion , "asserção" ou, em alguns casos, "afirmação" . Para nos ajudar com essa tarefa temos o chai , que nos fornece diversos tipos de validações diferentes.

Usaremos a interface expect do chai em nossos exemplos, que significa de fato o que é esperado para determinada variável:

const resposta = calculaSituacao(4);

expect(resposta).equals('reprovado');

No código acima, estamos chamando nossa função e, logo em seguida, afirmamos que seu retorno, armazenado na constante resposta , deve ser igual a ( equals ) 4 .

Muito mais legível e simples!

Vamos ver como fica nosso cenário de teste inteiro com mocha + chai :
tests/calculaSituacao.js


const { expect } = require('chai');

const calculaSituacao = require('../examples/calculaSituacao');

describe('Quando a média for menor que 7', () => {
  it('retorna "reprovado"', () => {
    const resposta = calculaSituacao(4);

    expect(resposta).equals('reprovado');
  });
});

Pronto, nosso primeiro cenário de teste está escrito. Perceba como o chai nos fornece uma função pronta, equals que irá comparar se o valor "esperado" na resposta é igual ao passado para ele, ou seja, igual a "reprovado".

A asserção equals é uma das diversas asserções disponíveis no chai. A documentação completa pode ser encontrada na documentação oficial do chai .

https://www.chaijs.com/api/bdd/

Para tornar nosso teste ainda mais legível e elegante, o chai nos fornece outros getters encadeáveis que possuem um papel puramente estético. Por exemplo o to e o be , que nos permite escrever nossa assertion da seguinte maneira:
tests/calculaSituacao.js

const { expect } = require('chai');

const calculaSituacao = require('../examples/calculaSituacao');

describe('Quando a média for menor que 7', () => {
  it('retorna "reprovado"', () => {
    const resposta = calculaSituacao(4);

    expect(resposta).to.be.equals('reprovado');
  });
});

Perceba que o to e o be não alteraram em nada a validação realizada, porém, a leitura fica muito mais fluída e natural, é como se estivéssemos dito que nosso teste "espera a resposta ser igual a "reprovado".
Podemos encontrar um pouco mais sobre esse getters na documentação oficial do chai , em language chains .

https://www.chaijs.com/api/bdd/#method_language-chains