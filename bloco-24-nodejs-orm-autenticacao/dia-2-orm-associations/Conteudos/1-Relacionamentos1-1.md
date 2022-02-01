## Relacionamentos 1:1

Antes de começar, analise o diagrama abaixo. Esse será o banco de dados que utilizaremos no primeiro exemplo.

<img src ='diagrama1.png' />

Podemos notar que existem duas tabelas nesse banco, Employees e Addresses . Cada employee possui um address , assim como cada address pertence a um employee .

Vamos criar um novo projeto para demonstrar esse exemplo. No dia anterior você viu todos os comandos que vamos utilizar, mas vamos relembrá-los.

Primeiro, abra seu terminal, depois crie um diretório, acesse-o e rode os comandos abaixo:

npm init -y

npm i express nodemon sequelize mysql2

npm i sequelize-cli

npx sequelize-cli init

Agora, realize as configurações necessárias no arquivo config/config.json , para fazer o exemplo, você utilizará a chave development , então altere os valores dessa chave caso necessário, os valores são:

  *Username* da sua instalação do MySQL.
  
  *Senha* da sua instalação do MySQL.
  
  *Database* , que é o nome do schema que será criado, em nosso exemplo, iremos utilizar associations .
  
  *Host* é o IP do seu servidor, no nosso caso, iremos manter 127.0.0.1 .
  
  *Dialect* que é o tipo de banco SQL que será utilizado (exemplos são: MySQL, MariaDB, PostgreSQL e outros). Vamos utilizar MySQL , então manteremos a opção que vem por padrão.

Após configurar o seu config.json , precisamos criar o schema que irá conter as nossas tabelas, para fazer isso, utilize o comando abaixo. O schema será criado com o nome que digitamos na chave development.database do config.json :

**npx sequelize db:create**

Agora vamos criar as migrations e para criar a migration que será responsável pela tabela Employees , basta utilizar o comando:

**npx sequelize migration:generate --name create-employees**

Abra a migration e adicione o seguinte código:

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'first_name',
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'last_name',
      },
      age: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('Employees');
  },
};

Agora vamos criar a migration responsável pela tabela Addresses utilizando o comando:

**npx sequelize migration:generate --name create-addresses**

Abra a migration e adicione o seguinte código:

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      city: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      street: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      number: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'employee_id',
        references: {
          model: 'Employees',
          key: 'id',
        },
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('Addresses');
  },
};