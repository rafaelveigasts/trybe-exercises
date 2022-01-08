## Importando e exportando módulos

Quando queremos utilizar o conteúdo de um módulo ou pacote de outro arquivo no Node.js, precisamos importar esse módulo / pacote para o contexto atual no qual estamos.

Existem dois sistemas de módulos difundidos na comunidade 

JavaScript:
Módulos ES6 ;
Módulos CommonJS .

### ES6

O nome ES6 vem de ECMAScript 6, que é a especificação seguida pelo JavaScript.

Na especificação do ECMAScript 6, os módulos são importados utilizando a palavra-chave import , tendo como contrapartida a palavra-chave export para exportá-los.

O Node.js não possui suporte a módulos ES6 por padrão, sendo necessário o uso de transpiladores, como o Babel https://babeljs.io/ , ou supersets da linguagem, como o TypeScript https://www.typescriptlang.org/ , para que esse recurso esteja disponível. 

Transpiladores são ferramentas que leêm o código-fonte escrito em uma linguagem como o Node.js e produz o código equivalente em outra linguagem. Supersets são linguagens que utilizam um transpilador para adicionar novas funcionalidades ao JavaScript.

Para saber mais sobre módulos ES6 e transpiladores, dê uma olhada na seção Recursos Adicionais.

### CommonJS

O CommonJS é o sistema de módulos implementado pelo Node.js nativamente e, portanto, o sistema que utilizaremos daqui pra frente. Veja as próximas seções para entender como ele funciona

Vamos dar uma olhada, primeiramente, em como exportamos algo de um módulo ou arquivo JavaScript.

## Exportando módulos

Para exportar algo no sistema CommonJS, utilizamos a variável global module.exports , atribuindo a ela o valor que desejamos exportar:

// brlValue.js
const brl = 5.37;

module.exports = brl;

Note como utilizamos as palavras-chave module.exports . Como vimos anteriormente, um módulo possui um escopo isolado, ou seja, suas funções, variáveis, classes e demais definições existem somente dentro do módulo. O module.exports nos permite definir quais desses "objetos" internos ao módulo serão exportados , ou seja, serão acessíveis a arquivos que importarem aquele módulo. O module.exports pode receber qualquer valor válido em JavaScript, incluindo objetos, classes, funções e afins.

No arquivo acima estamos exportando do nosso módulo o valor da constante brl , que é 5.37 . Ao importarmos esse módulo, receberíamos o valor 5.37 como resposta. Apesar de isso funcionar, exportar um único valor constante assim não é comum. Vamos observar um caso que acontece com mais frequência:

// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = usdToBrl;

Agora estamos exportando uma função de forma que podemos utilizá-la para converter um valor em dólares para outro valor, em reais.

O uso desse nosso módulo se daria da seguinte forma:

// index.js
const convert = require('./brlValue');

const usd = 10;
const brl = convert(usd);

console.log(brl) // 53.7

Perceba que podemos dar o nome que quisermos para a função depois que a importamos, independente de qual o seu nome dentro do módulo.

Suponhamos agora que seja desejável exportar tanto a função de conversão quanto o valor do dólar (a variável brl ). Para isso, podemos exportar um objeto contendo as duas constantes da seguinte forma:

// brlValue.js
const brl = 5.37;

const usdToBrl = (valueInUsd) => valueInUsd * brl;

module.exports = {
  brl,
  usdToBrl,
};

Dessa forma, ao importarmos o módulo, receberemos um objeto como resposta:

// index.js
const brlValue = require('./brValue');

console.log(brlValue); // { brl: 5.37, usdToBrl: [Function: usdToBrl] }

console.log(`Valor do dólar: ${brlValue.brl}`); // Valor do dólar: 5.37
console.log(`10 dólares em reais: ${brlValue.usdToBrl(10)}`); // 10 dólares em reais: 53.7

Por último, como estamos lidando com um objeto, podemos utilizar object destructuring para transformar as propriedades do objeto importado em constantes no escopo global:

const { brl, usdToBrl } = require('./brValue');

console.log(`Valor do dólar: ${brl}`); // Valor do dólar: 5.37
console.log(`10 dólares em reais: ${usdToBrl(10)}`); // 10 dólares em reais: 53.7

