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
