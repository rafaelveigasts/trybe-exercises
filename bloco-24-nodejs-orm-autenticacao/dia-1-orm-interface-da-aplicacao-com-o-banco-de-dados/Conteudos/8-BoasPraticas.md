## Boas Práticas

Quando criamos o nosso arquivo config.json dentro da pasta config , vimos que as informações sensíveis, como credenciais de acesso ao banco de dados, estavam todas expostas no nosso código. 😱

Só fizemos isso para fins didáticos. Como vocês já sabem, uma ótima prática é usar variáveis de ambiente para controlar coisas relacionadas à configuração geral da aplicação. Então, bora fazer isso!
Iremos fazer a instalação do pacote dotenv :

  npm install dotenv

Mudaremos o nome do nosso arquivo config.json para config.js
Retiraremos todo o conteúdo de config.js e substituiremos pelo código abaixo:

require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};

Note que, como estamos em um exercício de desenvolvimento, estamos assumindo que os três ambientes vão utilizar o banco de dados local do seu computador; Em aplicações mais complexas, no entanto, é importante que você utilize bancos de dados e configurações diferentes para cada ambiente.

Crie o arquivo .env na raiz da sua aplicação e preencha as variáveis com as suas credenciais para acessar o MySQL.

MYSQL_USER=root
MYSQL_PASSWORD=senha_mysql
MYSQL_DATABASE=orm_example
HOSTNAME=localhost

Modifique a linha 8 do arquivo models/index.js para apontar para o arquivo config.js :

const config = require(__dirname + '/../config/config.json')[env]; // configuração antiga
const config = require(__dirname + '/../config/config.js')[env];   // configuração nova
