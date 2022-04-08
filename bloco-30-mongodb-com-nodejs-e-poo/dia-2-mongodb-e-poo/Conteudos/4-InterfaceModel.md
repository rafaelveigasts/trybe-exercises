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


## Models
Vamos construir nosso primeiro model, esse será o model da armação de nossos óculos que serão produzidos.

  // src/Models/Frame.ts

  import { Schema, model as createModel, Document } from 'mongoose';
  import Frame from '../Interfaces/Frame';
  import MongoModel from './MongoModel';

  interface FrameDocument extends Frame, Document { }

  const frameSchema = new Schema<FrameDocument>({
    material: String,
    color: String,
  });

  class FrameModel extends MongoModel<Frame> {
    constructor(model = createModel('Armacoes', frameSchema)) {
      super(model);
    }
  }

  export default FrameModel;


O mongoose solicita que, ao criarmos um model com a função createModel , passemos a ela um esquema ( Schema ) que deverá ser respeitado. Esse esquema deve ter o tipo do model a ser criado e também do Document do mongoose . Ou seja, deve ser um tipo que estenda estes dois. Isso é necessário para quando o nosso objeto criado pelo model tenha todos esses métodos e atributos disponíveis para usarmos. Por este motivo, vamos começar pela interface que vai tipar nosso esquema.

Criamos uma interface com o nome de FrameDocument , por ser uma interface que estende as interfaces Frame e Document . Ao criarmos nosso Schema, chamado de frameSchema , passamos como genérico o FrameDocument . Em seguida, ao criarmos o model com a createModel , passamos como segundo parâmetro o frameSchema .

Veja que só definimos o nome do nosso model importado do mongoose como createModel , para não criar confusão com o Model importado da interface.

Observe que interessante: bastou a gente criar o esquema e sobrescrever o construtor com o valor padrão do model e pronto, temos uma classe que funciona como model para nosso Frame, com todos os métodos (create, read, readOne) agindo em cima do banco mongodb.

Seguiremos a mesma lógica vista acima, para a criação de LensModel .


  // src/Models/Lens.ts

  import { Schema, model as createModel, Document } from 'mongoose';
  import Lens from '../Interfaces/Lens';
  import MongoModel from './MongoModel';

  interface LensDocument extends Lens, Document { }

  const lensSchema = new Schema<LensDocument>({
    degree: Number,
    antiGlare: Boolean,
    blueLightFilter: Boolean,
  });

  class LensModel extends MongoModel<Lens> {
    constructor(model = createModel('Lenses', lensSchema)) {
      super(model);
    }
  }

  export default LensModel;


Impressionante o poder da orientação a objetos. Podemos criar diversas classes para diversos models, apenas criando o esquema (exigido pelo mongoose ) e herdando de MongoModel . Além disso, se for necessário, os métodos do CRUD podem ser sobrescritos na subclasse, de forma a implementar validações ou regras específicas para um model específico.
