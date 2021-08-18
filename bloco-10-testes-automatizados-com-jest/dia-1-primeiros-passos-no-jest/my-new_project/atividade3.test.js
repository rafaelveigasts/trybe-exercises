/* 
A função myRemoveWithoutCopy(arr, item) recebe um array arr e retorna o próprio array sem o elemento item caso ele exista no array

Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 3) retorna o array esperado

Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 3) não retorna o array [1, 2, 3, 4]

Faça uma chamada para a função myRemoveWithoutCopy e verifique se o array passado por parâmetro sofreu alterações

Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 5) retorna o array esperado 
*/

function myRemoveWithoutCopy(arr, item) {
  for (let index = 0, len = arr.length; index < len; index += 1) {
    if (arr[index] === item) {
      arr.splice(index, 1);
      index -= 1;
      len -= 1;
    }
  }

  return arr;
}

describe('Revalida as funções do exercício 3 dos testes unitários', ()=>
{
  test('myRemoveWithoutCopy é uma função/Existe', ()=>{
    expect(typeof myRemoveWithoutCopy).toBe('function')
  })
  test('Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 3) retorna o array esperado', () => {
    expect(myRemoveWithoutCopy([1,2,3,4],3)).toEqual([1,2,4])
  })
  test('Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 3) não retorna o array [1, 2, 3, 4]', () =>{
    expect(myRemoveWithoutCopy([1,2,3,4],3)).not.toEqual([1,2,3,4])
  })
  test('Faça uma chamada para a função myRemoveWithoutCopy e verifique se o array passado por parâmetro sofreu alterações', () => {
    expect(myRemoveWithoutCopy([1,2,3,4])).toEqual([1,2,3,4])
  })
  test('Verifique se a chamada myRemoveWithoutCopy([1, 2, 3, 4], 5) retorna o array esperado', () => {
    expect(myRemoveWithoutCopy([1,2,3,4], 5)).toEqual([1,2,3,4])
  })
})