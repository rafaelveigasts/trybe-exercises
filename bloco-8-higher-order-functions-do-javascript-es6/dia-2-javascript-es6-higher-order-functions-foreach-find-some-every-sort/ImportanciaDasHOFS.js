// Conteúdos
// Recapitulando a aula anterior, uma Higher Order Function é simplesmente uma função que recebe outra função como parâmetro ou que retorna uma função. Você já vem utilizando funções assim desde o começo do curso. Por exemplo, quando você escreve um código como este:
const button = document.getElementById('button');
button.addEventListener('click', () => {
  console.log('Clicou no botão!');
});

// Você está passando como segundo parâmetro para a função addEventListener , uma função contendo o código a ser executado quando o botão for clicado - no caso, a função simplesmente imprime no console Clicou no botão! . Está vendo? Você já usa HOFs sem saber. 🤓
// A seguir, veremos algumas HOFs que estão disponíveis em Arrays no JavaScript.

// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array

// Importância das HOFs
// "Mas por que isso é importante?!" Você deve estar se perguntando. Além de event listeners , JavaScript possui várias outras funções desse tipo. Os arrays, em particular, possuem várias funções que facilitam sua criação e manipulação, além de deixar seu código muito mais legível e conciso.
// Por exemplo: imagine que você tem um array de objetos. Cada objeto é um estudante com seu nome, nota e situação no curso. Para ser aprovado, ele precisa obter uma nota acima de 60. Como você pode ver, o objeto abaixo está desatualizado e precisa ser atualizado: ele não contém a informação acerca da aprovação. Para atualizá-lo, você provavelmente escreveria algo assim, utilizando loops :

const students = [
  { name: 'Maria', grade: 70, approved: '' },
  { name: 'José', grade: 56, approved: '' },
  { name: 'Roberto', grade: 90, approved: '' },
  { name: 'Ana', grade: 81, approved: '' },
];

function verifyGrades() {
  for (let i = 0; i < students.length; i += 1) {
    const student = students[i];
    if (student.grade >= 60) {
      student.approved = 'Aprovado';
    } else {
      student.approved = 'Recuperação';
    }
  }
}

verifyGrades();

console.log(students);
// [
//   { name: 'Maria', grade: 70, approved: 'Aprovado' },
//   { name: 'José', grade: 56, approved: 'Recuperação' },
//   { name: 'Roberto', grade: 90, approved: 'Aprovado' },
//   { name: 'Ana', grade: 81, approved: 'Aprovado' }
// ]


// Usando forEach , é assim que você faria a mesma coisa:

const students = [
  { name: 'Maria', grade: 70, approved: '' },
  { name: 'José', grade: 56, approved: '' },
  { name: 'Roberto', grade: 90, approved: '' },
  { name: 'Ana', grade: 81, approved: '' },
];

function verifyGrades() {
  students.forEach((student, index) => {
    if (student.grade >= 60) {
      students[index].approved = 'Aprovado';
    } else {
      students[index].approved = 'Recuperação';
    }
  });
}

verifyGrades();

console.log(students);
// [
//   { name: 'Maria', grade: 70, approved: 'Aprovado' },
//   { name: 'José', grade: 56, approved: 'Recuperação' },
//   { name: 'Roberto', grade: 90, approved: 'Aprovado' },
//   { name: 'Ana', grade: 81, approved: 'Aprovado' }
// ]

/*Ok, as duas abordagens geram o mesmo resultado, mas qual a diferença? Vamos analisar as duas soluções e ver em que elas diferem!
Na solução usando for , você vai precisar se preocupar mais com os detalhes durante a implementação de sua lógica de execução e menos com a solução do problema que você deseja solucionar - você só quer atualizar uma propriedade de cada estudante, afinal. Você precisa:
Declarar uma variável para controlar a iteração pelo array;
Inicializar essa variável com zero, a primeira posição do array;
Controlar o ponto de parada, quando o fim do array foi alcançado ( index < students.length );
Incrementar manualmente a variável de controle do loop a cada iteração ( index += 1 );
Usar indexação de arrays pra acessar cada elemento/estudante ( students[index] );
Ufa! Tudo isso só pra atualizar o seu array!
Agora vamos olhar para a segunda solução. Tudo o que você precisa fazer é chamar a função forEach no array e passar para ela a função que você criou. E mais nada! Esse é o poder da função forEach . 😎
Ainda não está convencido? Então vamos a mais um exemplo. Queremos encontrar e imprimir no console o primeiro elemento de um array que satisfaça a uma determinada condição. Pode ser, por exemplo, encontrar o primeiro número que seja divisível por 5 em uma lista de números.
Primeiro, usando for e if :*/

const numbers = [11, 24, 39, 47, 50, 62, 75, 81, 96, 100];
let firstMultipleOf5;
for (let index = 0; index < numbers.length; index += 1) {
  if (numbers[index] % 5 === 0) {
    firstMultipleOf5 = numbers[index];
    break;
  }
}

console.log(firstMultipleOf5);
// 50

// Agora, a mesma coisa usando Array.find :

const numbers = [11, 24, 39, 47, 50, 62, 75, 81, 96, 100];
const firstMultipleOf5 = numbers.find((number) => number % 5 === 0);

console.log(firstMultipleOf5);
// 50

// Além de muito mais concisa, a solução usando find é muito mais fácil de entender, concorda?
// Ponto de observação: note que o parâmetro passado para numbers.find(), number => number % 5 == 0 , é uma arrow function, igual no primeiro exemplo de forEach, em que foi passada a função verifyGrade .
// Mas essa ideia de passar uma arrow function para uma função ainda está pouco clara, não é mesmo? E esse parâmetro que ela recebe, vem de onde?! Quem passa? Agora vamos ver, em detalhes, a estrutura de uma HOF .