## Exemplo do dia

### Contextualizando o exemplo

O seu time de desenvolvimento está trabalhando em um software que controla os acessos à API do seu serviço. Para validar todas as requisições recebidas de clientes, é utilizado um token de acesso, enviado pelo front .

Sua empresa cobra clientes por número de requisições, então você precisará registrar em um banco de dados a quantidade de vezes que um determinado token foi utilizado para acessar o serviço.

A infraestrutura utiliza um servidor MySQL, cuja implementação será apresentada logo adiante, e até então tudo funciona muito bem. Mas logo, logo será necessário utilizar um banco em memória, o redis .

Bom, vamos começar inicializando a arquitetura do nosso sistema.

**package.json**

{
  "name": "solid-2",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "npx ts-node src"
  },
  "license": "ISC",
  "devDependencies": {
    "@types/mysql": "^2.15.19",
    "@types/redis": "^2.8.32"
  },
  "dependencies": {
    "ts-node": "^10.2.1",
    "mysql": "^2.18.1",
    "redis": "^3.1.2",
    "typescript": "^4.4.3"
  }
}


**docker-compose.yml**

version: '3.1'

services:
  mysqldb:
    image: mysql:8.0.26
    container_name: solid_mysqldb_container
    command: --default-authentication-plugin=mysql_native_password
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: example
    networks: 
      - net1

  redisdb:
    image: redis:6.2.5
    container_name: solid_redisdb_container
    restart: always
    networks: 
      - net2

  solid_node_service:
    image: node:14.17.6
    container_name: solid_node_container
    command: npm install
    working_dir: /home/app
    volumes:
      - ./:/home/app
    networks: 
      - net1
      - net2

networks: 
  net1:
  net2:

Abrindo a pasta no VS Code , dê uma lida nos arquivos para entender o que acabou de ser criado. Em seguida, rode os comandos a seguir para iniciar os serviços e acessá-los:

**sudo docker-compose up -d** , para iniciar os serviços dos bancos MySQL e Redis, bem como iniciar o serviço do Node e instalar nele as dependências;

**sudo docker-compose run solid_node_service bash** , para iniciar o bash no serviço do Node;

Em seguida, crie a pasta src e, dentro dela, arquivos index.ts e Connector.ts :


**mkdir src && touch src/index.ts src/Connector.ts**

O arquivo Connector.ts possui uma classe que se conecta ao banco MySQL e possui alguns métodos. Veja abaixo o conteúdo do arquivo:

// ./src/Connector.ts
import mysql, { Connection } from 'mysql';

interface ConnectorConstructor {
  host: string;
  port: number;
  database?: string;
  user?: string;
  password?: string;
}

export default class MySQLConnector {
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

E aqui o nosso arquivo index.ts :

// ./src/index.ts
import Connector from './Connector';

const token = 'ce42033d-9133-457a-a1a1-41ac0b63a333';
const conn = new Connector({
  host: 'mysqldb',
  port: 3306,
  database: 'counter',
  user: 'root',
  password: 'example'});

const main = (connector: Connector) => {
  connector.firstCount(token);

  const logCount = async () => {
    try {
      const count = await connector.getCount(token);
      console.log(count);
    } catch (err) {
      console.error(err);
    }
  };

  const doSomeIncrements = () => {
    logCount();
    connector.incrementCount(token);
    connector.incrementCount(token);
    connector.incrementCount(token);
  };

  const incrementsInterval = setInterval(doSomeIncrements, 500);

  setTimeout(() => {
    clearInterval(incrementsInterval);
    logCount();
    connector.clearCount(token);
    connector.closeConnection();
  }, 5500);
};

main(conn);

/*
Saída:
0
3
6
9
12
15
18
21
24
27
30
*/

Para testar, rode o comando npx ts-node src no terminal bash do container .

O index.ts simula algumas requisições que incrementam a quantidade de acessos à API utilizando o token especificado, por meio da função doSomeIncrements . No começo de cada lote de requisições, ele loga a contagem atual com a função logCount . Observe que a função doSomeIncrements é chamada a cada 500 milissegundos por 10 vezes, graças ao laço for . Por fim, é feito um log do último valor e, em seguida, o contador é limpo e a conexão é encerrada.

## O problema do MySQL

Até então, você possui o arquivo Connector.ts que atende bem as suas necessidades.

Entretanto, cada vez mais clientes acessam sua API, e o banco SQL não consegue mais dar conta de tantos acessos, devido à sua baixa velocidade.

A chefia te avisa pra resolver esse problema recriando a estrutura do banco com o Redis . Vamos ver como o Princípio de Substituição de Liskov (ou LSK) nos ajuda com isso?
