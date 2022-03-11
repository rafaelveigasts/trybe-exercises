## Liskov Substitution Principle

O Princípio de Substituição de Liskov diz que:
Objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa.

Isso quer dizer que se você possui uma superclasse A e uma subclasse B , onde quer que A seja esperada, se B for passada seu programa deve se comportar da mesma forma.

Podemos estender isso para uma interface (já que uma interface pode ser vista como uma classe abstrata com todos os métodos e elementos públicos, e nenhum método implementado): se A é uma interface, e B é uma classe que implementa A , onde quer que seja esperada algo do tipo A , se B for passada seu programa deve se comportar da mesma forma.

Se uma terceira classe, a C , herda de A também, onde A é esperada podemos colocar tanto B quanto C .

## Princípio da Responsabilidade Única - SRP

Primeiramente vamos aplicar o já conhecido SRP, de forma a garantir que cada classe tenha seu lar, assegurando a responsabilidade única dos arquivos.

Crie uma pasta chamada Connectors/ dentro da pasta src e, dentro dela, crie o arquivo src/Connectors/Connector.ts , que irá conter nossas interfaces, bem como o arquivo src/Connectors/index.ts para centralizar nossas exportações.

**mkdir src/Connectors && touch src/Connectors/index.ts src/Connectors/Connector.ts**

Crie também as pastas src/Connectors/mysql/ e src/Connectors/redis/ , bem como os arquivos src/Connectors/mysql/MySQLConnector.ts e src/Connectors/redis/RedisConnector.ts .

**mkdir -p src/Connectors/mysql src/Connectors/redis/ && touch src/Connectors/mysql/MySQLConnector.ts src/Connectors/redis/RedisConnector.ts**

O arquivo src/Connectors/mysql/MySQLConnector.ts é o antigo arquivo src/Connector.ts , então você pode simplesmente renomeá-lo e colocá-lo nesta pasta correta ou copiar seu conteúdo para o arquivo no diretório novo e apagá-lo.

## As interfaces

Vamos extrair os métodos importantes da nossa atual MySQLConnector em uma interface, e agrupar junto com a já existente ConnectorConstructor no seu devido lugar:

// .src/Connectors/Connector.ts

export interface Connector {
  getCount(token: string): number | Promise<number>;

  incrementCount(token: string): void;
  
  closeConnection(): void;

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


## Usando as interfaces nas classes

Agora é bem simples: criamos a classe RedisConnector que implementa a interface Connector (bem como fazemos a MySQLConnector implementar a Connector também).

Em seguida mudamos nosso index.ts para realizar as importações pertinentes, e utilizar a interface Connector como tipo da variável connector .

A estrutura do projeto está assim:

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
                RedisConnector.ts



Mais código = menos confusão:



// ./src/Connectors/redis/RedisConnector.ts

import redis, { RedisClient } from 'redis';
import Connector, { ConnectorConstructor } from '../Connector';

export default class RedisConnector implements Connector {

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

  public incrementCount(token: string): void {
    this.client.incr(token);
  }

  public clearCount(token: string): void {
    this.client.set(token, '0');
  }

  public firstCount = this.clearCount;
}




// ./src/Connectors/mysql/MySQLConnector.ts

import mysql, { Connection } from 'mysql';
import Connector, { ConnectorConstructor } from '../Connector';

export default class MySQLConnector implements Connector {
  private connection: Connection;

  constructor(config: ConnectorConstructor) {
    this.connection = mysql.createConnection({ ...config, database: undefined });
    this.connection.connect();
    const queries = [
      `CREATE DATABASE IF NOT EXISTS ${config.database};`,
      `USE ${config.database};`,
      'CREATE TABLE IF NOT EXISTS counter (token CHAR(36) UNIQUE, count INT);',
    ];
    queries.forEach((query) => this.connection.query(query));
  }

  public async getCount(token: string): Promise<number> {
    const query = `SELECT count FROM counter WHERE token='${token}';`;

    return new Promise((resolve, reject) => {
      this.connection.query(query, (error, results) => {
        if (error) return reject(error);

        let result = parseInt(results[0].count, 10);
        result = Number.isNaN(result) ? 0 : result;
        resolve(result);
      });
    });
  }

  public incrementCount(token: string): void {
    this.connection.query(`UPDATE counter SET count = count + 1 WHERE token='${token}';`);
  }

  private async updateCount(token: string, value: number) {
    this.connection.query(`UPDATE counter SET count=${value} WHERE token='${token}';`);
  }

  public clearCount(token: string): void {
    this.updateCount(token, 0);
  }

  public firstCount(token: string): void {
    this.connection.query(`INSERT IGNORE INTO counter VALUES('${token}', 0);`);
  }

  public closeConnection(): void {
    this.connection.end();
  }
}





// ./src/Connectors/index.ts

import Connector, { ConnectorConstructor } from "./Connector";
import MySQLConnector from "./mysql/MySQLConnector";
import RedisConnector from "./redis/RedisConnector";

export default Connector;
export {
  Connector,
  ConnectorConstructor,
  MySQLConnector,
  RedisConnector
};





// ./src/index.ts

import { Connector, RedisConnector } from "./Connectors";

const token = 'ce42033d-9133-457a-a1a1-41ac0b63a333';
const conn = new RedisConnector({
  host: 'redisdb',
  port: 6379});

// O resto do index.ts continua igualzinho 😎


## LSP Conclusão

Felicidades: agora você já tem sua superclasse (neste caso uma interface) Connector , e como MySQLConnector e RedisConnector estendem (neste caso, implementam) Connector , você pode tranquilamente passar qualquer uma dessas duas onde Connector seja esperada.

Algumas considerações sobre o LSP:

A ideia principal é que você deve manter a assinatura dos métodos das subclasses idênticos aos da superclasse (o TypeScript já te obriga a isto, mas existem linguagens que não o fazem).

Os métodos implementados nas subclasses devem possuir a mesma assinatura e a mesma semântica , ou seja, devem fazer a mesma coisa. É importante ressaltar isso, pois nada te impede de manter a assinatura, mas utilizar os dados para fazer algo completamente diferente, o que semanticamente quebra o princípio.

As validações dos dados necessários para o correto funcionamento do método criado na subclasse não devem ser mais estritas. Ex: Imagine que RedisConnector.incrementCount faça uma verificação do tamanho do token antes de prosseguir. Como essa verificação não existe e não é esperada em Connector , pode ser que dê algum erro em algum lugar onde Connector era esperada e RedisConnector foi passada, o que fere o princípio.

Por último, mas não menos importante, é bom lembrar que é só um princípio, e não uma lei. Use conforme a necessidade 😉.
