/* Escrevendo testes
Escrever testes em Jest é muito simples, como você deve ter percebido enquanto lia o artigo anterior. Tudo que é necessário é utilizar a função test . A função it é um alias para test , ou seja, ambas se referem à mesma função e você pode usar qualquer uma delas. Essas funções, por serem globais, ficam automaticamente disponíveis nos seus arquivos uma vez que o Jest é instalado.
A função test espera três argumentos. O primeiro argumento é o nome do teste. Esse nome identifica o teste e é também o texto que aparecerá quando os testes forem executados. O segundo argumento é uma função contendo suas expectations . Em outras palavras, é dentro dessa função que você fará os testes propriamente ditos. O terceiro argumento (opcional) é um timeout , indicando quanto tempo o Jest deve esperar que o teste execute antes de abortá-lo.
Para entender melhor, veja o código abaixo:
 */
// sum.js
const sum = (a, b) => a + b;

test('sums two values', () => {
  expect(sum(2, 3)).toEqual(5);
});

/* Neste exemplo, tanto a implementação quanto os testes da função estão no mesmo arquivo. Na prática, porém, eles ficarão separados. Jest procura por arquivos com as extensões .js , .jsx , .ts e .tsx dentro de uma pasta com o nome __tests__ , ou arquivos com o sufixo .test ou .spec . É comum que o arquivo de teste tenha o mesmo nome e fique na mesma pasta do arquivo que está sendo testado, acrescido da sufixo .test.js : */

// sum.js
const sum = (a, b) => a + b;

module.exports = sum;

// sum.test.js
const sum = require('./sum');

test('sums two values', () => {
  expect(sum(2, 3)).toBe(5);
});

/* A linha module.exports = sum exporta a função sum no primeiro arquivo para que possa ser utilizada em outros módulos. No segundo arquivo, utilizamos require('./sum') para importar a função sum . Veja a seção de recursos adicionais para entender mais sobre como importar e exportar módulos em Node.js .
Agora que você já viu um teste simples de jest em funcionamento, que tal praticar com mais este pŕoximo exemplo? Não se preocupe em entender como os testes estão estruturados neste exemplo. O objetivo aqui é apenas mostrar o quanto trabalhar com a biblioteca Jest é mais simples.
Crie um arquivo com o nome 'loginValidation.js' e dentro dele copie e cole o seguinte código: */

// loginValidation.js
const greetingMessage = (user) => {
  return `Hello, ${user}! Que bom ter você de volta`;
};

const loginErrorMessage = (user) => {
  return `Pessoa usuária '${user}' não encontrada, tente novamente!`;
};

const user = {
  userName: "Joana",
  password: 123456,
};

const verifyCredentials = ({ userName, password }) => {
  if (password === 123456 && userName === "Joana") {
    return greetingMessage(userName);
  } else {
    return loginErrorMessage(userName);
  }
};

const { userName, password } = user;

module.exports = { greetingMessage, loginErrorMessage, verifyCredentials }

/* 
Vamos primeiro entender as funções que estão implementadas no arquivo loginValidation.js. Neste arquivo encontram-se três funções para simular uma situação de login. A função verifyCredentials faz uma validação simples se a pessoa usuária e a senha recebidas como argumento são estritamente iguais as chaves userName e password contidas no objeto user . Se essa verificação retornar true a função loginValidation vai chamar a função greetingMessage , que por sua vez vai retornar uma frase de boas vindas com o nome da pessoa usuária. Já no caso da função loginValidation retornar false , ou seja as credenciais inseridas não corresponderem com as existentes no objeto, ela vai chamar a função loginErrorMessage que irá por sua vez retornar um erro.
Agora, crie outro arquivo no mesmo diretório com o nome 'loginValidation.test.js' e dentro dele copie e cole o código abaixo: */

// loginValidation.test.js
const {
  greetingMessage,
  loginErrorMessage,
  verifyCredentials,
} = require("./loginValidation.js");

describe("a função verifyCredentials()", () => {
  
  it("verifyCredentials() calls the correct function depending on the user and password input", () => {
    
    const user = {
      userName: 'Bob',
      password: 123456,
    };
      
    const { userName, password } = user;

    expect(verifyCredentials({ userName, password })).toBe(
      "Hello, Joana! Que bom ter você de volta"
    ); 
  });

  it("greetingMessage() returns a message in the format: `Hello, ${user}! Que bom ter você de volta`", () => {
    expect(greetingMessage("Lucas")).toBe(
      "Hello, Lucas! Que bom ter você de volta"
    );
  });

  it("loginErrorMessage() returns a message in the format: `Pessoa usuária '${user}' não encontrada, tente novamente!`", () => {
    expect(loginErrorMessage("Bob")).toBe(
      "Pessoa usuária 'Bob' não encontrada, tente novamente!"
    );
  });  
});
/* 
Execute no seu terminal o comando npm test e veja o que acontece. Não se preocupe se você não entender a estrutura dos testes e os métodos que são utilizados. Tudo isso será abordado com mais detalhes nos próximos dias desse bloco.
Ao rodar o teste você receberá a mensagem que um dos testes falhou, como na imagem abaixo: 

test suites: 1 failed, 1 total
tests: 1 failed, 2 passed, 3 total
snapshots: 0 total
time 2.381 s

ran all test suites


Observe que, como dito anteriormente, mesmo existindo um teste com erro, os outros testes foram executados normalmente. Além disso, o log do erro gerado pelo jest te possibilita identificar rapidamente onde foi que ocorreu o erro, uma vez que é exibida a mensagem que está contida no teste em questão. Neste caso o erro ocorreu no teste contendo a descrição " verifyCredentials() calls the correct function depending on the user and password input", como você pode ver aqui:


Outro ponto positivo da utilização do Jest para fazer nossos testes é que ele traz uma mensagem contendo um diff, ou seja, o que era esperado de ocorrer no teste e o que de fato aconteceu. Isso nos ajuda a entender mais rapidamente onde está o erro. Neste exemplo o teste esperava receber como valor um objeto contendo uma pessoa usuária com o nome "Joana", mas ao invés disso recebeu "Bob".
Sensacional, não é mesmo? Então bora pro conteúdo que na sequência vamos explicar o que são os expect e os matchers e como eles funcionam.

*/