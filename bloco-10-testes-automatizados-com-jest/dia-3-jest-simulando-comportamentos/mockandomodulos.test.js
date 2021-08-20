/*
Mockando Módulos

Diferente do jest.fn() , que simula apenas uma função por vez, temos o jest.mock() , que tem como principal diferencial mockar todo um pacote de dependências ou módulo de uma vez.
Por exemplo: em um arquivo chamado math.js , temos as seguintes funções:

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const somar = async (a, b) => { await sleep(10_000); return a + b }; // Função de somar mais lenta do mundo
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;

module.exports = { somar, subtrair, multiplicar, dividir };

Utilizando o jest.fn() , teríamos que mockar todas as funções uma a uma. Com o jest.mock() , podemos mockar todas com um só comando:
jest.mock('./math');

Uma vez que mockarmos todo o arquivo math.js e, portanto, passemos a simular o comportamento de todas as suas funções, caso passemos os parâmetros 1 e 2 para a função somar , por exemplo, o retorno será "undefined". Isso se dá porque a simulação deixou de acessar o comportamento da função original do math.js . Apesar de podermos definir um retorno com mockReturnValue , há casos em que é útil ir além dessa capacidade de retornar valores e criar um novo comportamento para a função simulada. 

É o que o método mockImplementation(func) faz. Ele aceita uma função que deve ser usada como implementação.
Veja um exemplo:
*/
const math = require('./math');
jest.mock("./math");

test("#somar", () => {
  // Aqui testamos se função foi chamada, quantas vezes foi chamada, quais parâmetros foram usados e qual seu retorno

  math.somar.mockImplementation((a, b) => a + b);
  math.somar(1, 2);

  expect(math.somar).toHaveBeenCalled();
  expect(math.somar).toHaveBeenCalledTimes(1);
  expect(math.somar).toHaveBeenCalledWith(1, 2); //https://jestjs.io/pt-BR/docs/expect#tohavebeencalled
  expect(math.somar(1, 2)).toBe(3);
});

// No exemplo acima, utilizamos também o método toHaveBeenCalledWith(...args) , que valida quais parâmetros foram passados para a função.
// Assim como o mockReturnValueOnce , podemos também implementar uma funcionalidade para apenas uma chamada com mockImplementationOnce .
