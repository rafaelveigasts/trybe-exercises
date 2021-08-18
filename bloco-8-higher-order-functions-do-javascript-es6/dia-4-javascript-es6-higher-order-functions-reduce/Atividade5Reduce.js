const assert = require('assert');
const { DH_CHECK_P_NOT_PRIME } = require('constants');

const names = [
  'Aanemarie', 'Adervandes', 'Akifusa',
  'Abegildo', 'Adicellia', 'Aladonata',
  'Abeladerco', 'Adieidy', 'Alarucha',
];


// 5 - Dada o array de nomes, retorne a quantidade de vezes em que aparecem a letra a maiúscula ou minúscula.


function containsA() {
  return names.reduce((acc, cur) => {
  for (let i = 0; i < cur.length; i += 1) {
      const currName = cur.toUpperCase();
      currName[ind] === 'A' ? acc += 1 : acc;
    }
    return acc;
  }, 0);
  }

// console.log(names.map((nome) => nome.split('')))
// console.log('_________________________');
// console.log(containsA())
// console.log('_________________________');
assert.deepStrictEqual(containsA(), 20);