/*
Trabalhando com mock e funções originais

Você já aprendeu que ter controle sobre uma função e usar matchers como o toHaveBeenCalled são ferramentas essenciais para quem desenvolve. Mas há casos em que é útil verificar os efeitos colaterais de uma função, como em uma alteração de página. Como fazer isso se, ao se mockar uma função, ela perde sua implementação original, mas, sem mockar , não podemos testá-la com o matcher?

O jest.spyOn() é capaz de resolver esse problema. Ele "espia" a chamada da função simulada, enquanto deixa a implementação original ativa.

*/
// const math = require('./math');

// test("#somar", () => {
//   // testando se a função foi chamada, quantas vezes foi chamada, quais parâmetros foram usados e qual seu retorno
//   const mockSomar = jest.spyOn(math, "somar");

//   mockSomar(1, 2);
//   expect(mockSomar).toHaveBeenCalled();
//   expect(mockSomar).toHaveBeenCalledTimes(1);
//   expect(mockSomar).toHaveBeenCalledWith(1, 2);
//   expect(mockSomar(1, 2)).resolves.toBe(3);
// });

/*
Podemos notar no exemplo que a simulação da função é criada, mas sua implementação é mantida, e a soma realizada.

Há também como limpar, resetar ou restaurar mocks . Existem três métodos capazes de fazer isso:

mock.mockClear()
  Útil quando você deseja limpar os dados de uso de uma simulação entre dois expect s;
  
mock.mockReset()
  Faz o que o mockClear() faz;
  Remove qualquer retorno estipulado ou implementação;
  Útil quando você deseja resetar uma simulação para seu estado inicial;

mock.mockRestore()
  Faz tudo que mockReset() faz;
  Restaura a implementação original;
  Útil para quando você quer simular funções em certos casos de teste e restaurar a implementação original em outros;

Como exemplo, imagine que você queira testar a função mockada somar implementando para ela um método de subtração, mas que depois você queira redefinir as implementações do mock .
*/
// const math = require('./math');

// test("#somar", () => {
//   // testando a implementação original, o mock e o mock resetado

//   // implementação original
//   expect(math.somar(1, 2)).resolves.toBe(3);

//   // criando o mock e substituindo a implementação para uma subtração
//   math.somar = jest.fn().mockImplementation((a, b) => a - b);

//   math.somar(5, 1);
//   expect(math.somar).toHaveBeenCalledTimes(1);
//   expect(math.somar(5, 1)).toBe(4);
//   expect(math.somar).toHaveBeenCalledTimes(2);
//   expect(math.somar).toHaveBeenLastCalledWith(5, 1);

//   // resetando o mock
//   math.somar.mockReset();
//   expect(math.somar(1, 2)).toBe(undefined);
//   expect(math.somar).toHaveBeenCalledTimes(1);
//   expect(math.somar).toHaveBeenLastCalledWith(1, 2);
// });

// No exemplo acima, por termos usado o jest.fn(), não há como restaurar as implementações originais da função, pois suas funcionalidades não permitem. A única ferramenta que nos permite transitar entre simulação e comportamento original é o jest.spyOn() .

const math = require('./math');

test("#somar", () => {
  // testando a implementação original, o mock e a restauração da função original

  // implementação original
  expect(math.somar(1, 2)).resolves.toBe(3);

  // criando o mock e substituindo a implementação para uma subtração
  const mockSomar = jest
    .spyOn(math, "somar")
    .mockImplementation((a, b) => a - b);

  math.somar(5, 1);
  expect(mockSomar).toHaveBeenCalledTimes(1);
  expect(mockSomar(5, 1)).toBe(4);
  expect(mockSomar).toHaveBeenCalledTimes(2);
  expect(mockSomar).toHaveBeenLastCalledWith(5, 1);

  // restaurando a implementação original
  math.somar.mockRestore();
  expect(math.somar(1, 2)).resolves.toBe(3);
});