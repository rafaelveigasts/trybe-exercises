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
