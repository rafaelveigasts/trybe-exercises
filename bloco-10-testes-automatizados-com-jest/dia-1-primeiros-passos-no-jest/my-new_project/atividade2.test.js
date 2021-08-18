/*

A função myRemove(arr, item) recebe um array arr e retorna uma cópia desse array sem o elemento item caso ele exista no array
Verifique se a chamada myRemove([1, 2, 3, 4], 3) retorna o array esperado
Verifique se a chamada myRemove([1, 2, 3, 4], 3) não retorna o array [1, 2, 3, 4]
Verifique se o array passado por parâmetro não sofreu alterações
Verifique se a chamada myRemove([1, 2, 3, 4], 5) retorna o array esperado
*/
function myRemove(arr, item) {
  let newArr = [];
  for (let index = 0; index < arr.length; index += 1) {
    if (item !== arr[index]) {
      newArr.push(arr[index]);
    }
  }
  return newArr;
}

describe('Revalida as funções do exercício 2 dos testes unitários', () => 
{
  test('myRemove é uma função/existe?', ()=> {
    expect(typeof myRemove).toBe('function')
  })

  test('A função myRemove(arr, item) recebe um array arr e retorna uma cópia desse array sem o elemento item caso ele exista no array', ()=>{
    expect(myRemove([1,2,3],3)).not.toEqual([1,2,3])
  })

  test('Verifique se a chamada myRemove([1, 2, 3, 4], 3) retorna o array esperado', () => {
    expect(myRemove([1,2,3,4],3)).toEqual([1,2,4])
  })

    test('Verifique se a chamada myRemove([1, 2, 3, 4], 3) não retorna o array [1, 2, 3, 4]', () => {
    expect(myRemove([1,2,3,4],3)).not.toEqual([1,2,3,4])
  })

  // test('Verifique se o array passado por parâmetro não sofreu alterações', () => {
  //   test(myRemove([1,2,3,4],5)).not.toEqual([1,2,3,4])
  // })

  test('Verifique se a chamada myRemove([1, 2, 3, 4], 5) retorna o array esperado', () =>{
    expect(myRemove([1,2,3,4],5)).toEqual([1,2,3,4])
  })
});