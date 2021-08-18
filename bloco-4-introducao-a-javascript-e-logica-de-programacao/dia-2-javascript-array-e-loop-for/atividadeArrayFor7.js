//Leia atentamente os enunciados e faça o que se pede! Iremos utilizar esse array para realizar os exercícios do 1 ao 7:

let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];
/*Descubra quantos valores ímpares existem no array e imprima o resultado. Caso não exista nenhum, imprima a mensagem: "nenhum valor ímpar encontrado";*/

//Utilizando for , descubra qual o menor valor contido no array e imprima-o;

let menorNumero = numbers[0]; 

for (i=0; i<=numbers.length; i++){
  if (numbers[i]<menorNumero){
    menorNumero = numbers[i]
  }
  
}

console.log(menorNumero)