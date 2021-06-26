/*4- Depois, faça uma pirâmide com n asteriscos de base:
n = 5

  *
 ***
******/

// let n = 10;

// for (let index = (n - 1); index >= 0; index -= 2) {
//   linha = '';
//   for (let i = 1; i <= index; i += 2) {
//     linha += ' ';
//   }
//   for (let i = index; i < n; i += 1) {
//     linha += '*';
//   }
//   console.log(linha);
// }

let n = 5;
let symbol = '*';
let inputLine = '';

let midOfMatrix = (n + 1) / 2;
let controlLeft = midOfMatrix;
let controlRight = midOfMatrix;

for (let lineIndex = 0; lineIndex <= midOfMatrix; lineIndex += 1) {
  for (let columnIndex = 0; columnIndex <= n; columnIndex += 1) {
    if (columnIndex > controlLeft && columnIndex < controlRight) {
      inputLine = inputLine + symbol;
    } else {
      inputLine = inputLine + ' ';
    }
  }
  console.log(inputLine);
  inputLine = '';
  controlRight += 1;
  controlLeft -= 1
};