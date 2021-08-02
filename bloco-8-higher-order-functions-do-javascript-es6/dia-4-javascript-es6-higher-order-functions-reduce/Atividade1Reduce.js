/*
Agora a prática
Todos os exercícios devem ser realizados utilizando reduce , e se necessário outra HOF , a informação será citada no enunciado.
1 - Dada uma matriz, transforme em um array.
*/

const assert = require('assert');

const arrays = [
  ['1', '2', '3'],
  [true],
  [4, 5, 6],
];

function flatten() 
{
  return Object.values(arrays)
  .reduce((acc,curr)=> {return acc.concat(curr)}) 
}

console.log(flatten());
assert.deepStrictEqual(flatten(), ['1', '2', '3', true, 4, 5, 6]);