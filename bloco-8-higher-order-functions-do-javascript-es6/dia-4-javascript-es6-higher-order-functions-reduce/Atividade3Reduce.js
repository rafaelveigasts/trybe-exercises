// Para os exercícios 2, 3 e 4 considere o seguinte array:
const assert = require('assert')
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

// 3 - Calcule a média de idade que as pessoas autoras tinham quando seus respectivos livros foram lançados.

const expectedResult = 43;

const tamanho = books.length
function averageAge() 
{
  const media = books
    .map((age)=> age.releaseYear - age.author.birthYear)
    .reduce((acc, curr) => acc + curr)

    return media/tamanho
}

assert.strictEqual(averageAge(), expectedResult);

// https://pt.stackoverflow.com/questions/480776/problema-com-o-reduce-para-calcular-m%C3%A9dia-aritm%C3%A9tica-de-array