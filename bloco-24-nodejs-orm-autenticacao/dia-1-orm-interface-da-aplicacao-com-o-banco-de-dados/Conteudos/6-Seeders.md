## Seeders

Agora que sabemos de um jeito seguro de criar e recriar um banco de dados, além de acrescentar/excluir tabelas e colunas, nós entramos numa outra etapa. Pense, agora, que toda vez que executamos as migrations, nosso banco de dados é criado do zero, ou seja, sem informações dentro das tabelas.

Vamos supor que estamos trabalhando num projeto que é um e-commerce. Acabamos de entrar nesse projeto e estamos montando nosso ambiente. Executamos as migrations e nosso banco de dados foi criado. Em seguida, executamos o projeto localmente. Quando entramos na home do site não existe nenhum produto, nenhuma categoria, nenhuma marca, nenhum usuário cadastrado e por aí vai.

Os seeders chegam pra resolver problemas como esse! As bibliotecas de mapeamento objeto-relacional permitem que controlemos informações que devem ser criadas assim que nosso banco de dados/tabelas forem criadas. Ou seja, podemos configurar nosso banco para ser automaticamente *criado e povoado!*

No exemplo do e-commerce acima, poderíamos criar seeds responsáveis por gerar informações de produtos, marcas, categorias e etc. toda vez que um banco de dados fosse criado. Com isso, sempre que criássemos o banco de dados do zero e executássemos o projeto, teríamos um e-commerce com as informações básicas para que fosse possível navegar. Isso é especialmente útil quando, num contexto de testes automatizados, precisamos criar um banco e povoar com dados para testá-los! Aprenderemos sobre isso mais adiante nesse bloco.

Conclusão: um seeder é usado para, basicamente, alimentar o banco de dados com informações necessárias para o funcionamento mínimo da aplicação. Bom, vamos ver agora um pouco da prática de como fazer isso em código. Os seeds seguem a mesma linha das migrations.

Primeiramente vamos precisar executar pelo CLI a criação de um novo seed:

**npx sequelize seed:generate --name users**

Reparem que o arquivo foi criado dentro da pasta seeders com o mesmo formato de um arquivo de uma migration. Agora, devemos adicionar, ao arquivo criado, quais informações aquele seed irá gerar. O código abaixo irá adicionar dois usuários ao banco de dados:

  seeders/[timestamp]-users.js

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => queryInterface.bulkInsert('Users',
    [
      {
        fullName: 'Leonardo',
        email: 'leo@test.com',
        // usamos a função CURRENT_TIMESTAMP do SQL para salvar a data e hora atual nos campos `createdAt` e `updatedAt`
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      {
        fullName: 'JEduardo',
        email: 'edu@test.com',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    ], {}),

  down: async (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

Na função acima, estamos utilizando o parâmetro recebido pela função queryInterface para conversar com o banco de dados. Dessa forma conseguimos inserir os dados que queremos. Estamos adicionando os dados, que estão na estrutura de uma array de objetos, na tabela Users . O queryInterface tem a função bulkInsert , a qual estamos utilizando, que insere múltiplos dados na tabela.

Note que o seed segue o mesmo princípio de up e down , ou seja, devemos colocar, também, o que o seed deve fazer caso precise reverter a operação. Aqui, também, um código ruim pode quebrar o fluxo de uso/reversão dos seeds, então escreva com atenção! Para executar o seed, basta rodarmos o comando:

**npx sequelize db:seed:all**

E para reverter:

**npx sequelize db:seed:undo:all**

Teste os dois comandos para analisar o funcionamento! Povoe a outra tabela que você criou no exemplo anterior com alguns seeds. Rode-os e reverta-os! 💥
