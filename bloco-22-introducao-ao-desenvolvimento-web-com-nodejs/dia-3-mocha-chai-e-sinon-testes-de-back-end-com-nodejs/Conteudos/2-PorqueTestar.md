## Por que testar?

Existem diversos tipos de testes, cada um com suas características e objetivos. O processo que acabamos de mencionar no tópico anterior, pode ser chamado de "testes manuais". Nesses testes re-executamos o código algumas vezes buscando validar se o comportamento que queremos está sendo realizado corretamente e também alteramos os parâmetros de entrada para tentarmos garantir que tal funcionamento se mantém mesmo com essas variações.

Vamos a um exemplo prático, imagine que queremos criar uma função que receba a média das notas de uma pessoa e responda se ela foi aprovada ou não segundo a seguinte regra:

Média	Situação
Menor que 7	Reprovado
Igual ou maior que 7	Aprovado

O primeiro passo que precisamos dar é pensar na estrutura da nossa função:

° Quantos e quais parâmetros ela irá esperar?
° Qual tipo de resposta ela irá retornar?

No nosso caso nossa função deverá receber um parâmetro "media" e responder com "reprovado" ou "aprovado".

Tendo em mente esses questionamentos poderíamos simplesmente já partir para a implementação e chegar ao seguinte código:
examples/calculaSituacao.js

function calculaSituacao(media) {
  if (media > 7) {
    return 'aprovado';
  }

  return 'reprovado';
}

module.exports = calculaSituacao;

Simples né? Agora vamos testar essa função de acordo com os comportamentos que ela deveria ter segundo a proposta, nesse caso precisamos garantir que:

Se passado um valor menor que 7 , por exemplo 4 , a resposta deve ser "reprovado" ;

Se passado um valor maior que 7 , por exemplo 9 , a resposta ser "aprovado" ;

E, não podemos esquecer do "OU", sendo assim, se passado 7 , a resposta deve ser "aprovado" ;

Para validar esses cenários que pensamos podemos escrever algumas chamadas a nossa função:

const calculaSituacao = require('./examples/calculaSituacao');

console.log(calculaSituacao(4));
// console: reprovado

Para ficar mais simples, poderíamos adicionar algumas mensagens para nos ajudar e também já verificar se a resposta dada é aquela que esperamos:

const calculaSituacao = require('./examples/calculaSituacao');

console.log('Quando a média for menor que 7, retorna "reprovado":');

const respostaCenario1 = calculaSituacao(4);
if (respostaCenario1 === 'reprovado') {
  console.log(`Ok 🚀`);
} else {
  console.error('Resposta não esperada 🚨');
}
// console:
// Quando a média for menor que 7, retorna "reprovado":
// Ok 🚀

console.log('Quando a média for maior que 7, retorna "aprovado":');

const respostaCenario2 = calculaSituacao(9);
if (respostaCenario2 === 'aprovado') {
  console.log(`Ok 🚀`);
} else {
  console.error('Resposta não esperada 🚨');
}
// console:
// Quando a média for maior que 7, retorna "aprovado":
// Ok 🚀

console.log('Quando a média for igual a 7, retorna "aprovado":');

const respostaCenario3 = calculaSituacao(7);
if (respostaCenario3 === 'aprovado') {
  console.log(`Ok 🚀`);
} else {
  console.error('Resposta não esperada 🚨');
}
// console:
// Quando a média for igual a 7, retorna "aprovado":
// Resposta não esperada 🚨

Temos um bug aqui! 🐞

De propósito, deixamos um comportamento falho para simular uma situação normal do dia-a-dia. Nesse caso pode ser um detalhe simples em uma função simples, mas em sistemas mais complexos, onde temos diversos pontos diferentes interligados e várias pessoas trabalhando no mesmo código, um cenário de falha é ainda maior.

O que poderíamos fazer em uma situação dessas é implementar a correção e chamar as funções novamente, garantindo que dessa vez todos os cenários estão cobertos inclusive aqueles que já estavam funcionando antes da correção.

Porém, como vimos na prática, testar manualmente nosso projeto pode ser uma tarefa árdua e repetitiva. Como pessoas desenvolvedoras, capazes de construir soluções para tornar processos mais eficientes e rápidos, menos repetitivos e menos sujeitos a erros humanos, por que não automatizamos esse processo também, colhendo dessas e outras vantagens?

É o que veremos a seguir!