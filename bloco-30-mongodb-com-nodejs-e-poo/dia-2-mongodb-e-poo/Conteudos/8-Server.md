## Server
Com nossa aplicação pronta, é chegada a hora de configurar nosso setup, faremos isso em nosso arquivo src/server.ts . Neste momento, vamos dar um start inicial em nosso foguete início a criação da class App , que será responsável por iniciar nosso servidor local, conectar nosso banco de dados á aplicação e servir nossas rotas.


  // src/server.ts

  import express, { Router } from 'express';
  import connectToDatabase from './Models/Connection';

  class App {
    private app: express.Application;

    constructor() {
      this.app = express();
      this.app.use(express.json());
    }

    public startServer(port = 3001) {
      connectToDatabase();
      const actualPort = process.env.PORT || port;
      return this.app.listen(
        actualPort,
        () => console.log('Estamos online na porta: ', actualPort),
      );
    }

    public addRouter(router: Router) {
      this.app.use(router);
    }
  }

  export default App;


É interessante observar que a criação e a inicialização do servidor ocorrem em momentos separados, o que ajuda por exemplo ao realizar testes unitários ou de integração, em que o servidor não precisa estar rodando.
