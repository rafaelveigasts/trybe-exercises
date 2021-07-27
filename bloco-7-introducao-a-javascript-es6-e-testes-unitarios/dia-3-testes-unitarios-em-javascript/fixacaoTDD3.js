// Escreva a função sumAllNumbers para passar nos testes já implementados.

const assert = require('assert');

const sumAllNumbers = (array) => {
  let output = 0;
  for ( let i =0; i < array.length; i ++){
    output += array[i];
  }
  return output
};


const numbers = [9, 23, 10, 3, 8];
const expected = 53;
const output = sumAllNumbers(numbers);

assert.strictEqual(typeof sumAllNumbers, 'function');
assert.strictEqual(output, expected);