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