/*
Promises

As promises se comportam de forma muito parecida com as funções que já conhecemos, mas existem 3 pontos de destaque das Promises em relação à outras funções:

As Promises são assíncronas , ou seja, elas tem um espaço especial para sua execução sem que travem o fluxo de outras funções.

As Promises têm "superpoderes", isto é, funções extras que facilitam o controle do fluxo assíncrono.

As Promises são construídas de um forma distinta: para criar uma nova Promise, usamos um Construtor .

Agora que você já tem uma noção básica do que esperar, vamos passo-a-passo construindo uma Promise para que você entenda cada tijolinho que forma nossa superfunção. Vamos lá?!
*/

// Construtor
// Em seu editor, crie um novo arquivo e escreva o seguinte comando:

const promise = new Promise((resolve, reject) => {

});

/*
Para criar a Promise, utilizamos o construtor Promise junto com o operador new . Um construtor nada mais é do que uma função especial que cria um objeto a partir de uma classe. Se você nunca ouviu falar de classes ou construtores, não se preocupe! Seu entendimento não é necessário para entender Promises. Apenas observe a sintaxe.
O construtor recebe uma função com 2 parâmetros: resolve e reject . Mantenha a calma que já vamos ver a importância desses dois. Um ponto a se notar aqui é que usamos uma arrow function para passar a função como parâmetro pro construtor, mas você pode utilizar qualquer construção, desde que seja uma função com 2 parâmetros.

Estados da promise
A promise tem 3 estados. Pending , Fulfilled e Rejected . Quando a Promise é executada, ela entra automáticamente no estado Pending . Aqui é quando ela sai da fila e vai para sua "área especial". Ao retornar, ela pode apresentar um dos 2 estados: Fulfilled , se ocorreu tudo certo com sua execução ou Rejected , se ocorreu algum erro. É aqui que nossos parâmetros resolve e reject entram.
Da mesma forma que uma função tem o return para retornar uma resposta de sua execução, a Promise tem o resolve e o reject , que fazem exatamente isso: retornam uma resposta de sua execução. O resolve retorna uma resposta positiva, ou seja, você irá utilizá-lo quando quiser transmitir que tudo ocorreu bem. Já o reject retorna uma resposta negativa, ou seja, você irá utilizá-lo quando ocorrer algo errado.
Existe apenas uma pequena diferença entre o resolve/reject e o return : enquanto o return interrompe a execução da função quando é chamado, o resolve/reject não o fazem, por isso é importante utilizar um return antes de um deles quando não se quer que a execução continue (esse pattern se chama 'early-return', mas não se preocupe com nomes agora). Vamos colocar em prática o que vimos aqui!
Para simular uma situação de sucesso e erro, vamos utilizar o Math.random() para sortear um valor de 0 a 10. Se o valor for entre 0 e 5 (com 5 incluso), será um fracasso, caso o valor seja entre 6 e 10, será um sucesso. Nosso programa ficaria assim:
*/

const promise = new Promise((resolve, reject) => {
  const number = Math.floor(Math.random() * 11);

  if (number <= 5) {
    return reject(console.log(`Que fracasso =( Nosso número foi ${number}`));
  }
  resolve(console.log(`Que sucesso =) nosso número foi ${number}`));
});

/*
Execute algumas vezes o programa para ver o que acontece.

Uma coisa que você irá reparar é que quando o programa é bem sucedido, seu output aparece normalmente. Já quando ele é mal sucedido, ele lança um error ! Essa é a principal diferença entre o resolve e o reject , exatamente o que queríamos demonstrar. Na próxima sessão vamos ver como tratar este erro.

Repare também como usamos o return antes do reject para interromper a execução da função. Dessa forma o uso do else se torna desnecessário.

Ok, entendemos como funciona as Promises , mas como elas são melhores que as callbacks para gerir o fluxo de execução? Vamos ver agora como gerir o fluxo assíncrono com mais 2 "superpoderes" das promises: .then() e .catch() !

Gestores de fluxo
Existem 2 principais ferramentas que podemos usar para gerir o fluxo assíncrono com promises: o .then() e o .catch() . Vamos começar falando sobre o .then() . Para isso , vamos refatorar nossa promise:
*/
const promise = new Promise((resolve, reject) => {
  const number = Math.floor(Math.random() * 11);

  if (number <= 5) {
    return reject(console.log(`Que fracasso =( Nosso número foi ${number}`));
  }
  resolve(number);
})
.then(number => `Que sucesso =) nosso número foi ${number}`)
.then(msg => console.log(msg));

