## Reestruturando a aplicação
Criando uma conexão com o banco
Agora vamos estabelecer uma conexão com o servidor do MongoDB. Para isso, vamos criar o arquivo connection , dentro da pasta models e inserir o código:



// models/connection.ts

import mongoose from 'mongoose';

const connection = (mongoDatabaseURI = 'mongodb://localhost:/model_example') =>
  mongoose.connect(mongoDatabaseURI);

export default connection;



Um ponto importante de destacar no código acima, é que estamos utilizando um padrão conhecido como singleton . Em resumo, um singleton é um objeto ou módulo que, mesmo que chamado várias vezes, só vai ser criado uma vez.

Isso garante que, durante todo o ciclo de vida da nossa aplicação, só iremos abrir uma conexão com o banco.
Essa conexão está sendo chamada no arquivo app.ts .


## Populando o banco

Antes de iniciarmos, certifique-se de ter o MongoDB instalado na sua máquina. Caso não tenha, consulte o conteúdo sobre MongoDB ou use uma imagem docker do MongoDB, utilizando o comando 

*docker run --name mongo-crud -d -p 27017:27017 -e AUTH=no mongo* .


Abra o console do MongoDB local ou via Docker com 

*docker exec -it mongo-crud mongo* 

e execute o código abaixo para popular o banco:

use model_example
db.books.insertMany([
  { title: 'The Dispossessed', author: 'Ursula K. Le Guin', publishedYear: 1974 },
  { title: 'I Am Legend', author: 'Richard Matheson', publishedYear: 1954, weight: '6.4 ounces'  },
  { title: 'The Road', author: 'Cormac McCarthy', publishedYear: 2006 },
  { title: 'Foundation', author: 'Isaac Asimov' },
  { title: '2001: A Space Odyssey', author: 'Arthur C. Clarke', weight: '5.4 ounces' },
]);

Prontinho, agora que já temos um banco populado, podemos iniciar de fato nossas alterações na aplicação. 🤘
