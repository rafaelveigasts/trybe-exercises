## Agora, a prática!

Agora que você já sabe como construir uma API utilizando POO, TypeScript e MongoDB , vamos aplicar os conhecimentos adquiridos hoje na criação de uma aplicação para uma loja de discos, a qual chamaremos de TrybeStore .

TrybeStore é uma loja que vende artigos como: discos de vinil, CDs, DVDs e até Camisetas de bandas, legal não?!

Ao final, é esperado que nossa aplicação seja capaz de criar de um artigo, buscar um ou mais artigos, atualizar e deletar um artigo.

Em suma, um CRUD completo e funcional. Para dar mais contexto sobre o que é esperado nos exercícios a seguir, vamos através do terminal interativo do mongo, criar o primeiro artigo da TrybeStore.
Ao entrar no terminal do mongo, o primeiro passo é criarmos o nosso banco de dados.
Executando o comando a seguir:

 use TrybeStore

O segundo passo é criarmos a nossa Collection, a qual chamaremos de RecordStore .

 db.createCollection("RecordStore")

Feito isso, é chegada a hora de popularmos o nosso banco com o nosso primeiro artigo.

db.RecordStore.insertOne({
 "artist": "Mamonas Assassinas",
 "title": "Pelados em Santos",
 "format": "CD",
 "yearPublished": 1995,
 "new": false
})

Pronto, fazendo uma busca geral dentro da collection RecordStore .

 db.RecordStore.find().pretty()

Podemos verificar que nossa criação foi concluída corretamente e que há somente um objeto criado em nossa collection. O resultado será algo similar ao seguinte:

{
 "_id" : ObjectId("6227e1e03a6b7165c92f00ee"),
 "artist" : "Mamonas Assassinas",
 "title" : "Pelados em Santos",
 "format" : "CD",
 "yearPublished" : 1995,
 "new" : false
}

Perfeito! Agora que temos uma visão geral sobre o que é esperado do nosso banco de dados. Partiremos para construção da nossa aplicação, não se preocupe se algo ficou pouco nítido, vamos aquecer os motores e ir devagar em baby steps, se sentir dificuldade volte e veja o conteúdo novamente, consulte a documentação do Mongoose e lembre-se, conte sempre com o apoio do time de instrução durante o processo.

Exercício 1 : Para dar início a nossa API, dentro de um diretório Models , crie uma conexão com o banco de dados MongoDB, utilizando o Mongoose.

Exercício 2 : Você já viu como construir uma interface usando zod . Agora, utilizando essa lib, crie uma interface para a collection RecordStore e a partir dela crie um Type.

DICA Use a função object do Zod para a construção da interface e a função infer para criar o Type.

A interface RecordStore deverá conter os mesmos atributos que usamos para criar nosso primeiro documento da coleção RecordStore: artist , title , format , yearPublished e new .

Exercício 3 : A utilização de interfaces em aplicações nos oferece vantagens no processo de desenvolvimento, principalmente por trazerem uma diretriz sobre o que obrigatoriamente iremos implementar. Nesse sentido, com base no que é esperado de nossa aplicação, necessitamos criar uma interface para traçar as funcionalidades da que iremos implementar, correto?

Dito isso, retorne ao diretório Models do exercício 1 e crie uma interface genérica para a camada Model .

A interface Model deverá conter os métodos create , readOne , read , update e delete .

Exercício 4 : A camada Models , precisa ser capaz de realizar operações em nosso banco, certo? Até agora, temos a interface, um "contrato" sobre o que a nossa camada model deverá fazer. É chegada a hora de avançarmos na construção da nossa aplicação e dar poder a nossa model , de forma a servi-la com as funções do Mongoose. Crie uma classe abstrata MongoModel que implemente os métodos da interface model .

O método update , a ser implementado pela classe MongoModel deverá alterar o campo new para false de todos os artigos correspondentes ao formato 'CD' lançados até o ano de 1997.

Exercício 5 : Neste momento, a camada de modelo está praticamente finalizada. Entretanto, note que nossa aplicação ainda não definiu uma collection para o banco de dados. Sendo assim, ainda em nosso diretório Models , crie as seguintes estruturas:

Crie uma interface RecordStoreDocument a partir do Type RecordStore e Document do Mongoose ;

Crie um Schema a partir da interface RecordStoreDocument ;

A partir da classe abstrata MongoModel crie uma classe RecordStoreModel que seja capaz de criar a collection RecordStore ;

Exercício 6 : Abra um diretório Services e faça os passos a seguir:

Crie um novo arquivo e nele construa uma classe abstrata Service genérica e implemente os métodos CRUD de forma genérica.

A partir da classe abstrata Service do tipo RecordStore , crie uma classe RecordStoreService genérica, recebendo como parâmetro RecordStoreModel do tipo RecordStore ;

A classe RecordStoreService , deve implementar apenas os métodos que precisam de validação e tratamento de erros do zod .

Exercício 7 : Chegando a reta final na contrução de nossa arquitetura MSC. Até agora temos, a camada Models, pronta e se comunicando com a camada de serviço, essa por sua vez está lidando com as validações dos campos através do Zod. Os campos que Service irá validar serão os vindos das requisições. Para tal, precisamos implementar nossa camada de Controller, de modo a tornar nossa aplicação apta a receber requisições. Abra um diretório Controller e faça os passos a seguir:

Crie um novo arquivo e nele construa uma classe abstrata Controller genérica e implemente os métodos CRUD de forma genérica. Sinta-se a vontade para tipar as mensagens que irão ser incorporadas nos métodos em caso de erro;

A partir da classe abstrata Controller do tipo RecordStore , crie uma classe RecordStoreController .

A classe RecordStoreController deve receber como parâmetro a classe RecordStoreService e um atributo representando a rota base da aplicação: /store e implemente os métodos de CRUD ;

Exercício 8 : Com a camada de controller concluída. Em um novo arquivo, crie uma classe para abrigar os endpoints da nossa aplicação.

A classe deverá conter um método contendo todas as rotas com base nas funcionalidades esperadas para a nossa aplicação;

Exercício 9 : Neste momento, a nossa aplicação possui todas as camadas implementadas e prontas. Contudo, precisamos de duas peças finais para ver tudo funcionando.

Crie uma classe App

A classe App deverá ser capaz de:

Subir o servidor local escutando na porta 3001 ;

Estabelecer a conexão com o banco de dados;

Servir os endPoints criados no exercicio anterior para servidor local ( DICA Use a função use do Express );

Exercício 10 : Na raiz da diretório src , crie um novo arquivo chamado index.ts e execute os passos a seguir:

Instâncie a classe App ;

Instâncie a classe RecordStoreController ;

Instancie a classe CustomRouter ;

Invoque a funcão addRouter ;

Invoque a funcão startServer ;
