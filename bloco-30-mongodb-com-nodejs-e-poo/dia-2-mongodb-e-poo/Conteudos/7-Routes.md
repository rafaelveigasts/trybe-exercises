## Routes

Uma vez possuímos as camadas Controller e Service prontas, partiremos para a criação das nossas rotas. Começamos criando a classe CustomRouter que possui o atributo router (do tipo Router vindo da biblioteca Express ).

  // src/Routes/Router.ts

  import { Router } from 'express';
  import Controller from '../Controllers';

  class CustomRouter<T> {
    public router: Router;

    constructor() {
      this.router = Router();
    }

    public addRoute(
      controller: Controller<T>,
      route: string = controller.route,
    ) {
      this.router.get(route, controller.read);
      this.router.get(`${route}/:id`, controller.readOne);
      this.router.post(route, controller.create);
    }
  }

  export default CustomRouter;



Além do router , implementamos também o método addRoute , que será responsável pela criação dos endpoints da nossa API. Primeiramente, passamos dois parâmetros para método, o primeiro é o nosso controller que será do tipo Controller , referente a interface que criamos em Controller/index.ts , e por fim, o segundo parâmetro chamado route do tipo string . Por padrão o parâmetro route é o definido em controller.route , visando praticidade na hora de criar rotas genéricas em sistemas mais simples. Entretanto, para evitar colisões no caso da existência de dois controllers com a mesma rota, podemos passar um valor diferente para route , de forma a termos 2 (ou mais, se necessário) rotas para controllers do mesmo tipo.
