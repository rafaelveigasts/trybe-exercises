## Criando uma aplicação com Express

Para começar a ter um gostinho do que é programar utilizando o Express, vamos criar o clássico "Hello, world!". Para isso, crie uma pasta chamada hello-express e, dentro dela, inicialize um novo pacote Node.js utilizando o npm.

mkdir hello-express
cd hello-express
npm init -y

Agora, instale o Express e crie um arquivo index.js . Como qualquer aplicação Node.js, nossa API precisa de um entrypoint, ou seja, um ponto de partida. Por convenção, vamos utilizar o index.js .

npm i express
touch index.js

Pronto, você já tem o que é necessário para criar sua primeira API HTTP com o Express. Vamos ao código!

Preencha o arquivo index.js com o seguinte conteúdo:

const express = require('express');

const app = express(); // 1

app.get('/hello', handleHelloWorldRequest); // 2

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
}); // 3

function handleHelloWorldRequest(req, res) {
  res.status(200).send('Hello World!'); // 4
}


Criar uma nova aplicação Express;

- Dizer ao Express que, quando uma requisição com método GET for recebida no caminho /hello , a função handleHelloWorldRequest deve ser chamada;

- Pedir ao Express que crie um servidor HTTP e escute por requisições na porta 3001;

- Ao tratar uma requisição com método GET no caminho /hello , enviar o status HTTP 200 que significa OK e a mensagem "Hello world!".

- Para iniciar a aplicação, execute o comando abaixo no diretório da aplicação.

node index.js

Agora, vá até o seu navegador (pode ser o Chrome) e abra a url http://localhost:3001/hello . Parabéns, você criou sua primeira aplicação node com Express.

Você vai perceber que diferente dos scripts que desenvolvemos até aqui que executavam e acabavam quando chegava ao final do script nossa aplicação vai ficar executando ad eternum . Para parar a aplicação pressione CTRL+C no seu terminal.

Assista ao vídeo abaixo que consolida tudo que vimos até agora para criar uma aplicação com Express ou caso preferir passe para a próxima seção.