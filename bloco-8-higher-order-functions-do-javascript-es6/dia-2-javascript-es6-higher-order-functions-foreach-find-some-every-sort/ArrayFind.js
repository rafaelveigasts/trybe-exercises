// Array.find
// A função find é utilizada para achar o primeiro elemento que satisfaça a condição passada. Então, a função que deverá ser passada precisa retornar true ou false. Nesta página do MDN você pode ver com mais detalhes sobre o find . Leia até a seção Exemplos .

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find

// Veja também o método findIndex(), que retorna o índice do elemento encontrado no array ao invés do seu valor.

// Se você precisa encontrar a posição de um elemento ou se um elemento existe em um array, use Array.prototype.indexOf() ou Array.prototype.includes().

// O find não altera a array à qual foi acionado.


// A animação abaixo nos mostra como o find pode ser utilizado para encontrar o primeiro item do array listaNumeros maior do que vinte. Essa condição (item > 20) é implementada na função (callback), que será executada para cada elemento de listaNumeros . Quando o primeiro item do array listaNumeros for maior que vinte, a função (callback) retornará true e o find irá retornar este elemento que satisfaz a condição passada. Observe que o retorno do método find é um único elemento: o primeiro item de listaNUmeros maior do que 20.

// Olhe o exemplo abaixo:

const numbers = [19, 21, 30, 3, 45, 22, 15];

const verifyEven = (number) => number % 2 === 0;

const isEven = numbers.find(verifyEven);

console.log(isEven); // 30

console.log(verifyEven(9)); // False
console.log(verifyEven(14)); // True

// Outra forma de ser realizada sem a necessidade de criar uma nova função.
const isEven2 = numbers.find((number) => number % 2 === 0);

console.log(isEven2); // 30

// Esse exemplo mostra duas formas de resolver o mesmo problema, que é retornar o primeiro número par do array.
// Primeiro observe a função verifyEven . Ela verifica se o número recebido é par. Se sim, seu retorno será true; caso contrário, seu retorno é false.
// Quando a passamos como callback , o find executará a função para cada um dos elementos do array e retornará o primeiro elemento quando o retorno da função for true.

// Para fixar
// 1 - Utilize o find para retornar o primeiro número do array que é divisível por 3 e 5 , caso ele exista:

const numbers = [19, 21, 30, 3, 45, 22, 15];

const findDivisibleBy3And5 = () => {
  return numbers.find((number) => number % 3 ===0 && number % 5 === 0); 
}

console.log(findDivisibleBy3And5())

// 2 - Utilize o find para encontrar o primeiro nome com cinco letras, caso ele exista:
const names = ['João', 'Irene', 'Fernando', 'Maria'];

const findNameWithFiveLetters = () => {
  return names.find((name) => name.length === 5)

}

console.log(findNameWithFiveLetters());

// 3 - Utilize o find para encontrar a música com id igual a 31031685 , caso ela exista:

const musicas = [
  { id: '31031685', title: 'Partita in C moll BWV 997' },
  { id: '31031686', title: 'Toccata and Fugue, BWV 565' },
  { id: '31031687', title: 'Chaconne, Partita No. 2 BWV 1004' },
]

function findMusic(id) {
return musicas.find((id) => musicas.id = id)}

console.log(findMusic('31031685'))
