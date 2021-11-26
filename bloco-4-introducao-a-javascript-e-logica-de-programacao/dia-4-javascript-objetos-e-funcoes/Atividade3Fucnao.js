//Crie uma função que receba um array de inteiros e retorne o índice do menor valor.
let a = [2, 4, 6, 7, 10, 0, -3];

let maiorNum = 0;

function returnMinValue() {

  for (let index in a) {
    if (a[maiorNum] > a[index]) {
      maiorNum = index
    }
  }
  return maiorNum
}
console.log(returnMinValue(a))
