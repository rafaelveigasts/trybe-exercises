/*
Operações assíncronas
Operações em JavaScript são tradicionalmente síncronas, ou seja, para que uma cadeia de operações seja realizada, é necessário que uma operação termine para que outra comece. Em uma linha de produção de automóveis por exemplo, várias etapas de produção são codependentes. Podemos relacionar estas etapas de produção às operações síncronas em JavaScript. Observe o exemplo abaixo para que esta analogia fique mais clara:

console.log('1 - Receber roda');
console.log('2 - Encaixar parafusos');
console.log('3 - Fixar roda no carro');

Note que existe uma ordem específica de etapas que não pode ser quebrada pois uma afeta diretamente a outra. Sem roda, não adianta encaixar parafusos, sem encaixar parafusos, fixar a roda não é possível.

Agora imagine que o nosso estoque de parafusos está chegando ao fim e é necessário que façamos uma reposição para que a linha de produção não pare. No entanto, nossa operação não cobre este tipo situação e nossa linha de produção para enquanto uma pessoa funcionária irá comprar os parafusos e repor o estoque.

console.log('1 - Comprar parafusos');
console.log('2 - Adicionar ao estoque');
console.log('3 - Receber roda');
console.log('4 - Encaixar parafusos');
console.log('5 - Fixar roda no carro');

Observe que estamos trabalhando de forma ineficiente e adicionando etapas desnecessárias à nossa produção pois se tivermos parafusos suficientes em estoque, não precisamos parar a montagem para que mais parafusos sejam comprados e repostos. Assim como na nossa linha de produção, existem operações que não possuem esta codependência em JavaScript, e com objetivo de cobrir justamente este tipo de situação surgem as operações assíncronas .
Rode em seu editor o código abaixo e veja como nossa linha de produção já não depende mais das etapas de compra de parafusos e de reposição do estoque.
Não se preocupe com o código em si, falaremos da função setTimeout logo mais! 😉

setTimeout(() => {
  console.log('Comprar parafusos') // Comprar parafusos
  console.log('Adicionar ao estoque') // Adicionar ao estoque
}, 2000);

console.log('1 - Receber roda'); // 1 - Receber roda
console.log('2 - Encaixar parafusos'); // 2 - Encaixar parafusos
console.log('3 - Fixar roda no carro'); // 3 - Fixar roda no carro

Note que console.log('Comprar parafusos') e console.log('Adicionar ao estoque') foram declarados antes das etapas 1 , 2 e 3 , mesmo assim o retorno das chamadas só ocorre ao final. Isto acontece pois utilizamos a função setTimeout . É muito comum que esta função seja utilizada para simular comportamentos assíncronos. Na prática vivenciaremos situações em que nossa aplicação depende de uma informação externa, como por exemplo, solicitar uma informação a um banco de dados. É aí que o conceito de assincronicidade entra a nosso favor para que nossa aplicação não perca eficiência.

Agora, vamos ver um pouco da prática realizando este exercício de fixação. Copie o código para ser executado na sua máquina:

const assert = require('assert');

const pushNumber = (list, number) => list.push(number);

let numbers = [];

pushNumber(numbers, 1);
pushNumber(numbers, 2);
pushNumber(numbers, 3);

assert.deepStrictEqual(numbers, [1, 2, 3]);

Veja abaixo:

const assert = require('assert');

const pushNumber = (list, number) => list.push(number);

let numbers = [];

setTimeout(() => pushNumber(numbers, 1), 3000);
pushNumber(numbers, 2);
pushNumber(numbers, 3);

assert.deepStrictEqual(numbers, [1, 2, 3]); // essa validação falha

Por que a validação referente ao primeiro código funciona, e a referente ao segundo não? O teste espera receber o array [1, 2, 3] , mas apenas recebe o [2, 3] . Isso ocorre por causa da função setTimeout . Ela é uma função assíncrona, que espera alguns milissegundos para executar a função passada a ela como parâmetro. No código acima, ela espera 3000 milissegundos (3 segundos) para executar o pushNumber(numbers, 1) .
Para passar no teste, é necessário testar o numbers após 3000 milissegundos:

const assert = require('assert');

const pushNumber = (list, number) => {
  list.push(number);
  console.log(list);
};

let numbers = [];

setTimeout(() => pushNumber(numbers, 1), 3000);
pushNumber(numbers, 2);
pushNumber(numbers, 3);

setTimeout(() => assert.deepStrictEqual(numbers, [2, 3, 1]), 3000);

Observe que, além de adicionar o setTimeout , o array [1, 2, 3] foi modificado para [2, 3, 1] . Isso se dá, pois, como a função é assíncrona, o código continua rodando, mesmo que ela ainda não tenha terminado de executar. Ou seja, o array recebe primeiro o 2 , depois o 3 , e após os 3 segundos do setTimeout , ele recebe o 1 .
Para saber mais a respeito de setTimeout , acesse este link. https://www.w3schools.com/jsref/met_win_settimeout.asp

*/