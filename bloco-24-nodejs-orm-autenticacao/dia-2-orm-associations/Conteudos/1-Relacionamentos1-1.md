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
