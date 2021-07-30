/*Array.some e Array.every
As funções some e every são parecidas. A primeira retorna true se ao menos um elemento de um array satisfaz a uma condição. A segunda retorna true se todos os elementos de um array satisfazem a uma condição. O MDN contém explicações mais detalhadas sobre essas funções, além de exemplos. Clique https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/every e https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/some para ler sobre essas funções. Leia até a seção Exemplos .

Array.prototype.some()
  O método some() testa se ao menos um dos elementos no array passa no teste implementado pela função atribuída e retorna um valor true ou false.

Sintaxe
arr.some(callback[, thisArg])

Parâmetros: 
callback
  Função para testar cada elemento, recebendo três argumentos:
    currentValue
    O valor atual do elemento sendo processado no array.

    index
    O índice do elemento atual sendo processado no array.
    array

    O array onde o método some() foi chamado.
  thisArg

  Opcional. Valor para usar como  this durante a execução do callback.
  
  Valor de retorno
    Esta função reto rna true se a função callback retornar true para qualquer elemento do array; caso contrário, false.


Array.prototype.every()
  O método every() testa se todos os elementos do array passam pelo teste implementado pela função fornecida.

Parâmetros

  callback
    Função que testa cada elemento, recebe três parametros:
      currentValue (obrigatório)
      O elemento atual sendo processado na array. 

      index (opcional)
      O índice do elemento atual sendo processado na array.

      array (opcional)
      O array de origem.

  thisArg
    Opcional. Valor a ser usado como this quando o callback é executado.

  Valor de retorno
    true se a função de callback retorna um valor truthy para cada um dos elementos do array; caso contrário, false.

Para visualizar melhor o retorno dos métodos some e every , brinque com esses dois exemplos no CodePen nos links abaixo. Você pode alterar os números do array numbers para verificar o que a função está retornando para cada caso.
Array.some : https://codepen.io/pen/?template=abZoOZz
Array.every : https://codepen.io/pen/?template=NWrKqME
O exemplo abaixo usa o some para verificar se possui algum nome que começa com a letra desejada: 

O exemplo abaixo usa o some para verificar se possui algum nome que começa com a letra desejada:  */

const listNames = ['Maria', 'Manuela', 'Jorge', 'Ricardo', 'Wilson'];

const verifyFirstLetter = (letter, names) => names.some((name) => name[0] === letter);

console.log(verifyFirstLetter('J', listNames)); // true
console.log(verifyFirstLetter('x', listNames)); // false

// O exemplo abaixo usará o every para verificar se o estudante passou em todas as matérias:

const grades = {
  portugues: 'Aprovado',
  matematica: 'Reprovado',
  ingles: 'Aprovado',
};

const verifyGrades = (studentGrades) => (
  Object.values(studentGrades).every((grade) => grade === 'Aprovado')
);

console.log(verifyGrades(grades));

// Observe que foi usado Object.values junto com o every . Como o Object.values retorna um array apenas com os valores do objeto, o every percorrerá esse array retornado. Interessante essa combinação de funções, hein?! Experimente alguma combinação dessas na sua própria máquina agora!

// Para fixar
// 1 - Escreva uma função que dado um array de nomes e um nome retorne true se ele estiver contido e caso contrário, retorne false , use some ;

const names = ['Mateus', 'José', 'Ana', 'Cláudia', 'Bruna'];

const hasName = (arr, name) => {
  return arr.some((currentName) => currentName === name);
}

console.log(hasName(names, 'Ana'));

// 2 - Escreva uma função que dado um array de pessoas e uma idade mínima retorne true se todas tiverem a idade maior ou igual a mínima e caso contrário false , use every ;

const people = [
  { name: 'Mateus', age: 18 },
  { name: 'José', age: 16 },
  { name: 'Ana', age: 23 },
  { name: 'Cláudia', age: 20 },
  { name: 'Bruna', age: 19 },
];

const verifyAges = (arr, minimumAge) => { 
  return arr.every((person) => person.age >= minimumAge);}

console.log(verifyAges(people, 18));