/*
Aqui demonstramos 2 coisas importantes sobre a sintaxe do .then() :

Passamos como argumento uma função. Essa função também recebe 1 argumento que é o retorno do resolve da nossa promise.

O .then() é usado "em cadeia", um conceito chamado de chaining . Assim, podemos colocar vários .then() em cadeia, e o argumento da função interna de um será o retorno do anterior. A parte mais importante é que o .then() espera a promise (ou o .then() anterior) ser concluída para começar a sua execução. Assim, nosso fluxo está controlado!

Vamos ver o que acontece no código acima. A promise é executada e, após sua execução, caso o número seja algo entre 5 e 10, o resolve retorna o número que é passado para o primeiro .then() como number . Por sua vez, ele retorna a frase Que sucesso =) nosso número foi ${number} que é passado como argumento para o segundo .then() , que o usa para "logar" no console.

Ok, mas o erro continua acontecendo. O que podemos fazer em relação a isso? Agora entra o .catch() ! Vamos adicioná-lo ao código:
*/

const promise = new Promise((resolve, reject) => {
  const number = Math.floor(Math.random()* 11);

  if (number <= 5) {
    return reject(number);
  }
  resolve(number);
})
.then(number => `Que sucesso =) nosso número foi ${number}`)
.then(msg => console.log(msg))
.catch(number => console.log(`Que fracasso =( Nosso número foi ${number}`));

/*
Se executarmos o código acima, vamos ver que o erro anterior desapareceu, pois agora ele foi tratado! Assim como o .then() recebe o retorno de resolve , o .catch() recebe o retorno do reject , que é passado para ele como argumento de sua função interna. Assim, quando a promise retorna um reject , pula todos os .then() e executa o primeiro .catch() que encontrar. E tem mais! 

O .catch() também "pega" qualquer erro que acontecer dentro de qualquer .then() anterior a ele. Por esse motivo é geralmente usado no final.
E assim, nossa primeira promise está pronta!

Mas como isso entra no nosso dia a dia ? Vamos utilizar promises para fazer requisições a uma API com uma das funções mais usadas pelas pessoas desenvolvedoras, o Fetch !

Fetch API

No dia anterior você viu superficialmente o que é e pra que serve a função fetch . Hoje você aprenderá a usá-la. A função fetch , como já visto, é responsável por enviar requisições a APIs . Porém, essa não é sua única responsabilidade. Ela também possui ferramentas para tratar os dados recebidos e devolvê-los, além de lidar com os erros.

O retorno da chamada varia conforme a API utilizada, não só em conteúdo, mas também formato. Como nosso maior foco é JavaScript, lidaremos principalmente com respostas em formato JSON ou respostas que possam ser reformatadas para tal.

Erros comuns

Vamos criar uma promise que faz um fetch apenas para um endpoint específico. Para isso, vamos usar como "endpoint" uma url que nos retorna elogios sobre Chuck Norris (elogios, porque ninguém faz piadas com Chuck Norris).

Antes de irmos para o código, como vamos rodar nosso código direto no Node e não no browser, precisamos instalar o node-fetch . Execute o comando abaixo caso você ainda não tenha o package.json :

npm init -y
depois, instale o node-fetch :

npm i node-fetch
Agora veja o código abaixo:
*/

const fetch = require('node-fetch');

function verifiedFetch(url) {
  return new Promise((resolve, reject) => {
    if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
      fetch(url)
        .then((r) => r.json())
        .then((r) => resolve(r.value));
    } else {
      reject(new Error('endpoint não existe'));
    }
  });
}

/*
Vamos dar uma olhada rápida no código. 

Primeiro criamos a função verifiedFetch e passamos o url do nosso endpoint. Depois retornamos uma promise , transformando nossa função em uma função assíncrona. Agora, dentro da promise fazemos uma verificação. Se o endpoint for o certo, usamos o fetch para fazer uma chamada ao endpoint, transformamos a resposta em um json utilizando o método .json() , e para finalizar usamos o resolve para retornar a nossa resposta. 

Caso o url não seja o certo, levantamos um error. Perceba aqui que usamos o construtor new Error para levantar um error. Usar esse construtor dentro do reject é uma boa prática importante e vamos usá-lo a partir de agora.

Agora, leia o código abaixo e, sem executá-lo, responda a seguinte pergunta: O que será exibido no console ao se executar sendJokeToFriend ?
*/

