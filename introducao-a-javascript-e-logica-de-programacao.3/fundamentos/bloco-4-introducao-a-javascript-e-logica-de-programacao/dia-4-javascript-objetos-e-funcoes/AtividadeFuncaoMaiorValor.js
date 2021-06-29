//Crie uma função que receba um array de inteiros e retorne o índice do maior valor.
let a = [2, 3, 6, 7, 10, 1];

// function returnMaxValue (a){
//   return Math.max(a)
// }

// returnMaxValue(a)

let maiorNum = 0;

function returnMaxValue() {

  for (let index in a) {
    if (a[maiorNum] < a[index]) {
      maiorNum = index
    }
  }
  return maiorNum
}
console.log(returnMaxValue(a))
