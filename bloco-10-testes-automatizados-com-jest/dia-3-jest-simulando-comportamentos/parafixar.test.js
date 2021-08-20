/*
Para fixar
Utilize as funções do arquivo 'math.js' para realizar os exercícios:

Faça o mock da funcão subtrair e teste sua chamada.

Faça o mock da função multiplicar e implemente como retorno padrão o valor '10'. Teste a chamada e o retorno.

Faça o mock da função somar e implemente uma função que recebe dois valores e retorna sua soma. Teste a chamada, o retorno e os parâmetros passados.

Faça o mock da função dividir e implemente um retorno padrão com o valor '15'. Implemente também os seguintes valores para a primeira e segunda chamadas: '2' e '5'. Teste a chamada, o retorno, os parâmetros e quantas vezes a função foi chamada.

Faça o mock da função subtrair de maneira que seja possível restaurar sua implementação original. Defina como retorno padrão o valor '20'. Teste o número de chamadas e o retorno. Restaure a implementação original da função e teste sua execução.
*/

const { test, expect } = require('@jest/globals');
const math = require('./math');
jest.mock("./math");

describe('Testa as funções de math', () =>{
  test('Faça o mock da funcão subtrair e teste sua chamada.', ()=>{
    math.subtrair.mockImplementation((a,b)=> a-b);
    math.subtrair(1,1);
    expect(math.subtrair(1,1)).toBe(0);
  })
  test('Faça o mock da função multiplicar e implemente como retorno padrão o valor 10. Teste a chamada e o retorno.', ()=>{
    math.multiplicar.mockImplementation((a,b) => a*b);
    math.multiplicar.mockReturnValue(10);
    math.multiplicar(2,5);
    expect(math.multiplicar(2,5)).toBe(10);
  })
  test('Faça o mock da função somar e implemente uma função que recebe dois valores e retorna sua soma. Teste a chamada, o retorno e os parâmetros passados.', ()=>{
    math.somar.mockImplementation((a,b)=> a+b);
    math.somar(1,1);
    expect(math.somar(1,1)).toBe(2);
  })
  test('Faça o mock da função dividir e implemente um retorno padrão com o valor 15. Implemente também os seguintes valores para a primeira e segunda chamadas: 2 e 5. Teste a chamada, o retorno, os parâmetros e quantas vezes a função foi chamada.', ()=>{
    math.dividir.mockImplementation((a,b) => a/b);
    math.dividir.mockReturnValue(15)
    math.dividir(45,3);
    expect(math.dividir).toHaveBeenCalled();
    expect(math.dividir).toHaveBeenCalledTimes(1)
    expect(math.dividir(45,3)).toBe(15);

  })
})
//https://jestjs.io/pt-BR/docs/mock-function-api#mockfnmockreturnvaluevalue mockFn.mockReturnValue(value)#
// Aceita um valor que será retornado sempre que a função de simulação é chamada.

