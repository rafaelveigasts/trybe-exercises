/*1- Para o primeiro exercício de hoje, faça um programa que, dado um valor n qualquer, seja n > 1 , imprima na tela um quadrado feito de asteriscos de lado de tamanho n . Por exemplo:
n=5
*****
*****
*****
*****
******/

let numero = 5;

for (let linha = 1; linha <= numero; linha++){
  let coluna = "";
  for (let i = 0; i< numero; i++){
    coluna += "*";
  }
  console.log(coluna)
}

//esse programa cria uma linha até o numero desejado e para cada linha ele preenche uma coluna de asteriscos com o número desejado.

