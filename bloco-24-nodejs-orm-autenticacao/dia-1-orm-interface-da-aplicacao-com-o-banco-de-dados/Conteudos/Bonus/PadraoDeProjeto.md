## Padrões de Projeto

Esta seção mostrará alguns padrões que ajudarão no processo de organização e construção de uma aplicação.

### Nomenclatura

No decorrer do conteúdo, pode-se perceber que durante as criação das tabelas (em migrations), as colunas createdAt e updatedAt estão em Camel Case , ou seja, seguem o formato que escrevemos em JavaScript , porém, a nomenclatura utilizada pelo MySQL segue o formato Snake Case , logo teríamos que declarar estas duas colunas no seguinte formato created_at e updated_at . Então basta mudarmos o nome das colunas em migrations? Sim, mas não iremos alterar o nome das nossas chaves, permaneceremos com createdAt e updatedAt . O que faremos, será adicionar o field na nossa declaração, para resolvermos esse impasse. Segue o formato que ficará nossa migration e seed:

  migrations/[timestamp]-create-user.js

// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER,
//       },
//       fullName: {
//         type: Sequelize.STRING,
//       },
//       email: {
//         type: Sequelize.STRING,
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
           field: 'created_at', // a coluna será criada no banco com este nome
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE,
           field: 'updated_at', // a coluna será criada no banco com este nome
//       }
//     });
//   },

//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('Users');
//   }
// };

  seeders/[timestamp]-users.js

module.exports = {
//   up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
//     [
//       {
//         fullName: 'Leonardo',
//         email: 'leo@test.com',
           // com a mudança no nome das colunas, precisamos colocar no seed o formato correspondente a este novo nome
           created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
           updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
//       },
//       {
//         fullName: 'JEduardo',
//         email: 'edu@test.com',
           created_at: Sequelize.literal('CURRENT_TIMESTAMP'),
           updated_at: Sequelize.literal('CURRENT_TIMESTAMP'),
//       },
//     ], {}),

//   down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
// };

Após serem feitas essas mudanças, 2 erros aparecerão:

O primeiro erro será de coluna desconhecida relacionada a createdAt , isso ocorre, pelo fato de createdAt e updatedAt serem colunas criadas por padrão, ou seja, a aplicação tentará retornar estas colunas, mas como fizemos a alteração para usar Snake Case , estas colunas não foram criadas, gerando assim o erro. Segue abaixo o erro:

Unknown column 'createdAt' in 'field list'

O segundo erro será relacionado a tabela não encontrada, quando você fizer uma requisição, o sequelize tentará fazer por padrão uma busca com o database orm_example e a tabela users , perceba que criamos uma tabela Users com U maiúsculo, dessa forma temos um problema na nossa pesquisa. Segue abaixo o erro:

Table 'orm_example.users' doesn't exist

Para resolvermos estes problemas, iremos acrescentar uma configuração no nosso model :

*underscored* : Este campo nos ajudará a resolver o primeiro problema, ele fará com que parâmetros recebidos em Camel Case , sejam convertidos em Snake Case , quando for feita uma consulta a respectiva tabela.

*tableName* : Este campo nos ajudará a resolver o segundo problema, aqui podemos declarar explicitamente, qual o nome da tabela que estamos referenciando, retirando assim a responsabilidade do Sequelize de nomear a tabela.
Porém, como isso ficará no model . Confira o exemplo abaixo:

// const User = (sequelize, DataTypes) => {
//   const User = sequelize.define('User', {
//     fullName: DataTypes.STRING,
//     email: DataTypes.STRING,
       phoneNum: DataTypes.STRING,
//   },
     {
       underscored: true,
       tableName: 'Users',
     });

//   return User;
// };

// module.exports = User;

Outro exemplo que pode ser usado para deixar mais explícito o que o underscored faz, é modificarmos a requisição com o método POST do userController.js para receber no corpo da requisição, além de fullName e email , o parâmetro phoneNum . Depois disso, modifique no model a chave phone_num para phoneNum . Agora faça uma requisição e confira que você consegue fazer novos cadastros, apesar da diferença entre a declaração feita no model e a coluna que foi criado no banco de dados.

### .sequelizerc

Até agora, estávamos criando as pastas de migrations , models , seeders ou config na raiz da aplicação, porém, caso estas pastas estivessem, por exemplo, em uma pasta src e usássemos algum comando do Sequelize que utilizasse algum destes arquivos, seria gerado um erro, pois estes arquivo seriam procurados somente na camada em que estivéssemos executando esse comando.

Podemos, entrar na pasta src e executar estes comandos, que teremos êxito, mas caso fosse uma aplicação maior, com mais camadas, aumentaríamos a complexidade de subir e configurar a aplicação. É neste momento que entra em cena o .sequelizerc . É um arquivo de configuração, que podemos utilizar caso desejamos substituir o caminho padrão das pastas migrations , models , seeders ou config . Dessa forma, podemos construir um código com uma arquitetura mais organizada.
Para configurar este arquivo, primeiramente crie um arquivo com o nome .sequelizerc na raiz da aplicação com o seguinte conteúdo:

const path = require('path');

module.exports = {
  'config': path.resolve('src', 'config', 'config.json'),
  'models-path': path.resolve('src', 'models'),
  'seeders-path': path.resolve('src', 'seeders'),
  'migrations-path': path.resolve('src', 'migrations'),
};

Vamos entender melhor as informações que tem neste arquivo:
path : É um módulo interno do Node que nos fornece alguns utilitários para trabalharmos com caminhos de arquivos e diretórios;

*config* : Caminho para o arquivo de configuração;
*models-path* : Caminho para o diretório de models ;
*seeders-path* : Caminho para o diretório de seeders ;
*migrations-path* : Caminho para o diretório de migrations .
