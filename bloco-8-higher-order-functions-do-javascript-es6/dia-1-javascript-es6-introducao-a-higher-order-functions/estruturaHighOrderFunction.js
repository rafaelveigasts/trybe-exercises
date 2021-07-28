/*Estruturando uma HOF
Vamos construir este conceito passo a passo para que você possa compreender e aplicar na sua jornada como pessoa desenvolvedora. Para isto, é extremamente importante ter em mente que as HOF nos permitem compactar ações e não somente repassar valores. Veja este exemplo:*/

const repeat = (number, action) => {
  for (let count = 0; count <= number; count += 1) {
    action(count);
  }
};

repeat(5, console.log);

/*Construímos essa função para implementar um laço de repetição entre 0 e um número especificado via parâmetro ( number ) e para mostrar no console o valor da variável count de 0 a N ( number ). O console.log é uma função própria do JavaScript , mas veja que fica mais simples caso você precise substituir esta ação para console.table ou console.group .
Vamos aumentar um pouco o nível de complexidade e visualizar como podemos ir construindo funções mais especializadas e bem definidas. Veja este exemplo:*/

const repeat = (number, action) => {
  for (let count = 0; count <= number; count += 1) {
    action(count);
  }
};

repeat(3, (number) => {
  if (number % 2 === 0) {
    console.log(number, 'is even');
  }
});

/*Pegamos a nossa implementação do exemplo anterior e repassamos dois parâmetros ao chamarmos a função repeat , sendo:
1 - Um número até que ponto gostaríamos de testar, neste caso 3 ;
2 - Nossa ação que será executada quando chamada action(count) na nossa função repeat , neste caso uma função para testar nossos números.
Veja que nosso segundo parâmetro é uma função que recebe o count como argumento, proveniente da execução do nosso action(count) dentro da função repeat . Deste modo, caso o count passe pela condição estabelecida para ser um número par, será executada a mensagem com os números que atendem ao critério.

Pense agora que gostaríamos de testar quais números são ímpares. Veja como fica fácil ajustar a implementação:*/

const repeat = (number, action) => {
  for (let count = 0; count <= number; count += 1) {
    action(count);
  }
};

const isEven = (number) => {
  if (number % 2 === 0) {
    console.log(number, 'is even');
  }
};

const isOdd = (number) => {
  if ((number % 2) > 0) {
    console.log(number, 'is odd');
  }
};

repeat(3, isEven); // Testa quais números serão pares;
repeat(3, isOdd); // Testa quais números serão ímpares;

/*Observe que apenas transportamos e ajustamos a lógica para identificar os números pares e ímpares em duas novas funções chamadas isEven e isOdd . Após isso, só alteramos o segundo parâmetro ao chamar a função repeat .
A função recebida como argumento pela HOF, também é conhecida por callback . No exemplo, repeat é uma HOF que recebe isEven ou isOdd como callback. Podemos encontrar mais sobre este assunto nos Recursos adicionais , no entanto não se preocupe com este conceito no momento, abordaremos isso nos conteúdos adiante.

Olhe o exemplo a seguir:*/

const numberGenerator = () => {
  return Math.random() * 100;
}

console.log(numberGenerator());

// /Veja que ao executar esse código, não recebemos um número aleatório. Isso aconteceu porque na quinta linha do script nós imprimimos apenas a escrita da função, como não realizamos sua execução, ela não seguiu os procedimentos para retornar um número aleatório. Para executarmos a função, teríamos que inserir () na frente do randomNumber .
// Essa lógica é a mesma quando usamos callback dentro de outras funções. Lembre que o traço do JavaScript que considera funções como cidadãs de primeira classe permite que nós possamos inserir elas em variáveis. Você já fez isso antes também, se voltar no primeiro exemplo dessa função, vai ver que a chamada da callback no addEventListener funciona de modo similar. Tudo isso é parte de algo maior, são High Order Functions .