Agora que você já viu como exportar valores de módulos, vamos mergulhar em como podemos importar módulos no Node.js:


## Importando módulos

Você verá, a seguir, como utilizar o require para importar cada tipo de módulo.

### Módulos locais

Quando queremos importar um módulo local, precisamos passar para o require o caminho do módulo, seguindo a mesma assinatura. Por exemplo, require('./meuModulo') . Note que a extensão ( .js ) não é necessária: por padrão, o Node já procura por arquivos terminados em .js ou .json e os considera como módulos.

Além de importarmos um arquivo como módulo, podemos importar uma pasta. Isso é útil, pois muitas vezes um módulo está dividido em vários arquivos, mas desejamos importar todas as suas funcionalidades de uma vez só. Nesse caso, a pasta precisa conter um arquivo chamado index.js , que importa cada um dos arquivos do módulo e os exporta da forma mais conveniente.
Por exemplo:

// meuModulo/funcionalidade-1.js

module.exports = function () {
  console.log('funcionalidade1');
}

// meuModulo/funcionalidade-2.js

module.exports = function () {
  console.log('funcionalidade2');
}

// meuModulo/index.js
const funcionalidade1 = require('./funcionalidade-1');
const funcionalidade2 = require('./funcionalidade-2');

module.exports = { funcionalidade1, funcionalidade2 };

Note que utilizamos a palavras-chave module.exports . Confome já vimos, um módulo possui um escopo isolado, ou seja, suas funções, variáveis, classes e demais definições existem somente dentro do módulo. O module.exports nos permite definir quais desses "objetos" internos ao módulo serão exportados , ou seja, estarão acessíveis para arquivos que importarem aquele módulo. O module.exports pode receber qualquer valor válido em JavaScript, incluindo objetos, classes, funções e afins. No exemplo acima, isso quer dizer que, quando importarmos o módulo meuModulo , teremos um objeto contendo duas propriedades, que são as funcionalidades que exportamos dentro de meuModulo/index.js .
Para importarmos e utilizarmos o módulo meuModulo , basta passar o caminho da pasta como argumento para a função require , assim:

// minha-aplicacao/index.js
const meuModulo = require('./meuModulo');1

console.log(meuModulo); // { funcionalidade1: [Function: funcionalidade1], funcionalidade2: [Function: funcionalidade2] }

meuModulo.funcionalidade1();

### Módulos internos

Para utilizarmos um módulo interno, devemos passar o nome do pacote como parâmetro para a função require . Por exemplo, require('fs') importa o pacote fs , responsável pelo sistema de arquivos.

Uma vez que importamos um pacote, podemos utilizá-lo no nosso código como uma variável, dessa forma:

const fs = require('fs');

fs.readFileSync('./meuArquivo.txt');

Repare que o nome da variável pode ser qualquer um que escolhermos. O que importa mesmo é o nome do pacote que passamos como parâmetro para o require .


### Módulos de terceiros

Módulos de terceiros são importados da mesma forma que os módulos internos: passando seu nome como parâmetro para a função require . A diferença é que, como esses módulos não são nativos do Node.js, precisamos primeiro instalá-los na pasta do projeto em que queremos utilizá-los. O registro oficial do Node.js, em que milhares de pacotes estão disponíveis para serem instalados, é o npm . Além disso, npm também é o nome da ferramenta de linha de comando (CLI - command line interface ) responsável por baixar e instalar esses pacotes. O CLI npm é instalado juntamente com o Node.js.

Quando importamos um módulo que não é nativo do Node.js, e não aponta para um arquivo local, o Node inicia uma busca por esse módulo. Essa busca acontece na pasta node_modules . Caso um módulo não seja encontrado na node_modules mais próxima do arquivo que o chamou, o Node procurará por uma pasta node_modules na pasta que contém a pasta atual. Caso encontrado, o módulo é carregado. Do contrário, o processo é repetido em um nível de pasta acima. Isso acontece até que o módulo seja encontrado, ou até que uma pasta node_modules não exista no local em que o Node está procurando.

Aproveitando que estamos falando sobre módulos de terceiros, vamos falar melhor do NPM: você entenderá melhor o que ele é e como utilizar os principais comandos do seu CLI. Bora lá!
