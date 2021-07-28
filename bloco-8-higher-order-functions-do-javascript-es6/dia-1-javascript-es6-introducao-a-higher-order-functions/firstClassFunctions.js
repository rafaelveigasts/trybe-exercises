/*First-Class Functions
Uma linguaguem é dita ter First-Class Functions quando trata suas funções como first class citizens (isto é, cidadãos de primeira classe), ou seja, elas suportam as mesmas operações que estão disponíveis para os outros tipos. Isso significa que nossas funções podem ser atribuídas à variáveis, passadas como argumento e/ou retornadas por outras funções. JavaScript é uma linguagem que utiliza esse conceito, portanto podemos:
Atribuir funções à variáveis:
*/
function sum (number1, number2) {
  return number1 + number2;
}

const sumVariable = sum;

console.log(sumVariable);
//  [Function: sum]

/*No exemplo acima, vemos a declaração da função sum acontecendo e a atribuição da mesma função dentro de uma variável chamada sumVariable . Esse exemplo pode soar estranho. Você deve estar se perguntando: "criei uma função pra colocar ela dentro de uma variável... por que fazer isso?". Caso você tenha tido esse questionamento, não sinta-se perdido. O real motivo foi para exemplificar que podemos fazer.
Mas achou que iriamos te deixar sem exemplo concreto? Achou errado! Aliás, vocês já fazem isso há algum tempo...*/

const sum = (number1, number2) => {
  return number1 + number2;
};

/*Quando utilizamos arrow functions , estamos justamente utilizando da capacidade do javascript de conseguir armazenar a função dentro de uma variável. Isso é algo maravilhoso .

Passar funções como argumento para outras funções:*/

const sayHello = () => {
  return ('hello trybers');
}

const printGreeting = (callback) => {
    console.log(callback());
}

printGreeting(sayHello);

// Retornar uma função de outra função:

const sumFixAmount = (amount) => {
  return (number) => amount + number;
}

const initialSum = sumFixAmount(15)
console.log(initialSum(5));
