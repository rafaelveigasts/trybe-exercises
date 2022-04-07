## Reestruturando a aplicação
Criando uma conexão com o banco
Agora vamos estabelecer uma conexão com o servidor do MongoDB. Para isso, vamos criar o arquivo connection , dentro da pasta models e inserir o código:



// models/connection.ts

import mongoose from 'mongoose';

const connection = (mongoDatabaseURI = 'mongodb://localhost:/model_example') =>
  mongoose.connect(mongoDatabaseURI);

export default connection;



Um ponto importante de destacar no código acima, é que estamos utilizando um padrão conhecido como singleton . Em resumo, um singleton é um objeto ou módulo que, mesmo que chamado várias vezes, só vai ser criado uma vez.

Isso garante que, durante todo o ciclo de vida da nossa aplicação, só iremos abrir uma conexão com o banco.
Essa conexão está sendo chamada no arquivo app.ts .


## Populando o banco

Antes de iniciarmos, certifique-se de ter o MongoDB instalado na sua máquina. Caso não tenha, consulte o conteúdo sobre MongoDB ou use uma imagem docker do MongoDB, utilizando o comando 

*docker run --name mongo-crud -d -p 27017:27017 -e AUTH=no mongo* .


Abra o console do MongoDB local ou via Docker com 

*docker exec -it mongo-crud mongo* 

e execute o código abaixo para popular o banco:

use model_example
db.books.insertMany([
  { title: 'The Dispossessed', author: 'Ursula K. Le Guin', publishedYear: 1974 },
  { title: 'I Am Legend', author: 'Richard Matheson', publishedYear: 1954, weight: '6.4 ounces'  },
  { title: 'The Road', author: 'Cormac McCarthy', publishedYear: 2006 },
  { title: 'Foundation', author: 'Isaac Asimov' },
  { title: '2001: A Space Odyssey', author: 'Arthur C. Clarke', weight: '5.4 ounces' },
]);

Prontinho, agora que já temos um banco populado, podemos iniciar de fato nossas alterações na aplicação. 🤘


## Criando um schema com Mongoose

Antes de tudo, vamos criar uma pasta chamada schemas dentro do diretório /src . Nela, vamos colocar nosso schema de livros e seu respectivo model ( model do mongoDB, não confundir com a camada model 😉).

Para isso, crie o arquivo BookSchema.ts dentro da nossa pasta schemas . Nele, vamos criar e implementar a interface IBook .

// /src/schemas/BookSchema.ts

import { Schema } from 'mongoose';

export interface IBook {
  title: string;
  author: string;
  publishedYear: number;
  weight?: string;
}

/*
  Uma vez que implementamos a interface Book,
  colocamos ela entre <>, para definir o tipo
  do Schema.
*/

export const BookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  publishedYear: { type: Number, required: false },
  weight: { type: String, required: false }});



## Listando livros com Mongoose
Vamos construir nossa camada de modelo para Book , començando pela inserção do método getBooks :


// models/BookModel.ts

import { model as createModel } from 'mongoose';
import { BookSchema, IBook } from '../schemas/BookSchema';

class BookModel {
  /*
    Criamos no construtor um model do Mongoose do tipo IBook, passando pro createModel(model do Mongoose) um nome e o schema de referência.
  */

  constructor(private bookModel = createModel<IBook>('books', BookSchema)) {} 

  public async getBooks(): Promise<IBook[]> {
    const books = await this.bookModel.find();
    return books;
  }
}

export default BookModel;




O método getBooks busca no banco todos os livros e retorna uma Promise do tipo IBook, em que definimos o formato que um documento da collection books deve ter.

Antes de testar se nosso código está funcionando, devemos comentar os métodos que ainda não foram criados na camada de modelo e que estão sendo chamados no Service , no Controller e também no routes , de forma que apenas o primeiro método (getBooks) esteja descomentado.

Com isso feito, inicie a aplicação com npm run dev e faça uma requisição GET para http://localhost:3000/books . A listagem de livros continua funcionando, mas agora os dados estão sendo lidos do MongoDB. Não precisamos alterar nada fora da camada de modelo. 😉

Certifique-se que seu container ou o server local do MongoDB está rodando, ao inicializar a aplicação.

