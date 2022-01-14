## Nodemon

Uma vez que nossa API está rodando e fazemos modificações no seu código é preciso parar e reiniciar a aplicação executando novamente o node index.js . Faça um teste: Deixe sua aplicação rodando e modifique o código da rota /hello para ficar assim:

function handleHelloWorldRequest(req, res) {
  res.status(200).send('Olá mundo!');
}

Abra o navegador e faça uma requisição novamente para a URL http://localhost:3001/hello. Você vai perceber que o código continua retornando a mensagem 'Hello World!' . Para que a mudança seja aplicada você deve parar a aplicação (CTRL+c) e iniciar a aplicação novamente. É bem trabalhoso ter que fazer isso sempre que mudarmos qualquer coisa no nosso código, não é mesmo?

Para facilitar nosso fluxo de desenvolvimento podemos utilizar um pacote chamado Nodemon que reinicia a aplicação toda vez que editamos e salvamos os nossos arquivos. Para utilizar esse pacote, vamos começar instalando ele na nossa aplicação.

npm i nodemon -D

Observe que passamos o parâmetro -D que indica ao npm que esse pacote deve ser instalado como uma dependência de desenvolvimento. Por enquanto, não precisamos nos preocupar com o que isso significa. Para poder automatizar o uso do nodemon, vamos abrir nosso arquivo package.json e adicionar a seguinte linha:

//...
// "scripts": {
//    "test": "echo \"Error: no test specified\" && exit 1",
        "dev": "nodemon index.js"
//  },
// ...

Agora, para executarmos nossa aplicação, vamos utilizar o seguinte comando:

npm run dev

Pronto, agora sempre que fizermos qualquer alteração no nosso código e salvarmos o arquivo, o Nodemon automaticamente reinicia a aplicação para aplicar as modificações. Faça alguns testes mudando a mensagem retornada e fazendo uma nova requisição para a URL que fizemos.

⚠️ Atenção ⚠️ Apesar de ser uma ferramenta muito útil para desenvolvimento, o Nodemon não deve ser utilizado para rodar a aplicação, pois caso seja disponibilizada para a pessoa usuária final (ou seja, em produção), podemos ter problemas de reinicialização da aplicação, devido ao fato de que qualquer alteração em qualquer arquivo afete a aplicação, fazendo com que toda ela seja reiniciada. Para executar uma aplicação em produção , deve-se utilizar o script start com o comando node index.js .

Agora, podemos partir de cabeça para entender como criar uma API utilizando o Express.

