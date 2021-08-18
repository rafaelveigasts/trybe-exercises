// Compare dois objetos para verificar se são idênticos ou não
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

describe('Revalida as funções do exercício 5 dos testes unitários', ()=>
{
  test('Compare os objetos 1 e 2 para verificar se são idênticos ou não', ()=>{
    expect(obj1).toEqual(obj2)
  })
  test('Compare os objetos 2 e 3 para verificar se são idênticos ou não', ()=>{
    expect(obj2).not.toEqual(obj3)
  })
  test('Compare os objetos 1 e 3 para verificar se são idênticos ou não', ()=>{
    expect(obj1).not.toEqual(obj3)
  })
})