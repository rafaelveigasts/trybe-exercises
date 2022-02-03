## Preparando o ambiente

### Baixando o repositório base

Chega de teoria e vamos ver como podemos fazer isso na prática.

Vamos utilizar o mesmo projeto do conteúdo sobre JWT . Para isso, podemos baixar o repositório com o código base já com o JWT implementado, conforme fizemos na aula, neste link . Caso já tenha esse projeto clonado na sua máquina, crie uma nova branch tests , para aplicarmos o conteúdo de hoje!*

* Você também pode consultar o gabarito do dia , que está disponível neste link https://github.com/tryber/nodejs-jwt-base-project/tree/block-24-4 , na branch para block-24-4 .

## Estruturação e instalação dos pacotes necessários

Após clonar o projeto e criar sua branch, adicione na raiz do projeto, uma nova pasta tests , aqui você deve ter uma estrutura parecida com essa:

.
├── api
│   └── *
├── assets
│   └── *
├── config
│   └── *
├── controllers
│   └── *
├── migrations
│   └── *
├── models
│   └── *
├── node_modules
│   └── *
├── package.json
├── package-lock.json
├── README.md
├── seeders
│   └── *
└── tests

Em seguida, faça a instalação dos pacotes que já conhecemos anteriormente, para utilizarmos em ambiente de desenvolvimento, para realizarmos testes:

**npm i -D mocha chai sinon**

Aqui, também é necessário a inicialização de um script de testes no package.json :

...
"scripts": {
    ...
    "test": "mocha ./tests/**/*$NAME*.test.js --exit",
},
...
