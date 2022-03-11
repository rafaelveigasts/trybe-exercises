## Interface Segregation Principle - ISP

O Princípio da Segregação de Interface afirma que:
Nenhum cliente deve ser forçado a depender de métodos que não utiliza

Isso quer dizer que devemos separar as interfaces e as compor conforme for necessário, fazendo com que uma entidade (classe) não precise implementar coisas que ela não vai usar.


Por exemplo, podemos pensar que ao fazer uma pizza, independentemente do sabor, teremos uma massa que servirá de base. Entretanto, não faz sentido a base possuir, além da massa, queijo, visto que algumas pizzas (por exemplo as doces ou veganas) não levam queijo. Da mesma forma, não faz sentido a base possuir chocolate (tal como em uma pizza doce), visto que nem toda pizza leva chocolate.

O ideal é que exista uma base pronta, e interfaces para cada um dos adicionais, como o queijo e o chocolate. Assim, cada pizza implementa as interfaces pertinentes, ou seja, usa queijo só quando precisa, e chocolate só quando precisa.

Vamos retomar o exemplo para ficar mais nítido?

## ISP Continuando o exemplo

Imagine que de tempos em tempos os dados que ficaram no banco em memória redis serão copiados para o banco MySQL . Para isso, de tempos em tempos o banco redis deverá ser lido por um RedisConnector . Entretanto, nossa classe RedisConnector possui alguns métodos de escrita que não são desejáveis para um objeto que deverá realizar somente leituras (imagine que quem vai consumir essa classe é uma pessoa que pode, sem querer, apagar um dado importante).

De forma a garantir que tenhamos uma classe ReadOnlyRedisConnector que só pode ler, bem como que tenhamos reutilização de código (pra isso que usamos Orientação a Objetos, não é?) e deixemos cada entidade com suas devidas responsabilidades, segregamos a interface.

## Segregando a interface

Vamos segregar nossa interface Connector em duas: ReadOnlyConnector e Connector :

// ./src/Connectors/Connector.ts

export interface ReadOnlyConnector {
  getCount(token: string): number | Promise<number>;

  closeConnection(): void;
}

export interface Connector extends ReadOnlyConnector {
  incrementCount(token: string): void;

  clearCount(token: string): void;

  firstCount(token: string): void;
}

export interface ConnectorConstructor {
  host: string;
  port: number;
  database?: string;
  user?: string;
  password?: string;
}

export default Connector;

Agora temos duas interfaces, sendo que as classe que implementam a ReadOnlyConnector não são obrigadas a implementar métodos de escrita, como incrementCount , clearCount e firstCount , respeitando assim o ISP.


## Usando herança

Já que precisaremos criar a ReadOnlyRedisConnector , vamos aproveitar o conceito de herança para reutilizar um pouco de código?

Crie o arquivo src/Connectors/redis/ReadOnlyRedisConnector.ts , e a princípio vamos mover nosso conteúdo da classe RedisConnector pra lá. A nova estrutura fica assim:

**touch src/Connectors/redis/ReadOnlyRedisConnector.ts**

Projeto
|   docker-compose.yml
|   package-lock.json
|   package.json
|   
\---src
    |   index.ts
    |   
    \---Connectors
        |   Connector.ts
        |   index.ts
        |   
        +---mysql
        |       MySQLConnector.ts
        |       
        \---redis
                ReadOnlyRedisConnector.ts    <- Novo arquivo
                RedisConnector.ts

Em seguida, modificamos a interface que esta classe nova implementa de Connector para ReadOnlyConnector , e removemos os métodos que ficam sobrando:

// ./src/Connectors/redis/ReadOnlyRedisConnector.ts

import redis, { RedisClient } from 'redis';
import { ReadOnlyConnector, ConnectorConstructor } from '../Connector';

export default class ReadOnlyRedisConnector implements ReadOnlyConnector {
  protected client: RedisClient;

  constructor(config: ConnectorConstructor) {
    this.client = redis.createClient(config);
    return this;
  }

  public async getCount(token: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.client.get(token, (error, reply) => {
        if (error) reject(error);
        else resolve(parseInt(reply as string, 10));
      });
    });
  }

  public closeConnection(): void {
    this.client.quit();
  }
}

E em seguida modificamos a classe RedisConnector para estender a ReadOnlyRedisConnector :

// ./src/Connectors/redis/RedisConnector.ts

import Connector from '../Connector';
import ReadOnlyRedisConnector from './ReadOnlyRedisConnector';

export default class RedisConnector extends ReadOnlyRedisConnector implements Connector {

  public incrementCount(token: string): void {
    this.client.incr(token);
  }

  public clearCount(token: string): void {
    this.client.set(token, '0');
  }

