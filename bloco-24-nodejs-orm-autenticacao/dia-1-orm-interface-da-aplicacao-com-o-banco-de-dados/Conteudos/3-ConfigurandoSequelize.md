## Configurando o Sequelize

Instalar Sequelize
Para começar, vamos iniciar uma aplicação Node.js e instalar o Sequelize:

mkdir app-with-sequelize && cd app-with-sequelize

npm init -y

npm install sequelize

*Atenção!* Vá fazendo cada passo junto conosco, são seus exercícios de fixação.

O primeiro passo para utilizar o sequelize é instalar um CLI que é responsável por gerar e executar as operações. Além de instalar o CLI, precisamos instalar também o mysql2 , uma dependência necessária para usarmos o MySQL juntamente com o sequelize.

npm install sequelize-cli

npm install mysql2

### Inicializar o Sequelize

Depois que instalamos o CLI, precisamos iniciar um projeto com sequelize. Para isso, vamos executar o seguinte comando dentro da pasta raiz:

npx sequelize-cli init

Esse comando irá criar as seguintes pastas:

*config :* contém um arquivo de configuração, que "fala" para o CLI como conectar-se com o nosso banco de dados;

*models :* contém todos os modelos da nossa aplicação;

*migrations :* contém todos os arquivos de migração da nossa aplicação;

*seeders :* contém todos os arquivos de "seeds".

### Conectando ao banco

Agora só nos resta configurar o arquivo config.json gerado pelo init do CLI. Ao alterar esse arquivo, estamos configurando o acesso da aplicação ao nosso banco de dados. Vamos modificar somente o objeto development , não vamos nos preocupar com os demais:

config/config.json

{
  "development": {
    "username": "root",
    "password": "",
    "database": "orm_example",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }

  // No resto do arquivo você vai encontrar as convenções para conectar o Sequelize em outros ambientes
}

*Nota :* se necessário, troque o usuário e a senha do exemplo pelos seus.

Vamos entender melhor as informações que estamos passando:

*Usuário* de acesso ao banco de dados;
*Senha* de acesso ao banco de dados;
*Nome* do banco de dados no qual queremos conectar;
*Host* que estamos conectando - por ser local, utilizamos o 127.0.0.1 ;
*Dialect* é, nada mais nada menos, qual banco estamos utilizando. Dito isso, passamos "mysql".

Vale lembrar que passar as credenciais dessa forma não é uma boa prática, pois nossos dados de acesso ao banco de dados ficam totalmente visíveis para qualquer pessoa que tenha acesso ao código da nossa aplicação. Mais a frente trataremos essa aplicação, para que seja utilizada usando variáveis de ambiente.

### Criando o banco usando o CLI do Sequelize

Agora que iniciamos uma aplicação do sequelize, podemos criar o banco de dados orm_example que nomeamos no arquivo config.json através deste comando:

**npx sequelize db:create**

No seu terminal, o sequelize irá te avisar que o database foi criado, e se você quiser verificar no próprio mysql, rode os seguintes comandos:

**mysql -u root -p**

Digite a sua senha de acesso ao mysql e em seguida rode o comando:

**show databases;**

Confira que o banco orm_example foi criado e você não precisou escrever uma linha de SQL para isso, essa é uma das primeiras vantagens que o Sequelize nos oferece.

Curiosidade : Hoje o Sequelize suporta os bancos MySQL , MariaDB , PostgreSQL , SQLite e Microsoft SQL Server .
