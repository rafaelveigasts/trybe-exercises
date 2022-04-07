## Schemas e Models
Vamos começar a ver na prática como funciona a estrutura do Mongoose. Veja o exemplo:

db.books.find();

Essa consulta em MongoDB retorna todos os documentos na coleção books , que criamos anteriormente:


[
  { title: 'A Game of Thrones', author: 'George R. R. Martin' },
  { title: 'A Clash of Kings', author: 'George R. R. Martin' },
  { title: 'A Storm of Swords', author: 'George R. R. Martin' },
  { title: 'The Lord of The Rings - The Fellowship of the Ring', author: 'J. R. R. Tolkien' },
  { title: 'The Lord of The Rings - The Two Towers', author: 'J. R. R. Tolkien' },
  { title: 'The Lord of The Rings - The Return of The King', author: 'J. R. R. Tolkien' },
  { title: 'Foundation', author: 'Isaac Asimov' }
]


Observe que temos uma estrutura básica dos documentos na nossa coleção books , uma chave title e outra author . No Mongoose, essa estrutura básica é chamada de schema . Para acessarmos os dados utilizando Mongoose, primeiramente precisamos escrever um schema para a coleção que queremos acessar, nesse caso a coleção books . Vamos escrevê-lo logo abaixo:


import { connect, Schema } from 'mongoose';

connect('mongodb://localhost:27017/model_example');

// Criamos uma interface em TypeScript para representar nosso schema:

interface Book {
  title: string,
  author: string,
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true }});




O Schema recebe 3 parâmetros genéricos:
DocType : A interface que descreve os dados do nosso schema, que por sua vez representa a coleção do MongoDB, no caso do nosso exemplo acima, usamos a interface Book ;

Model: A tipagem do Model. Geralmente é omitido se o próximo parâmetro não for passado

Como padrão, recebe a tipagem do próprio DocType;

TInstanceMethods - Uma interface que contém os métodos deste schema.

Para o nosso exemplo, foque sua atenção apenas no primeiro, mas caso queira entender mais sobre os outros dois, consulte a documentação . https://mongoosejs.com/docs/typescript/schemas.html

Como você já percebeu nos códigos acima, nós criamos uma interface que define a tipagem de cada campo presente no Schema . Essa tipagem é o primeiro argumento, o DocType . O Mongoose verifica se cada campo definido no seu schema está presente na interface. Por exemplo: se por acaso escrevêssemos no schema do código acima "authorr", ao invés de "author", o código não compilaria:


import { connect, Schema } from 'mongoose';

// connect('mongodb://localhost:27017/model_example');

interface Book {
  title: string,
  author: string,
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  authorr: { type: String, required: true }});


Mas e se no schema faltar algum campo que está presente na interface como obrigatório?
O Mongoose não irá detectar nenhum erro:


import { connect, Schema } from 'mongoose';

// connect('mongodb://localhost:27017/model_example');

interface Book {
  title: string,
  author: string,
  coAuthor: string,
}

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true }});




Isso ocorre porque o Mongoose possui inúmeras ferramentas que adicionam campos no schema sem que você deixe isso explícito ao construir o seu schema como na linha 9 do código acima, como por exemplo timestamps ou plugins . Veja mais detalhes sobre isso na seção de Conteúdos Adicionais.

Ao criar um schema , você está basicamente dizendo ao Mongoose que você possui uma coleção de livros na sua base de dados que segue a estrutura passada. Repare que, caso algum campo seja opcional, ou não exista em alguns dos documentos da sua base, você pode apenas definir o seu tipo, assim o Mongoose interpretará o campo required como false ( undefined ).

Porém, criar schemas não é o suficiente. Para termos acesso completo e começar a manipular os dados do nosso banco utilizando JavaScript, precisamos criar um Model baseado no schema que foi criado. Como assim? Veja:


// Repare que aqui importamos também a função 'model' do Mongoose:
import { connect, Schema, model }  from 'mongoose';

// connect('mongodb://localhost:27017/model_example');

interface Book {
  title: string,
  author: string,
}

// Aqui está o nosso schema construído logo acima:

const bookSchema = new Schema<Book>({
  title: { type: String, required: true },
  author: { type: String, required: true }});

// Para acessarmos os métodos disponibilizados pelo Mongoose e
// implementarmos nossa API, criamos um Model do product:

const bookModel = model<Book>('books', bookSchema);

A função model recebe dois parâmetros: o primeiro é uma string que representa o nome da coleção no nosso banco de dados e o segundo é o nome do schema que fazemos referência no Model.

A partir daqui podemos, automagicamente , acessar todos os métodos (como insertOne , findById ) a partir de bookModel e começar a trabalhar com nosso banco a partir do Node.js.

Vamos inserir alguns dados para poder trabalhar como exemplo durante o dia.

