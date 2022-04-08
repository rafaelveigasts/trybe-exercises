## Services
Agora vamos para os services .

## Classe Service

Vamos construir uma classe abstrata para nosso service , pois vamos reutilizá-la para fazer outras classes de serviço mais especificas.

Nessa classe abstrata, vamos fazer os métodos que vamos utilizar para nosso CRUD .

A classe que iremos construir que se estenderá de Service será tipada com o tipo do serviço por isso adicionamos um genérico T .


  // src/Services/index.ts

  import { ZodError } from 'zod';
  import Model from '../Models';

  export interface ServiceError {
    error: ZodError;
  }
  abstract class Service<T> {
    constructor(protected model: Model<T>) { }

    public async create(obj: T): Promise<T | null | ServiceError> {
      return this.model.create(obj);
    }

    public async read(): Promise<T[]> {
      return this.model.read();
    }

    public async readOne(id: string): Promise<T | null | ServiceError> {
      return this.model.readOne(id);
    }
  }

  export default Service;



Os métodos simplesmente chamam o método equivalente do model, pois por padrão não fazemos nenhuma validação. Se existirem regras de negócio que exigem alguma validação ou formatação, os métodos podem ser sobrescritos na subclasse.


## Services

Tal como fizemos com os models, podemos criar classes específicas para os services, que vão herdar da nossa classe abstrata base.
Vamos começar com a FrameService .


  // src/Services/Frame.ts

  import Frame, { FrameSchema } from '../Interfaces/Frame';
  import Service, { ServiceError } from '.';
  import FrameModel from '../Models/Frame';

  class FrameService extends Service<Frame> {
    constructor(model = new FrameModel()) {
      super(model);
    }

    create = async (obj: Frame): Promise<Frame | ServiceError | null> => {
      const parsed = FrameSchema.safeParse(obj);
      if (!parsed.success) {
        return { error: parsed.error };
      }
      return this.model.create(obj);
    };
  }

  export default FrameService;




Primeiramente, observe que ao herdar da classe abstrata Service , nossa classe FrameService já possui todos os métodos criados até então. Como os métodos read e readOne não necessitam de uma validação especial do service, eles não precisam ser reimplementados na subclasse.

Já o método create precisa realizar validações específicas da criação de um Frame . É validado o objeto passado como parâmetro para a create . Essa validação ocorre em tempo de execução (quando o TypeScript já virou JavaScript ), e garante que as interfaces que criamos com o Zod estão sendo respeitadas.

Essa validação é feita por meio do método safeParse do esquema criado com o Zod , que neste caso é o frameSchema . Se o objeto não estiver de acordo com o esquema, a propriedade (chave) success do objeto de retorno do safeParse passa a possuir o valor false , e o erro de validação fica na chave error . O Zod oferece também o método schema.parse , que levanta um erro ao invés de retornar um valor. Você pode usá-lo caso ache melhor para a sua aplicação. Ao rodar o código completo no final do exemplo do dia, você poderá observar que havendo alguma inconsistência nos dados, como ausência de campo, um tipo de dado que seja divergente do esperado ou até mesmo validação da quantidade de caracteres de uma string em nosso frameSchema , a pessoa usuária receberá como resposta da requisição um objeto contendo a mensagem de erro detalhada.

Seguiremos a mesma lógica vista acima, para a criação de LensService .