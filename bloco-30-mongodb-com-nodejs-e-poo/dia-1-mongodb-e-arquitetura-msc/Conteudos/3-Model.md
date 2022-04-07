## Model com Mongoose

Uma das maiores vantagens da arquitetura MSC é que ao dividir as funções e responsabilidades da aplicação em camadas, podemos fazer alterações em uma das partes praticamente sem que as outras sejam afetadas.

É na camada model , ou de modelo, que são definidas as estruturas de dados utilizadas em uma aplicação e é responsabilidade desta camada abstrair todos os detalhes de acesso, manipulação e armazenamento de dados. Por isso, quando alteramos o banco de dados utilizado em uma aplicação, é lá que precisaremos fazer as adequações necessárias.

Sendo assim, vamos imaginar que temos uma API de livros que utilizava um banco de dados x e que agora passará a utilizar MongoDB. Sabemos que a aplicação utiliza Node.js e TypeScript e queremos fazer a alteração de nosso data storage com o mínimo de impacto no restante da aplicação.

A seguir, você poderá ver o código da aplicação, com exceção da camada de modelo, que foi completamente removida. Sabendo que a aplicação anteriormente permitia inserir, listar, atualizar e deletar livros no banco de dados e que espera-se que todas essas funções continuem sendo possíveis com a utilização do novo banco. Assim, iremos refatorar este CRUD usando MongoDB com Mongoose de forma que a aplicação volte a funcionar normalmente.


## Boilerplate da aplicação
Para iniciar, vamos criar os diretórios da nossa aplicação.

mkdir Bookshop && cd Bookshop
mkdir src && cd src && mkdir models services controllers schemas

Antes de qualquer outra coisa, vamos instalar o Mongoose e o Express em nossa aplicação:

*npm install mongoose express*

Também precisamos instalar nossas dependências de desenvolvimento, faremos isso com:

*npm install -D typescript ts-node nodemon @types/express*

Dentro do package.json , vamos criar um script chamado "dev" para inicializar nossa aplicação com o nodemon :

  "scripts": {
    "dev": "nodemon --watch src/ --ext ts,json --ignore src//*.spec.ts --exec ts-node src/index.ts"
  },


Como as alterações necessárias envolvem apenas o banco de dados, espera-se que o restante da aplicação funcione sem alterações ou, ao menos, sem alterações estruturais. O restante da aplicação está a seguir. Copie e cole as partes nos locais indicados na primeira linha do bloco de códico. Ter este código será essencial para que você consiga testar as rotas fazendo as requisições necessárias quando o model estiver pronto.

____________________

  // src/services/BookService.ts

  import BookModel from '../models/BookModel';
  import { IBook } from '../schemas/BookSchema';

  class BookService {
    constructor(private bookModel = new BookModel()) {} 

    public async getBooks(): Promise<IBook[]> {
      const books = await this.bookModel.getBooks();
      return books;
    }

    public async createBook(bookData: object): Promise<IBook> {
      const book = await this.bookModel.createBook(bookData);
      return book;
    }

    public async getBook(id: string): Promise<IBook | null> {
      const data = await this.bookModel.getBook(id);
      return data;
    }

    public async updateBook(id: string, bookData: object): Promise<IBook | null> {
      const data = await this.bookModel.editBook(id, bookData);
      return data;
    }

    public async deleteBook(id: string): Promise<IBook | null> {
      const data = await this.bookModel.deleteBook(id);
      return data;
    }
  }

  export default BookService;

  ___________________________

    // src/controllers/BookController.ts

  import { Request, Response } from 'express';
  import BookService from '../services/BookService';

  class BookController {
    constructor(private bookService = new BookService()) {}

    notFound = 'Book not found';

    internalError = 'Internal server error';

    public getBooks = async (req: Request, res: Response): Promise<Response> => {
      try {
        const books = await this.bookService.getBooks();

        return res.status(200).send(books);
      } catch (err: unknown) {
        return res.status(500).send({ message: this.internalError });
      }
    };

    public create = async (req: Request, res: Response): Promise<Response> => {
      try {
        const book = await this.bookService.createBook(req.body);
        return res.status(201).send(book);
      } catch (err: unknown) {
        return res.status(500).send({ message: this.notFound });
      }
    };

    public getBook = async (req: Request, res: Response): Promise<Response> => {
      try {
        const { id } = req.params;
        const book = await this.bookService.getBook(id);
        if (book) {
          return res.status(200).send(book);
        }
        return res.status(404).send({ message: this.notFound });
      } catch (err: unknown) {
        return res.status(500).send({ message: this.internalError });
      }
    };

    public updateBook = async (req: Request, res: Response):
    Promise<Response> => {
      try {
        const { id } = req.params;
        const book = await this.bookService.updateBook(id, req.body);
        if (book) {
          return res.status(200).send(book);
        }
        return res.status(404).send({ message: this.notFound });
      } catch (err: unknown) {
        return res.status(500).send({ message: this.internalError });
      }
    };

    public deleteBook = async (req: Request, res: Response):
    Promise<Response> => {
      try {
        const { id } = req.params;
        const book = await this.bookService.deleteBook(id);
        if (book) {
          return res.status(200).send(book);
        }
        return res.status(404).send({ message: this.notFound });
      } catch (err: unknown) {
        return res.status(500).send({ message: this.internalError });
      }
    };
  }

  export default BookController;

_______________________

  // src/app.ts

  import express from 'express';
  import routes from './routes';
  import connection from './models/connection';

  class App {
    public express: express.Application;

    public connection: Promise<typeof import('mongoose')>;

    constructor() {
      this.express = express();
      this.middlewares();
      this.connection = connection();
      this.routes();
    }

    private middlewares(): void {
      this.express.use(express.json());
    }

    private routes() {
      this.express.use(routes);
    }
  }

  export default App;

________________________

  // src/index.ts

  import App from './app';

  const app = new App().express;

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, () => {
    console.log(`Ouvindo a porta ${PORT}`);
  });

____________________________


  // src/routes.ts

  import { Router } from 'express';

  import BookController from './controllers/BookController';

  const bookController = new BookController();
  const routes = Router();

  const booksId = '/books/:id';

  routes.get('/books', bookController.getBooks);
  routes.post('/books', bookController.create);
  routes.put(booksId, bookController.updateBook);
  routes.delete(booksId, bookController.deleteBook);
  routes.get(booksId, bookController.getBook);

  export default routes;

_______________________________


  // tsconfig.json

  {
    "compilerOptions": {
      "target": "es2016",
      "module": "commonjs",
      "typeRoots": [
        "src/@types",
        "./node_modules/@types"
      ],
      "esModuleInterop": true,
      "forceConsistentCasingInFileNames": true,
      "strict": true,
      "skipLibCheck": true
    }
  }


**Boilerplate ou código boilerplate, no contexto da programação, se refere a seções de código que podem ser incluídas em muitos lugares com pouca ou nenhuma alteração.**