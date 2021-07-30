/*Instruções para realização dos exercícios
Nos exercícios a seguir, você trabalhará com uma estrutura de dados representando uma lista de livros, contendo informações como nome do livro, gênero, pessoa autora do livro e data de lançamento.
Em cada exercício, será pedido que você encontre ou produza alguma informação a respeito dessa lista utilizando as funções que você aprendeu hoje. Todos os exercícios contêm um código base. Você deverá copiar esse código e salvá-lo em um arquivo nomeado conforme o número do exercício, completando a função em branco.
Por exemplo, o exercício 1 deve ser salvo no arquivo exercise1.js , e assim por diante. Em cada exercício existe uma ou mais chamadas de funções do módulo assert . Essas funções checarão automaticamente se seu código retorna o resultado esperado.
Sua solução só será considerada correta se todos os asserts do arquivo forem executados sem erros. No Visual Studio Code , você pode executar o código do exemplo clickando com o botão direito e escolhendo a opção Run Code .
Quando todos os asserts passam, isto é, nenhum deles encontra um resultado diferente do esperado, nada de diferente do normal é reportado:


Agora a prática
Estes exercícios praticam os conceitos de Higher Order Functions associados a outros já vistos, como arrow functions , template literals , objetos e temas dos fundamentos. Essa mistura de conceitos é muito importante para seu aprendizado, então use tudo o que sabe para resolver os exercícios!
Utilize seguinte código como template para realizar os exercícios:*/

const assert = require('assert');

const books = [
  {
    id: 1,
    name: 'As Crônicas de Gelo e Fogo',
    genre: 'Fantasia',
    author: {
      name: 'George R. R. Martin',
      birthYear: 1948,
    },
    releaseYear: 1991,
  },
  {
    id: 2,
    name: 'O Senhor dos Anéis',
    genre: 'Fantasia',
    author: {
      name: 'J. R. R. Tolkien',
      birthYear: 1892,
    },
    releaseYear: 1954,
  },
  {
    id: 3,
    name: 'Fundação',
    genre: 'Ficção Científica',
    author: {
      name: 'Isaac Asimov',
      birthYear: 1920,
    },
    releaseYear: 1951,
  },
  {
    id: 4,
    name: 'Duna',
    genre: 'Ficção Científica',
    author: {
      name: 'Frank Herbert',
      birthYear: 1920,
    },
    releaseYear: 1965,
  },
  {
    id: 5,
    name: 'A Coisa',
    genre: 'Terror',
    author: {
      name: 'Stephen King',
      birthYear: 1947,
    },
    releaseYear: 1986,
  },
  {
    id: 6,
    name: 'O Chamado de Cthulhu',
    genre: 'Terror', 
    author: {
      name: 'H. P. Lovecraft',
      birthYear: 1890,
    },
    releaseYear: 1928,
  },
];

// 1 - Encontre o nome da primeira pessoa autora do livro nascida no ano de 1947. Dica: use a função find .

function autor1947() {
  return books.find((book) => book.author.birthYear === 1947).author.name;
}
 assert. strictEqual(autor1947(), 'Stephen King');


 

//  2 - Retorne o nome do livro de menor nome. Dica: use a função forEach .

function smallerName() {
  let nameBook;
  // escreva aqui o seu código

  // Variável nameBook que receberá o valor do menor nome;
  return nameBook;
}

assert.strictEqual(smallerName(), 'Duna');

/*Solução:
Declaramos a variável nameBook sem nenhum valor;
Aplica-se a condicional if utilizando operadores lógicos. O primeiro é o not (!) antes de nameBook . Fazemos isso, pois o fato de nameBook não guardar nenhum valor é retornado "undefined" por padrão, consequentemente o JavaScript interpreta ele como um valor "falsy", que se traduz como "false" propriamente. Desta maneira, ao utilizar o operador not (!) antes de nameBook, estamos negando que ele seja falso, ou seja, convertendo-o para "true";
Utilizamos o operador or/ou (||) para compor a lógica de que se nameBook retornar "true" ou se o tamanho da string contida na chave name de cada objeto em books for menor que o tamanho de nameBook , nossa função irá guardar o nome desse livro em nameBook ;
Na primeira iteração, como nameBook é undefined, ou seja não guarda o nome de nenhum livro, o primeiro nome de livro será guardado em nameBook . A partir da segunda iteração, é feita a comparação e se o nome do livro for menor que o que está guardado em nameBook , este irá tomar seu lugar e assim por diante até a última iteração.
*/