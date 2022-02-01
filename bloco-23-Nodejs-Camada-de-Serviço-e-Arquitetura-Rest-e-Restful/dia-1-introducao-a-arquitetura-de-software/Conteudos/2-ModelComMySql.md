## Model com MySQL

### Criando e populando o banco de dados

Antes de mais nada, precisamos ter o MySQL instalado e configurado na nossa máquina. Se precisar, consulte o conteúdo sobre MySQL para fazer a instalação.

Para utilizar o MySQL , precisamos primeiramente criar nosso banco de dados, que será chamado model_example . Por enquanto, só teremos a tabela authors , com informações de pessoas escritoras. A tabela terá as seguintes colunas:

- Nome. Obrigatório;
- Nome do meio. Opcional;
- Sobrenome. Obrigatório;
- Data de nascimento. Opcional;
- Nacionalidade. Opcional;

Agora, utilizando o MySQL Workbench ou o console do MySQL, execute o script SQL abaixo para criar o banco, a tabela e popular o banco com nosso dados iniciais:

Agora, utilizando o MySQL Workbench ou o console do MySQL, execute o script SQL abaixo para criar o banco, a tabela e popular o banco com nosso dados iniciais:

    CREATE DATABASE IF NOT EXISTS model_example;

    USE model_example;

    CREATE TABLE authors
    (
        id INT NOT NULL AUTO_INCREMENT,
        first_name VARCHAR(30) NOT NULL,
        middle_name VARCHAR(30),
        last_name VARCHAR(30) NOT NULL,
        birthday DATE,
        nationality VARCHAR(100),
        PRIMARY KEY(id)
    );

    INSERT INTO authors (first_name,middle_name,last_name,birthday,nationality)

    VALUES ('George','R. R.','Martin','1948-09-20','norte-americano'),
        ('J.','R. R.','Tolkien','1892-01-03','britânico'),
        ('Isaac',NULL,'Asimov','1920-01-20','russo-americano'),
        ('Frank',NULL,'Herbert','1920-02-11','norte-americano'),
        ('Júlio',NULL,'Verne','1905-03-24','francês');

Assista o vídeo abaixo para ver como criar a conexão com o MySQL e como utilizar para criar uma listagem de pessoas autoras.

1- npm init -y 
2- npm i mysql2 
3- npm i express body-parser
4- npm i nodemon -D
5- criar o diretório models
6- criar o arquivo connections.js
7- importar o mysql2/promise
8- instanciar o objeto connection/cretePool com user, password, host, database
9- exportar o objeto connection
10- criar o arquivo relacionado as queries > author.js

Caso prefira, leia os dois próximos tópicos para criar o começo da aplicação.

### Estabelecendo uma conexão com o banco

Com o banco criado e populado, vamos criar nosso projeto Node.js.

Comece criando uma nova pasta para conter o projeto. Dê o nome que você quiser a ela, mas aqui vamos chamá-la de model-example :

    mkdir model-example
    cd model-example

Agora, iniciamos um novo projeto Node.js, passando a flag -y para pular as perguntas e gerar um projeto com as opções padrão:

    npm init -y

Para que possamos dar continuidade, precisamos antes de mais nada, criar um servidor utilizando a biblioteca express , ela vai nos fornecer o que precisamos para rodar um servidor, criar rotas e utilizar nossa conexão com o banco. Instale o express rodando o comando abaixo:

    npm install express

Agora, na raiz do projeto, crie um arquivo chamado index.js e preencha-o com o código abaixo:

    // index.js

    const express = require('express');

    const app = express();

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Ouvindo a porta ${PORT}`);
    });

Em index.js , importamos o express e iniciamos uma nova aplicação. Porém, para que possamos nos comunicar com o MySQL, precisamos de um driver . Um driver é um software que permite que você se comunique com o banco de dados a partir de uma aplicação. Qual driver usar depende tanto da linguagem quanto do banco de dados que você está utilizando. Aqui na Trybe, você vai utilizar o drive chamado mysql2 . Instale-o executando o comando abaixo:

    npm install mysql2

Agora, na raiz do projeto crie uma pasta models e, dentro dela, crie um arquivo connection.js e preencha-o com o código abaixo. Lembre-se de substituir os campos user e password pelo usuário e senha que você utiliza para acessar o banco:

    // models/connection.js

    const mysql = require('mysql2/promise');

    const connection = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'senha123',
        database: 'model_example' });

    module.exports = connection;

Primeiro, importamos o mysql do módulo mysql2/promise , assim utilizamos a versão mais atualizada do mysql2 em vez de usar a versão com callbacks.
O método createPool cria uma pool de conexões com o banco de dados. Isso significa que a própria biblioteca irá gerenciar as múltiplas conexões que fizermos com o banco. O createPool recebe um objeto com as credenciais necessárias para estabelecer a conexão. Entre as opções possíveis, estão:

host : local onde o servidor do MySQL está armazenado. Como estamos executando localmente, usamos localhost ;

user : usuário que vamos utilizar para acessar o banco. Estamos usando o usuário root nesse exemplo;

password : senha do usuário especificado. Coloque '' se não houver senha para o usuário;

database : nome do banco com o qual queremos nos conectar;

O método createPool retorna um objeto Pool representando uma sessão com o banco.

Para não ser necessário criar uma sessão e selecionar o schema sempre que precisarmos acessar o banco, armazenamos nossa pool na variável connection .
