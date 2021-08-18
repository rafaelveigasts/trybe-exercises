//Leia atentamente os enunciados e faça o que se pede! Iremos utilizar esse array para realizar os exercícios do 1 ao 7:
let numbers = [5, 9, 3, 19, 70, 8, 100, 2, 35, 27];

//Nesse primeiro exercício, percorra o array imprimindo todos os valores nele contidos com a função console.log() ;

//for(i=0; i<numbers.length; i++){console.log(numbers[i])}

//Para o segundo exercício, some todos os valores contidos no array e imprima o resultado;

let soma = 0; //se a variavel estiver dentro do for ela é zerada

for ( let i=0; i < numbers.length; i++){
  soma +=  numbers[i]
}
console.log(soma)

