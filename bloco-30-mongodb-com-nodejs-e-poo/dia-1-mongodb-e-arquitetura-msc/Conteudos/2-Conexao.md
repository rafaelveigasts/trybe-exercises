## Criando uma conexão no mongoDB com o Mongoose

Antes de começarmos a escrever nosso código, precisamos instalar o Mongoose no nosso projeto utilizando o npm:

npm install mongoose

Agora sim podemos ir ao código!

Para fazer uma conexão ao MongoDB usando o Mongoose, basta usar o método connect() , importado de mongoose , passando a URI (Uniform Resource Identifier) do banco que vamos nos conectar.

import { connect } from 'mongoose';

connect('mongodb://localhost:27017/meu_data_base');

Dica: Se a conexão falhar em sua máquina, tente usar 127.0.0.1 em vez de localhost .

Parabéns, agora você já sabe como se conectar ao MongoDB com o Mongoose !

Brincadeira! Rsrs

Se conectar ao MongoDB com o Mongoose é bem simples e você ainda pode fazer configurações para criar uma conexão do seu jeito.

Vamos ver algumas configurações de conexão com o Mongoose.

user / pass - O login e senha para autenticação. Essas opções específicas do Mongoose são equivalentes aos drivers auth.username e auth.password do MongoDB, você pode passar esses parâmetros tanto pela URI quanto pela option .

Exemplo com URI:

connect('mongodb://username:password@host:port/meu_data_base', options);
Exemplo com option :

connect('mongodb://localhost:27017/meu_data_base', { user: 'user', pass: 'password' });

Mas cuidado : se for passar esses parâmetros pela option , use variáveis de ambiente para camuflar seu usuário e senha.

autoIndex - Por padrão, o Mongoose construirá automaticamente os índices definidos em seu schema quando se conectar. Isso é ótimo para desenvolvimento, mas não é ideal para grandes implantações de produção porque as compilações de índice podem causar prejuízos do desempenho. Se você definir autoIndex como false , o Mongoose não criará índices automaticamente para nenhum modelo associado a essa conexão.

dbName - Especifica a qual banco de dados se conectar e substitui qualquer banco de dados especificado na cadeia de conexão. Isso é útil se você não puder especificar um banco de dados padrão na cadeia de conexão, como em algumas mongodb+srv (exemplo: 'mongodb://localhost:27017/meu_data_base') conexões de sintaxe.

Para esse exemplo, vamos utilizar a base de dados seguinte:

Certifique-se de ter o MongoDB instalado na sua máquina. Consulte a documentação do MongoDB acerca disso se precisar.

Abra o console do MongoDB e execute o código abaixo para popular o banco:

use model_example

db.books.insertMany([
    { "title": "A Game of Thrones", "author": "George R. R. Martin" },
  { "title": "A Clash of Kings", "author": "George R. R. Martin" },
  { "title": "A Storm of Swords", "author": "George R. R. Martin" },
  { "title": "The Lord of The Rings - The Fellowship of the Ring", "author": "J. R. R. Tolkien" },
  { "title": "The Lord of The Rings - The Two Towers", "author": "J. R. R. Tolkien" },
  { "title": "The Lord of The Rings - The Return of The King", "author": "J. R. R. Tolkien" },
  { "title": "Foundation", "author": "Isaac Asimov" }
])

Agora veja como ficaria uma configuração completa:

const options = {
  user: 'user', // Usuário do banco de dados.
  pass: 'password' // senha do usuário do banco de dados.
  autoIndex: false, // Não cria index para cada inserção de dado no banco.
  dbName: 'model_example', // Define qual banco de dados vou utilizar.
};

connect('mongodb://localhost:27017/', options);
