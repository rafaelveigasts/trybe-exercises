## Agora, a prática!
Para realizar os exercícios de hoje, você utilizará um dataset de filmes. Para isso, crie a coleção movies :

use cinema;
db.movies.drop();
db.movies.insertMany([
  {
    title: "Batman",
    category: [
      "action",
      "adventure"
    ],
    imdbRating: 7.7,
    budget: 35,
    ratings: [
      85,
      100,
      102,
      105
    ],
    description: "The Dark Knight of Gotham City begins his war on crime with his first major enemy being Jack Napier, a criminal who becomes the clownishly homicidal Joker."
  },
  {
    title: "Godzilla",
    category: [
      "action",
      "adventure",
      "sci-fi"
    ],
    imdbRating: 6.6,
    budget: 10,
    ratings: [
      78,
      52,
      95,
      102
    ],
    description: "The world is beset by the appearance of monstrous creatures, but one of them may be the only one who can save humanity."
  },
  {
    title: "Home Alone",
    category: [
      "family",
      "comedy"
    ],
    imdbRating: 7.4,
    ratings: [
      200,
      99,
      65
    ],
    description: "An eight-year-old troublemaker must protect his house from a pair of burglars when he is accidentally left home alone by his family during Christmas vacation."
  }
]);

Para cada execução, utilize o método find() para conferir as alterações nos documentos

O "MongoDB" possui diversas ferramentas como por exemplo, mongo , mongosh , Compass e outras ferramentas de terceiros. Você pode utilizar o que achar melhor para executar as queries , o importante é realizá-las.

Utilizando o operador $all , retorne todos os filmes que contenham action e adventure no array category .
Agora retorne os filmes que contenham action no array category e possuem nota do IMDB maior do que 7 .
Retorne todos os filmes com ratings maior do que 103 , exibindo apenas os campos title e ratings .
Retorne todos os filmes com ratings entre 100 e 105 , exibindo apenas os campos title e ratings .
Retorne todos os filmes com ratings entre 64 e 105 e divisíveis por 9 , exibindo apenas os campos title e ratings .
Retorne os filmes da categoria adventure e com ratings maior do que 103 , exibindo apenas os campos title , ratings e category .
Retorne somente o título de todos os filmes com dois elementos no array category .
Retorne somente o título de todos os filmes com quatro elementos no array ratings .
Busque os filmes em que o módulo 5 do campo budget seja 0 e que o array category tenha tamanho 2 .
Retorne os filmes da categoria "sci-fi" ou que possua o ratings maior do que 199 , exibindo apenas os campos title , ratings e category .
Retorne os filmes em que o ratings possua tamanho 4 e que seja da category "adventure" ou "family" , mas que não tenha o imdbRating menor que 7.
Utilizando o operador $regex , retorne todos os filmes em que a descrição comece com a palavra "The" .
Utilizando o operador $regex , retorne todos os filmes em que a descrição termine com a palavra "humanity." .
