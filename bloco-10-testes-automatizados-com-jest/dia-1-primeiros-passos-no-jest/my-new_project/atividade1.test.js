/*
Parte I
Refaça os exercícios 1 a 5 do conteúdo de Testes unitários em JavaScript , dessa vez utilizando Jest .

Praticando a implementação de testes - Parte 1
Você vai implementar vários testes em contextos diferentes a fim de consolidar a mecânica e também a forma de pensar em testes.
Copie as funções já implementadas e desenvolva os testes. Separe as funções em arquivos para evitar qualquer tipo de problema.
A função sum(a, b) retorna a soma do parâmetro a com o b
Teste se o retorno de sum(4, 5) é 9
Teste se o retorno de sum(0, 0) é 0
Teste se a função sum lança um erro quando os parâmetros são 4 e "5" (string 5)
Teste se a mensagem de erro é "parameters must be numbers" quando realizar a chamada sum(4, "5")
*/

function sum(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('parameters must be numbers');
  }

  return a + b;
}

describe('Revalida as funções do conteúdo Testes Unitários', () => 
{ 
  test('Sum é função?', ()=>{
    expect(typeof sum).toBe('function')
  })
  test('A função sum(a, b) retorna a soma do parâmetro a com o b', ()=>{
    expect(sum(1,1)).toBe(2)
  })
  test('Teste se o retorno de sum(4, 5) é 9', ()=>{
    expect(sum(4,5)).toBe(9)
  })
  test('Teste se o retorno de sum(0, 0) é 0', ()=> {
    expect(sum(0,0)).toBe(0)
  })
  test('Teste se a função sum lança um erro quando os parâmetros são 4 e "5" (string 5)', () => {
    expect(()=> {sum()}).toThrow() // testa se o erro é lançado
    // expect(() => { multiplyByTwo() }).toThrow(); 
  })
  test('Teste se a mensagem de erro é "parameters must be numbers" quando realizar a chamada sum(4, "5")', () => {
    expect (()=> {sum()}).toThrowError(new Error('parameters must be numbers')); // testa se a mensagem do erro.
    // expect(() => { multiplyByTwo() }).toThrowError(new Error('number é indefinido'));
  })
});

