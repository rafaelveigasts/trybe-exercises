## NPM

O NPM (sigla para Node Package Manager ) é, como dito no tópico anterior, o repositório oficial para publicação de pacotes Node.js. É para ele que realizamos upload dos arquivos de nosso pacote quando queremos disponibilizá-lo para uso de outras pessoas ou em diversos projetos. Atualmente, uma média de 659 pacotes são publicados no NPM todos os dias, segundo o site ModuleCounts.com

Um pacote é um conjunto de arquivos que exportam um ou mais módulos Node. Nem todo pacote Node é uma biblioteca, visto que uma API desenvolvida em Node também tem um pacote.

Você entenderá mais sobre o que compõe um pacote mais à frente.

### Utilizando o CLI npm

O CLI do npm é uma ferramenta oficial que nos auxilia no gerenciamento de pacotes, sejam eles dependências da nossa aplicação ou nossos próprios pacotes. É através dele que criamos um projeto, instalamos e removemos pacotes, publicamos e gerenciamos versões dos nossos próprios pacotes. Publicar um pacote público no npm é gratuito e não há um limite de pacotes que se pode publicar. Existem, no entanto, taxas de assinaturas, caso desejemos hospedar pacotes de forma privada, ou seja, pacotes sob os quais só nós temos o controle de acesso.

Como você pode ver no vídeo, o npm nos provê alguns comandos importantes, vários dos quais já temos usado há bastante tempo no curso! Você terá acesso ao Cheat Sheet dos comandos neste repositório https://github.com/tryber/Trybe-CheatSheets/blob/master/backend/nodejs/npm/README.md para consultas rápidas. No entanto, vamos passar por alguns deles para uma explicação mais aprofundada:

### npm init

O comando npm init nos permite criar, de forma rápida e simplificada, um novo pacote Node.js na pasta onde é executado.
Ao ser executado, o comando pede para quem executou algumas informações sobre o pacote como nome, versão, nome das pessoas autoras e afins. Caso desejemos utilizar as respostas padrão para todas essas perguntas, podemos utilizar o comando com a flag -y , ou seja, npm init -y ; dessa forma, nenhuma pergunta será feita, e a inicialização será realizada com os valores padrão.

Para criar um novo pacote Node.js, o npm init simplesmente cria um arquivo chamado package.json com as respostas das perguntas realizadas e mais alguns campos de metadados. Para o Node.js, qualquer pasta contendo um arquivo package.json válido é um pacote.

Dentro do package.json é onde podemos realizar algumas configurações importantes para o nosso pacote como nome, versão, dependências e scripts .

Falando em scripts, vejamos um pouco mais sobre eles:

### npm run

O comando run faz com que o npm execute um determinado script configurado no package.json . Scripts são "atalhos" que podemos definir para executar determinadas tarefas relacionadas ao pacote atual.

Para criar um script, precisamos alterar o package.json e adicionar uma nova chave ao objeto scripts . O valor dessa chave deve ser o comando que desejamos que seja executado quando chamarmos aquele script.

Por exemplo, para ter um script chamado lint que execute a ferramenta de linter que usamos aqui na Trybe, o ESLint, nossa chave scripts fica assim:

{
  "scripts": {
    "lint": "eslint ."
  }
}

Perceba que lint é o nome do script que digitamos no terminal para executar o ESLint na pasta atual.

Agora, com um script criado, podemos utilizar o comando npm run <nome do script> para executá-lo. No nosso caso, o nome do script é lint , então o comando completo fica assim:

npm run lint

Você pode criar quantos scripts quiser, para realizar quais tarefas quiser. Inclusive, pode criar scripts que chamam outros scripts, criando assim "pipelines". Esse tipo de coisa é muito útil, por exemplo, quando trabalhamos supersets do JavaScript como o TypeScript , ou transpiladores como o Babel , pois ambos exigem que executemos comandos adicionais antes de iniciar nossos pacotes.

Agora que vimos o que são scripts, vamos falar de um script especial: o start . Esse script é especial pois é utilizado por um comando do npm diferente do npm run : o npm start . Entenda sobre ele a seguir:

### npm start

O comando npm start age como um "atalho" para o comando npm run start , uma vez que sua função é executar o script start definido no package.json .

Como convenção, todo pacote que pode ser executado pelo terminal (como CLIs, APIs e afins) deve ter um script start com o comando necessário para executar a aplicação principal daquele pacote.

Por exemplo, se tivermos um pacote que calcula o IMC (Índice de Massa Corporal) de uma pessoa cujo código está no arquivo imc.js , é comum criarmos o seguinte script:

{
  // ...
  "scripts": {
    "start": "node imc.js"
  }
  // ...
}

Dessa forma, qualquer pessoa que for utilizar seu script vai ter certeza de como inicializá-lo, pois só vai precisar executar npm start .

### npm install

Você provavelmente já utilizou esse comando durante o módulo de Front-End. Ele é o responsável por baixar e instalar pacotes Node.js do NPM para o nosso pacote, e existem algumas formas de usá-lo:

npm install <nome do pacote> : Baixa o pacote do registro do NPM e o adiciona ao objeto dependencies do package.json

npm install -D <nome do pacote> : É semelhante ao comando anterior. Baixa o pacote do registro do NPM, porém o adiciona ao objeto devDependencies do package.json , indicando que o pacote em questão não é necessário para executar a aplicação, mas é necessário para desenvolvimento, ou seja, para alterar o código daquela aplicação. Isso é muito útil ao colocar a aplicação no ar, pois pacotes marcados como devDependencies podem ser ignorados, já que vamos apenas executar a aplicação, e não modificá-la.

npm install : Baixa e instala todos os pacotes listados nos objetos de dependencies e devDependencies do package.json . Sempre deve ser executado ao clonar o repositório de um pacote para garantir que todas as dependências desse pacote estão instaladas.


Ufa! Até aqui, foi bastante informação, né? Antes de prosseguir, dê uma pausa, pegue (ou reabasteça) sua substância energizante preferida (Cafézinho ☕? Energético ⚡? Água 🥤? Você que manda 😄), respire e, depois, continue a leitura.

Não se preocupe se não estiver decorando tudo. Você vai exercitar muito todos esses conceitos ao longo do restante do módulo de Back-End 😉.
