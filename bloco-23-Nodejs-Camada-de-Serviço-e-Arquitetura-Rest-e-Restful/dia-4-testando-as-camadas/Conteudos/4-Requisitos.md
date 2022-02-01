## Requisitos

Para o exemplo dessa aula desenvolveremos uma API utilizando os padrões REST e MSC. Essa API deverá permitir a realização de inserção e consulta de filmes no banco de dados.

De maneira detalhada temos os seguintes requisitos:

1) A API deverá permitir a inserção de filmes no banco de dados:
1.1) Ela deve receber e registrar as seguintes informações do filme: Nome , Direção e Ano de lançamento ;
1.2) Ao realizar a inserção de um novo filme, o endpoint deverá responder com o respectivo ID ;

2) A API deverá permitir a consulta de todos os filmes:

2.1) A consulta deve retornar uma matriz com todos os detalhes dos filmes;

Antes de começarmos, vamos estruturar uma API de exemplo utilizando o modelo MSC com boas práticas, nesse caso, dividindo as entidades por seus papéis técnicos , como visto em 24.2 - Arquitetura de Software - Camada de Controller e Service :


└── controllers
│   └── movieController.js
└── services
│   └── movieService.js
└── models
│   └── movieModel.js
└── tests
│   ├── controllers
│   │   └── movieController.test.js
│   ├── services
│   │   └── movieService.test.js
│   └── models
│       └── movieModel.test.js
└── index.js

Perceba que criamos um arquivo de teste para a entidade movie para cada camada do MSC. Dessa forma, conseguiremos testar unitariamente cada uma.
Na raiz do projeto vamos iniciar o npm :

npm init -y

E então, instalar as dependências para nossa API. Iremos utilizar o express , body-parser e o mysql2 :

npm install express body-parser mysql2
Vamos instalar também as nossa dependências de desenvolvimento, por enquanto sabemos que iremos utilizar a stack de testes vista anteriormente com mocha , chai e sinon :

npm install -D mocha chai sinon

Por último, vamos adicionar o script de teste no package.json .

Habitualmente, podemos executar todos os testes contidos numa pasta utilizando o comando mocha <suaPastaDeTestes> --recursive , assim como podemos também definir um padrão de arquivos de teste, como mocha .<suaPastaDeTestes>/**/*.test.js , que executará todos os arquivos com final test.js dentro da sua pasta de testes.

Para esse dia, vamos utilizar um pequeno artifício com o intuito de facilitar a execução de testes específicos. Nesse caso, utilizaremos o comando mocha ./tests/**/*$NAME*.test.js :

...
  "scripts": {
    "test": "mocha ./tests/**/*$NAME*.test.js --exit"
  },
...

O --exit força o encerramento do processo do mocha ao final dos testes

Dessa forma, podemos executar o comando npm test para validar todos os nossos testes, ou, utilizar uma variável de ambiente NAME para definir um arquivo específico: NAME=nomeDoArquivo npm test .

Tudo pronto, vamos aos códigos!
