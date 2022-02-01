## Migrações

Uma migration é uma forma de versionar o schema do banco de dados, ou seja, cada migration conterá um pedaço de código que representa, no conjunto, todas as alterações feitas no histórico do nosso banco de dados.

Imagine assim: você escreve um código definindo como um banco de dados deve ser criado, e esse código fica salvo num arquivo na pasta migrations . Após um tempo, uma atualização é feita, e uma coluna é acrescentada em uma tabela. O que você faz? Escreve em outro arquivo o código para acrescentar essa coluna. Cada arquivo é marcado com uma estampa datetime , então ao longo do tempo esse código, que é mantido no controle de versão do git, vai empilhando dezenas, às vezes centenas de arquivos, e cada um marca uma versão do banco de dados e o seu histórico de mudanças e evoluções. Quem clona um projeto pela primeira vez roda suas migrations para configurar, sem ter que fazer mais nada, o banco de dados no formato mais recente enviado para master . Aí é possível trabalhar localmente no banco de dados da aplicação sem medo de ele ser diferente da versão mais nova que encontramos em master .

Usando migrations, o mapeador objeto-relacional sabe exatamente quais alterações executar no banco de dados, tanto para criar algo novo quanto para restaurar o banco para uma versão mais antiga. Além disso, uma migration tem dois códigos conhecidos como Up e Down . Ou seja: toda migration, além de saber o que fazer para executar as mudanças no banco de dados ( **Up** ), também deve saber como reverter essas mudanças ( **Down** ). Isso significa que as migrations têm o poder de avançar ou reverter o seu banco de dados para qualquer um dos estados que ele já teve.

Chega de explicações! Vamos ver em código como fazemos uma migration. Antes de começarmos a falar de migrations, nós criamos o banco de dados, fizemos sua conexão com a nossa aplicação, instalamos o CLI, criamos o nosso model e já geramos um arquivo XXXXXXXXXXXXXX-create-user.js ! Agora, podemos seguir em frente e configurar nossa primeira migration para criar a tabela Users .

Ao abrir o arquivo, você já irá se deparar com a estrutura correta de uma migration. O conteúdo do arquivo deve ser parecido com isso:

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};

Iremos mexer apenas dentro das funções up e down , como dito anteriormente. Reparem que ambas as funções recebem dois parâmetros: um é o queryInterface , e o outro é o Sequelize . Ambos os parâmetros são objetos que armazenam dados e operações. O queryInterface é usado pelo sequelize para modificar o banco de dados, seguindo o "dialeto" do banco que estamos utilizando. O objeto Sequelize armazena os tipos de dados disponíveis no contexto do banco, por exemplo varchar , string , integer , date etc.

No código acima, a migration da tabela Users foi criada automaticamente quando o seu model foi criado. Perceba que os campos id , fullName , createdAt e updatedAt já foram adicionados na migration pelo próprio Sequelize, o que facilita bastante o nosso trabalho!

Caso seja necessário desfazer essa operação, o código irá apenas apagar a tabela. Assim escrevemos uma migration perfeitamente reversível!

Com a migration criada, devemos adicionar o que ela de fato irá fazer, tanto na execução ( up ), quanto na reversão ( down ). Atenção! Se o código da migration contiver erros, as suas migrations podem não executar direito nos processos de criar ou desfazer uma nova versão do banco. É preciso ter bastante cuidado na hora de mexer no código de uma migration.

Como fizemos no model, vamos adicionar uma coluna de email na migration da tabela Users .

'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        type: Sequelize.STRING
      },
      // adicionamos um novo campo 'email' como foi feito no model !
      email: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};

Com a migration criada, basta executarmos pelo CLI:

**npx sequelize db:migrate**

Caso queira reverter uma migration:

**npx sequelize db:migrate:undo**

Teste os dois comandos para analisar o funcionamento! É seu exercício de fixação! Experimente, também, usar os comandos que aprendemos para criar uma nova migração reversível. Rode-as, reverta-as, brinque com as migrations. Assim você começará a dominá-las! 💥

### Criando uma nova migration para alterar uma tabela já existente

Imagine agora com base no modelo *User* se for preciso salvar o telefone do usuário, o que pode vir a mente é que basta adicionar o novo atributo no modelo e na migration como fizemos com o atributo email , correto?

*Errado* , essa é uma prática que não é escalável, pela seguinte situação, imagine que foi feito um deploy do seu código e a migration foi usado para criar o banco em ambiente de produção, você teria que rodar o comando db:migrate:undo e recriar o banco para executar o comando db:migrate para recriar uma tabela, qual o problema disso? Ao rodar o undo você perdeu todos os dados salvos anteriormente na tabela, e isso é a coisa que jamais você deve fazer.

Então, como seria a forma correta de adicionar uma nova coluna em uma tabela já existente?

Criar uma nova migration que permita alterar a tabela, e para isso o objeto *queryInterface* possui funções específicas que permitem criar uma nova coluna, remover uma coluna ou mesmo mudar o tipo de uma coluna que já existe. Nesse caso, o queryInterface abstrai o que a função *ALTER TABLE* faz no SQL, como aprendemos no conteúdo sobre estrutura de banco de dados.

Se você quiser criar uma outra migration para adicionar a coluna phone_num na sua tabela Users , você pode criar um novo arquivo com o comando:

npx sequelize migration:generate --name add-column-phone-table-users

Um novo arquivo XXXXXXXXXXXXXX-add-column-phone-table-users.js será criado na pasta migration contendo o seguinte código:

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};

Esse código representa o esqueleto da migration que foi criada. Assim Podemos inserir a função queryInterface.addColumn() no escopo Up para adicionar uma nova coluna a nossa tabela Users , e adicionar a função queryInterface.removeColumn() no escopo Down para remover a nova coluna da tabela.

Fica assim:

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.addColumn('Users', 'phone_num', {
     type: Sequelize.STRING,
   });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'phone_num');
  }
};

Em seguida rodamos o comando para executar a nossa nova migration:

**npx sequelize db:migrate**

E alteramos o model user.js para incluir a nova coluna phone_num :

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
  fullName: DataTypes.STRING,
  email: DataTypes.STRING,
  // aqui inserimos o datatype da coluna criada
  phone_num: DataTypes.STRING,
  });

  return User;
}

E pronto! Conseguimos criar uma migration para adição da coluna phone_num na tabela Users . Desta maneira, se outra pessoa for alterar este projeto em outro computador, ela pode executar as migrations e atualizar o banco de dados local com as modificações feitas por você!

Além de adicionar ou remover colunas, o objeto queryInterface também permite que você altere a estrutura de uma coluna como seu tipo, valor default entre outros detalhes assim como o ALTER TABLE também permite. Você pode consultar esse link da documentação do Sequelize https://sequelize.org/master/manual/query-interface.html para ver como utilizar esse recurso.

Agora, vamos aprender a popular nosso banco de dados utilizando o *Seeders* .
