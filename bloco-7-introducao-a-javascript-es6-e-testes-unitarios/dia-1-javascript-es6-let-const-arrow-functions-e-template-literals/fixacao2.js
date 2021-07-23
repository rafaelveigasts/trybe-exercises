// Copie o código abaixo e faça uma função que retorne o array oddsAndEvens em ordem crescente.
// Utilize template literals para que a chamada console.log(<seu código>oddsAndEvens<seu código>); retorne "Os números 2,3,4,7,10,13 se encontram ordenados de forma crescente!".
// Bônus (opcional): tente fazer o mesmo exercício utilizando o método array.sort() . Spoiler: É possível realizar uma função que ordene qualquer array de números.
// Copie o código abaixo.

const oddsAndEvens = [13, 3, 4, 10, 7, 2];


// oddsAndEvens.sort();
oddsAndEvens[0] = 2;
oddsAndEvens[1] = 3;
oddsAndEvens[2] = 4;
oddsAndEvens[3] = 7;
oddsAndEvens[4] = 10;
oddsAndEvens[5] = 13;

console.log(` Os números ${oddsAndEvens} se encontram ordenados de forma crescente!`); // será necessário alterar essa linha 😉