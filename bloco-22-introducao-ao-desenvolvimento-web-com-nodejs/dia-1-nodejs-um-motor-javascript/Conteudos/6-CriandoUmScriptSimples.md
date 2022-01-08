## Criando um script simples

Agora que chegamos até aqui, vamos criar o famoso Hello World em Node.js. Vem com a gente!

### Criando o pacote Node.js

Vamos começar criando uma nova pasta, chamada hello-world , onde colaremos nosso código.

Uma vez dentro dessa pasta, execute o comando npm init . Deixe todas as perguntas com o valor padrão, a não ser o nome da pessoa autora ( author: ), onde você colocará seu nome.

Pronto! Nosso pacote está criado. Abra a pasta hello-world no VSCode e vamos começar a criar nosso script.

### Criando o código do Hello, world!

Dentro da pasta hello-world , crie um arquivo chamado index.js . Por padrão, esse é o arquivo principal de qualquer aplicação Node.js, e é comum darmos esse nome ao arquivo que deve ser executado para iniciar nosso programa. Sendo assim, por convenção, todo pacote Node.js deve ter um arquivo index.js , salvo exceções, que devem ser documentadas no README do repositório.
Dentro do index.js , adicione o seguinte código:

console.log('Hello, world!');

E pronto, nosso script de "Hello, world!" está criado! Mas nosso pacote ainda não está pronto. Vamos criar um script start para estarmos aderentes às convenções do Node.js.

### Criando o script start

Como você viu anteriormente, para criar um script, precisamos alterar o package.json da nossa aplicação. Sendo assim, abra o package.json da pasta hello-world e altere a linha destacada para criar o script start dessa forma:

// {
//   "name": "hello-world",
//   "version": "1.0.0",
//   "description": "",
//   "main": "index.js",
//   "scripts": {
//     "test": "echo \"Error: no test specified\" && exit 1",
       "start": "node index.js"
//   },
//   "author": "Seu nome",
//   "license": "ISC"
// }

### Executando o script

Agora que temos tudo criado e configurado, chegou a hora de executar nosso Hello, world! Para isso, navegue até a pasta hello-world no terminal e execute npm start .

E pronto! Temos nosso primeiro "Hello, world!" sendo executado com Node.js!

Mas, cá entre nós, essa coisa de "Hello, world!" simples já tá um pouco batida, né? 😝
Vamos, então, dar uma incrementada nesse script, adicionando o nome e sobrenome da pessoa que chamou nosso script!

### Lendo input do terminal

Para podermos ler o nome e sobrenome da pessoa que executou o script, vamos utilizar um pacote de terceiros: o readline-sync .

Por tratar-se de um módulo de terceiros, precisamos primeiro instalar o readline-sync pra podermos utilizá-lo no código.

Para fazer isso, basta executarmos, dentro da pasta hello-world , o comando npm i readline-sync . A letra i aqui é um atalho para install . Ela também funciona com a flag -D para devDependencies , e sem parâmetro nenhum, para instalar as dependências listadas no package.json .

Uma vez instalado o pacote, podemos utilizá-lo em nosso script. Para isso, precisamos, primeiro, importá-lo:

const readline = require('readline-sync');

// console.log('Hello, world!');

Perceba que, apesar do pacote chamar-se readline-sync , podemos dar qualquer nome para a const que usamos para importá-lo.

Agora, com o pacote em mãos, podemos utilizar as funções question e questionInt disponibilizadas por ele para perguntar à pessoa usuária seu nome e idade:

// const readline = require('readline-sync');

const name = readline.question('Qual seu nome? ');
const age = readline.questionInt('Qual sua idade? ');

// console.log('Hello, world!');

A função question interpreta a resposta como uma string comum, ao passo que a função questionInt converte a resposta para número utilizando o parseInt e retorna um erro caso a pessoa tente inserir algo que não seja um número válido.

Pronto, o próximo e último passo é utilizarmos essas novas variáveis para compor nossa mensagem de olá.

// const readline = require('readline-sync');

// const name = readline.question('What is your name? ');
// const age = readline.questionInt('How old are you? ');

console.log(`Hello, ${name}! You are ${age} years old!`);

E, agora, se executarmos novamente, veremos o resultado: perguntamos qual o nome e idade da pessoa e, depois, exibimos uma mensagem personalizada.

Execute novamente o script com npm start para vê-lo em ação!
