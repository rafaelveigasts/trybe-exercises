// Compare dois objetos para verificar se são idênticos ou não

const assert = require('assert');

const obj1 = {
  title: 'My Title',
  description: 'My Description',
};

const obj2 = {
  description: 'My Description',
  title: 'My Title',
};

const obj3 = {
  title: 'My Different Title',
  description: 'My Description',
};

// implemente seus testes aqui

assert.deepStrictEqual(obj1, obj2); // compara 1 com o 2 
assert.notDeepStrictEqual(obj1, obj3); // ve diferença entre 1 e 3
assert.notDeepStrictEqual(obj2, obj3); // ve diferença entre 2 e 3