// const fetch = require('node-fetch');

function verifiedFetch(url) {
  return new Promise((resolve, reject) => {
    if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
      fetch(url)
        .then((r) => r.json())
        .then((r) => resolve(r.value));
    } else {
      reject(new Error('endpoint não existe'));
    }
  });
}

function sendJokeToFriend(name) {
  const message = verifiedFetch('https://api.chucknorris.io/jokes/random?category=dev')
    .then((joke) => `Oi ${name}, ouve essa: ${joke}`)
    .catch((err) => err);
  console.log(message);
}

sendJokeToFriend("Anna");

/*
Agora execute a função sendJokeToFriend e veja se você acertou. 

Como vemos, recebemos o seguinte log: Promise { <pending> } . Vamos ver o que acontece aqui.

Como vimos, verifiedFetch é uma promise, logo, é assíncrono. Quando o javascript executa a função, ele manda ela para "área especial" e passa para próxima função que é o console. Como a promise ainda não voltou com o conteúdo de message , vemos que a promise ainda está no estado pending . 

Para visualizar ainda melhor, retire o fetch e execute um resolve que retorna qualquer valor, assim a promise terminará sua execução imediatamente. Antes de executar, pense: Agora que a promise resolve imediatamente, quando o console.log for executado a Promise estará em pending ou já terá um resultado ? Execute e veja a resposta.

Como você viu, ela esta em pending, mesmo sendo resolvida imediatamente. Isso aconteceu pois, mesmo resolvendo na hora, a promise vai para sua área e sai da fila. Quando ela retorna, mesmo que de imediato, ela volta pro final da fila e o console.log está na frente, sendo executado primeiro. 

Para resolver esse problema existem 2 maneiras. A primeira é usar o fluxo da promise e colocar o console.log dentro do .then() . Essa solução e ótima, mas pode ficar dificil de se manter e ler a medida que o número de passos aumenta e a medida que cada passo fica mais complexo também, assim, surgiu a terceira evolução das promises, o async e o await !

async e await

O async é uma mão na roda. Essa funcionalidade transforma qualquer função em uma promise. 

Para começar a usá-la, basta colocar o async antes da definição da função. Agora é só transformar o que é resolve em return e o que é reject em throw e BOOM! Sua promise com async está pronta. Vamos refatorar a função verifiedFetch para usar async :
*/

const fetch = require('node-fetch');

async function verifiedFetch(url) {
  if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
    return fetch(url)
      .then((r) => r.json())
      .then((r) => r.value);
  }
  throw new Error('endpoint não existe');
}

function sendJokeToFriend(name) {
  const message = verifiedFetch('https://api.chucknorris.io/jokes/random?category=dev')
    .then((joke) => `Oi ${name}, ouve essa: ${joke}`)
    .catch((err) => err);
  console.log(message);
}

sendJokeToFriend("Anna");

/*
Pronto! Perceba que continua funcionado exatamente da mesma forma que anteriormente. Tá achando que acabou? Ainda tem mais!

A funcionalidade async sozinha é fantástica mas não resolve nosso problema com a função sendJokeToFriend . Assim, junto com ela vem um bônus, o await . O await só pode ser usado dentro de uma função com async e ela faz exatamente o que diz, faz com o que a função espere uma resposta para continuar sua execução. Vamos refatorar sendJokeToFriend :
*/

const fetch = require('node-fetch');

async function verifiedFetch(url) {
  if (url === 'https://api.chucknorris.io/jokes/random?category=dev') {
    return fetch(url)
      .then((r) => r.json())
      .then((r) => (r.value));
  }
  throw new Error('endpoint não existe');
}

async function sendJokeToFriend(name) {
  const message = await verifiedFetch('https://api.chucknorris.io/jokes/random?category=dev')
    .then((joke) => `Oi ${name}, ouve essa: ${joke}`)
    .catch((err) => err);
  console.log(message);
}

sendJokeToFriend("Anna");

/*
Pronto! Usando o await , o sendJokeToFriend espera a verifiedFetch terminar toda sua execução (até o ultimo .then() ou . catch() ) para só depois executar o console.log() . Assim novamente, a função fica muito mais concisa e fácil de ler.
it's done
Finalmente, chegamos ao fim! Foi muito conteúdo que vimos agora, mas saber promise, com certeza, é algo que vai te levar a outro nível como dev. Agora, não se acomode ainda, levanta, dá uma alongada, pega um café e vamos fazer alguns exercícios para fixar!
*/