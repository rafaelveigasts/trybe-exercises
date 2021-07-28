// Praticando TDD - Parte 2
// Nessa parte os exercícios estão divididos em dois grupos: primeiro, você vai escrever código baseado nos testes. Depois você lerá um código e o que ele tem que trazer de resposta. A partir disso, você escreverá testes e os usará de base para alterar o código. Como assim? Bem, vamos passo a passo!
// Escrevendo código para testes
// Dados os casos de testes abaixo, escreva as funções de forma a passar nos testes. É importante nunca alterar os testes ou as variáveis já escritas no código :
// Copie os testes já implementados e desenvolva as funções. Separe as funções em arquivos para evitar qualquer tipo de problema.
// Escreva a função addOne para passar nos testes já implementados.
const assert = require('assert');

const addOne = (array) => {
  const output = [];
  for (let index = 0; index < array.length; index += 1) {
    output.push(array[index] + 1);
  }
  return output;
};
const myArray = [31, 57, 12, 5];
const unchanged = [31, 57, 12, 5];
const expected = [32, 58, 13, 6];
const output = addOne(myArray);

assert.strictEqual(typeof addOne, 'function');
assert.deepStrictEqual(output, expected);
assert.deepStrictEqual(myArray, unchanged);