  public firstCount = this.clearCount;
}


Para dar o toque final, exportamos corretamente nossa nova classe e nossa nova interface no src/Connectors/index.ts :



// ./src/Connectors/index.ts

import Connector, { ReadOnlyConnector, ConnectorConstructor } from "./Connector";
import MySQLConnector from "./mysql/MySQLConnector";
import ReadOnlyRedisConnector from "./redis/ReadOnlyRedisConnector";
import RedisConnector from "./redis/RedisConnector";

export default Connector;
export {
  Connector,
  ConnectorConstructor,
  MySQLConnector,
  RedisConnector,
  ReadOnlyRedisConnector,
  ReadOnlyConnector
};


Com isso, você já pode usar tranquilamente sua classe nova sem se preocupar com escritas acidentais. Para rodar o código abaixo o banco Redis, tem que estar com o token já cadastrado, como foi feito nos passos anteriores:


// ./src/index.ts

import { ReadOnlyConnector, ReadOnlyRedisConnector } from "./Connectors";

const token = 'ce42033d-9133-457a-a1a1-41ac0b63a333';
const conn = new ReadOnlyRedisConnector({
  host: 'redisdb',
  port: 6379});

const main = async (connector: ReadOnlyConnector) => {
  const count = await connector.getCount(token);
  try {
    console.log(count);
  } catch (err) {
    console.error(err);
  }
}

main(conn);

## Aproveitando o LSP
Perceba que se você passar um objeto instância da RedisConnector para a main que espera um ReadOnlyConnector você não recebe nenhum erro, visto que RedisConnector é "subclasse" de ReadOnlyConnector (sim, é uma interface, mas você entendeu), fazendo com que o princípio de substituição de Liskov seja mantido.

Outro ponto bom de RedisConnector herdar de ReadOnlyRedisConnector (ao invés de ser uma cópia com mais métodos) é que havendo necessidade de modificar alguma coisa no método getCount , por exemplo, você só precisa modificar um arquivo: o ReadOnlyRedisConnector.ts , e a mudança automaticamente passa para a classe RedisConnector .

## ISP Conclusão

O ISP garante que cada classe tenha que implementar somente métodos que de fato ela vai precisar, deixando para outras a tarefa de implementar métodos adicionais. Isso colabora também com o SRP visto ontem.

Como você pode perceber, os princípios SOLID são altamente ligados e coesos, e implementar um muitas vezes implica em implementar outro.

Ao implementar os 5, você passa a ter códigos mais fáceis de entender, de manter e de escalar, e é por isso que as empresas adoram pessoas desenvolvedoras que os saibam 😄.

## Para Fixar
Analisando o código abaixo, o que deve ser modificado para que ele compreenda tanto o LSP (Liskov Substitution Principle, princípio de Substituição de Liskov) quanto ISP (Interface Segregation Principle, Princípio da Segregação de Interface)?

class Passenger {
  constructor (public nome:string, public cpf:number) { }
}

class ShippedItem {
  constructor (public nome:string, public id:number, public customerID:string) { }
}

class Flight {
  constructor (public num:number, public passengers:Passenger[]) { }

  Add(newPassenger:Passenger): void {
    this.passengers.push(newPassenger); 
  }

  Remove(removedPassenger: Passenger): void {
    const index = this.passengers.indexOf(removedPassenger, 0);
    if (index > -1) {
      this.passengers.splice(index, 1);
    }
  }
}

class Company {
  constructor (public nome:string, public flights:Flight[]) { }
  NewFlight(flightNum: number): void{ }
  AddToFlight(flightNum: number, passenger: Passenger): void { }
  RemoveFromFlight(flightNum: number, passenger: Passenger): void { }
}

class TravelingCompany extends Company {
  NewFlight(flightNum: number): void{
    const newFlight = new Flight(flightNum, []);
    this.flights.push(newFlight);
  }
  AddToFlight(flightNum: number, passenger: Passenger): void {
    const currentFlight = this.flights.find((f) => f.num == flightNum);
    if (currentFlight) {
      currentFlight.Add(passenger);
    }
  }
  RemoveFromFlight(flightNum: number, passenger: Passenger): void {
    const currentFlight = this.flights.find((f) => f.num == flightNum);
    if (currentFlight) {
      currentFlight.Remove(passenger);
    }
  }
}

class ShippingCompany extends Company {
  NewFlight(flightNum: number): void{
    const newFlight = new Flight(flightNum, []);
    this.flights.push(newFlight);
  }

  AddToFlight(flightNum:number, item:ShippedItem | Passenger): void {
    const currentFlight = this.flights.find((f) => f.num == flightNum);
    if (currentFlight) {
      currentFlight.Add(item);
    }
  }
}