## Interface Model

Já que fizemos a conexão com mongoose, estamos livres para trabalhar com os models, mas primeiro vamos criar uma interface para os models seguirem uma regra de implementação.

O uso de uma interface garante que caso o banco de dados utilizado seja alterado, se as classes que realizam o acesso ao banco implementem essa interface, o resto do código se mantenha inalterado.

Nossa interface Model recebe um genérico T . Isso é necessário pois cada model irá receber um objeto e retorno de tipos diferentes. Por exemplo, podemos ter um model de Frame e outro de Lens . O método read no model de Frame vai retornar um Frame (ou null ), enquanto que o mesmo método no model de Lens vai retornar uma Lens (ou null ).

  // src/Models/index.ts
  interface Model<T> {
    create(obj: T): Promise<T>,
    read(): Promise<T[]>,
    readOne(id_: string): Promise<T | null>,
  }

  export default Model;



## Classe MongoModel

Agora que temos uma interface genérica para um model qualquer, vamos construir uma classe abstrata para nossos models que utilizam mogoose .

É possível simplesmente criar uma classe para o model de Frame e outra para o de Lens , e acessar os métodos do mongoose por lá, mas como boa parte dos acessos ao banco são iguais, mudando apenas o objeto que é criado/lido/etc, é interessante criar uma classe específica de um model que usará o mongoose. Essa classe implementa a interface Model que criamos, e já implementa todos os seus métodos. Se for necessário em algum model específico alterar a forma como ele é criado/lido/etc, podemos sobrescrever o método na classe mais específica.



  // src/Models/MongoModel.ts`

  import { Model as M, Document } from 'mongoose';
  import Model from '.';

  abstract class MongoModel<T> implements Model<T> {
    constructor(protected model: M<T & Document>) { }

    create = async (obj: T): Promise<T> => this.model.create({ ...obj });

    read = async (): Promise<T[]> => this.model.find();

    readOne = async (id: string): Promise<T | null> =>
      this.model.findOne({ _id: id });
  }

  export default MongoModel;

Observe que MongoModel continua recebendo um genérico T , pois essa classe poderá ser utilizada com diversos objetos diferentes.

Além disso todas os métodos estão implementados com o uso do atributo protegido model . Observe que o tipo deste model é o tipo Model presente no mongoose , mas como haveria conflito com a nossa interface homônima, utilizamos o alias M para o Model do mongoose . Não só isso, este M recebe também um genérico, que nada mais é do que a junção do tipo do seu model com o Document do mongoose .

Vamos olhar a criação dos models específicos para compreender melhor.
