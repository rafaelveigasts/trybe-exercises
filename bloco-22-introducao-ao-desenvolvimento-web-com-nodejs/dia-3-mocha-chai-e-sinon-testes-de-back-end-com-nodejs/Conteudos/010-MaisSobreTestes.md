## Um pouco mais de testes

Até agora, você viu como transformar requisitos em testes, como escrevê-los com ajuda do mocha e do chai e o que é TDD. Vamos fazer mais um exemplo juntos utilizando tudo isso:

Escreveremos uma função que lê o conteúdo de um arquivo. Essa função:

- Receberá um parâmetro com o nome do arquivo a ser lido. Esse arquivo deverá estar na pasta io-files ;

- Caso o arquivo solicitado exista, responderá uma string com o conteúdo do arquivo;

- Caso o arquivo solicitado não exista, deverá responder null .

Seguindo o TDD, vamos começar estruturando os testes com o mocha e com o chai . Antes de mais nada, vamos criar um novo diretório raiz para receber o nosso pacote node e instalar nossas ferramentas de testes:

mkdir examples2

cd examples2

mkdir io-test && cd io-test # Criando e entrando no diretório do nosso projeto

npm init # Iniciando o npm

npm install --save-dev mocha chai # Instalando as ferramentas de testes

Agora basta adicionar o seguinte script em seu package.json :
io-test/package.json


{
  //
  "scripts": {
    "start": "node index.js",
    "test": "mocha test.js"
  },
  //
}