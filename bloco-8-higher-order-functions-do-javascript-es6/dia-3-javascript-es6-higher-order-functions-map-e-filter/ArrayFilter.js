// Array.filter
// O filter é bem parecido com o find . O que o filter traz de novo é que, em vez de retornar apenas um elemento do array, ele retornará outro array com todos os elementos que satisfaçam à condição verificada pela função. Assista a seguir o vídeo em que o Cairão explica como o método filter funciona.

// No exemplo abaixo, apenas substituiremos o find por filter .

/*Array.prototype.filter() https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

  O método filter() cria um novo array com todos os elementos que passaram no teste implementado pela função fornecida.


      function isBigEnough(value) {
      return value >= 10;
    }

    var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
    // filtrado é [12, 130, 44]

Sintaxe
  var newArray = arr.filter(callback[, thisArg])

Parâmetros
  callback
    Função é um predicado, para testar cada elemento do array. Retorna true para manter o elemento, false caso contrário, recebendo três argumentos:

  element
    O elemento que está sendo processado no array.

  index
    O índice do elemento atual que está sendo processado no array.
  
  array
    O array para qual filter foi chamada.
  
  thisArg Optional
    Opcional. Valor a ser usado como this durante a execução do callback.

Valor de retorno
  Um novo array com os elementos que passaram no teste.


*/

const numbers = [19, 21, 30, 3, 45, 22, 15];

const verifyEven = (number) => number % 2 === 0;

const isEven = numbers.filter(verifyEven);

console.log(isEven); // [ 30, 22 ]

// Outra forma de ser realizada sem a necessidade de criar uma nova função.
const isEven2 = numbers.filter((number) => number % 2 === 0);

console.log(isEven2); // [ 30, 22 ]

// Verifique que o retorno foi um array com os dois números pares do array numbers .
// Olhe este outro exemplo de apenas pegar os elementos que não possuem alguma condição. Neste caso, deseja-se apenas as pessoas que não possuem ainda idade para dirigir:

const objPeople = [
  { name: "José", age: 21 },
  { name: "Lucas", age: 19 },
  { name: "Maria", age: 16 },
  { name: "Gilberto", age: 18 },
  { name: "Vitor", age: 15 },
];

const verifyAgeDrive = (arrayOfPeople) =>
  arrayOfPeople.filter((people) => people.age < 18);

console.log(verifyAgeDrive(objPeople));
// [ { name: 'Maria', age: 16 }, { name: 'Vitor', age: 15 } ]

// Outra forma de se usar o filter é retornar um array sem o elemento desejado. É preciso remover o Ricardo do objeto agora, já que ele não é mais um estudante.

const arrayMyStudents = ["Maria", "Manuela", "Jorge", "Ricardo", "Wilson"];

const removeStudentByName = (name, listStudents) =>
  listStudents.filter((student) => student !== name);
// Filtra todos os estudantes que não têm o nome 'Ricardo' e retorna um array com eles. Na prática, remove o Ricardo do array.

const newListStudents = removeStudentByName("Ricardo", arrayMyStudents);
console.log(newListStudents); // [ 'Maria', 'Manuela', 'Jorge', 'Wilson' ]

// Observe que o filter foi usado dentro de uma função que recebe dois parâmetros, o array de valores e uma string, o que será removido. A condição de dentro do filter é para retornar sempre que o elemento for diferente do name passado. Se tiver ficado confuso, rode esse código por conta própria e altere um pouco o seu funcionamento! Isso ajudará muito.
