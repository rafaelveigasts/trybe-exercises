const assert = require('assert');

const names = [
  'Aanemarie', 'Adervandes', 'Akifusa',
  'Abegildo', 'Adicellia', 'Aladonata',
  'Abeladerco', 'Adieidy', 'Alarucha',
];


// 5 - Dada o array de nomes, retorne a quantidade de vezes em que aparecem a letra a maiúscula ou minúscula.


function containsA() 
{
  return names
  .reduce((acc, curV) => acc + curV).split('').filter((value) => value.toLowerCase() === 'a').length;


  return contador
}


// console.log(names.map((nome) => nome.split('')))
// console.log('_________________________');
// console.log(containsA())
// console.log('_________________________');
assert.deepStrictEqual(containsA(), 20);