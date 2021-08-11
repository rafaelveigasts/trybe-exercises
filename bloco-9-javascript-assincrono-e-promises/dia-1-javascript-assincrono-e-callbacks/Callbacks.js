/*
Callbacks

Agora que o conceito de assincronicidade está mais claro, é hora de dar luz a callbacks !
De forma resumida, callback é uma função passada como parâmetro para outra função. Sem perceber você viu um exemplo de função callback quando chamamos a função setTimeout . Esta função recebe dois parâmetros, o primeiro é a função callback que passamos através de uma arrow function , e o segundo é o tempo que o interpretador irá esperar para executar a função.
Agora veremos um exemplo prático de como podemos utilizar de funções callback . Copie e analise com calma cada trecho da implementação do código, se necessário volte na explicação para que a implementação seja bem compreendida!

const myExpenses = [
  {
    gym: 99,
  },
  {
    ifood: 200,
  },
  {
    phone: 60,
  },
  {
    internet: 100,
  },
];

const myIncome = 1000;

Neste primeiro trecho de código temos duas declarações de variáveis. A primeira delas myExpenses , é um array de objetos que representa os gastos de uma pessoa no mês. A segunda, myIncome , representa o quanto esta pessoa recebeu neste mesmo mês.

Nosso próximo passo será implementar uma função que trate estas informações para que tenhamos como resultado um balanço de entradas e saídas do mês.

const monthlyBudget = (myIncome, myExpenses, callback) => {

  const totalExpenses = callback(myExpenses);
  const totalAfterExpenses = myIncome - totalExpenses;

  console.log(`Balanço do mês:
    Recebido: R$${myIncome},00
    Gasto: R$${totalExpenses},00
    Saldo: R$${totalAfterExpenses},00 `);
};

Neste trecho da implementação podemos notar que foi adicionada uma função monthlyBudget que recebe três parâmetros, myIncome , myExpenses , e callback . Acredito que você deve estar pensando, "O que este parâmetro callback está fazendo nesta função?".

Como vimos anteriormente, callback é basicamente uma função passada por parâmetro para outra função. Neste exemplo o parâmetro callback receberá uma função que retornará o quanto gastamos no mês, ou seja, nossa função callback irá realizar a lógica necessária para somar todos os gastos contidos no array de objetos myExpenses , e retornará este valor para a constante totalExpenses .

const handleExpenses = myExpenses => {
  const eachValue = myExpenses.map((item) => Object.values(item)[0]);
  const totalExpense = eachValue.reduce((acc, curr) => acc + curr , 0);
  return totalExpense;
};

monthlyBudget(myIncome, myExpenses, handleExpenses);

Por fim podemos observar a implementação da nossa função callback representada pela função handleExpenses . Esta função está tratando as informações contidas no array de objetos myExpenses e retornando o valor total de gastos.

Em síntese o que fizemos foi:

1 - Criamos variáveis que representam o quanto recebemos no mês e o quanto gastamos no mês.
2 - Implementamos a função monthlyBudget que recebe três parâmetros, nossos gastos, nossa renda e a função callback .
3 - Realizamos a implementação da função callback representada por handleExpenses que recebe nossos gastos mensais e retorna um valor de gastos total.
4 - Adicionamos handleExpenses na chamada da função monthlyBudget e como resultado temos o balanço mensal.

const myExpenses = [
  {
    gym: 99,
  },
  {
    ifood: 200,
  },
  {
    phone: 60,
  },
  {
    internet: 100,
  },
];

const myIncome = 1000;

const monthlyBudget = (myIncome, myExpenses, callback) => {
  const totalExpenses = callback(myExpenses);
  const totalAfterExpenses = myIncome - totalExpenses;

  console.log(`Balanço do mês:
    Recebido: R$${myIncome},00
    Gasto: R$${totalExpenses},00
    Saldo: R$${totalAfterExpenses},00 `);
};

const handleExpenses = myExpenses => {
  const eachValue = myExpenses.map((item => Object.values(item)));
  const totalExpense = eachValue.reduce((acc, curr) => acc += curr[0] , 0);
  return totalExpense;
};

monthlyBudget(myIncome, myExpenses, handleExpenses);

Balanço do mês:
    Recebido: R$1000,00
    Gasto: R$459,00
    Saldo: R$541,00

Reparou que você já estava usando callbacks desde a semana de JavaScript , com eventListeners , e até a semana passada, com filter , map e reduce ? A função que você passa como parâmetro para cada uma delas é exemplo de função callback . 😉
Além disso, lembra-se do exemplo da pizza mencionado no Por que isso é importante ? O que você faz quando o pedido da pizza chega, que nesse caso é jantar, corresponde a um callback .
Antes de seguir para os exercícios de fixação propostos abaixo, veja o vídeo a seguir para garantir o entendimento sobre callbacks :

Para fixar

Agora, faça estes exercícios de fixação:

1 - No código abaixo você tem a função getUser , que retorna uma pessoa qualquer. Complete a função getUser de forma que ela receba uma outra função como parâmetro para que possa realizar as operações abaixo sobre a pessoa retornada.

const assert = require('assert');

const userFullName = ({ firstName, lastName }) => `Hello! My name is ${firstName} ${lastName}`;
const userNationality = ({ firstName, nationality }) => `${firstName} is ${nationality}`;

const getUser = callback => {
  const userToReturn = {
    firstName: "Ivan",
    lastName: "Ivanovich",
    nationality: "Russian"
  };
   return callback(userToReturn);
};
getUser é a callback já tem que colocar um return se não da undefined
atentar na chamada da função aqui em baixo nos parâmetros

assert.strictEqual(getUser(userFullName), "Hello! My name is Ivan Ivanovich"); // complete a chamada da função de getUser
assert.strictEqual(getUser(userNationality), "Ivan is Russian"); // complete a chamada da função de getUser



2 - No código abaixo você tem a função getUser modificada, que agora funciona de modo assíncrono e imprime dados de uma pessoa qualquer depois de um certo tempo. Complete a função getUser de forma que ela receba um callback para que possa realizar as operações abaixo sobre a pessoa.

*/

const userFullName = ({ firstName, lastName }) => `Hello! My name is ${firstName} ${lastName}`;
const userNationality = ({ firstName, nationality }) => `${firstName} is ${nationality}`;

const delay = (maxMilliseconds = 5000) => Math.floor(Math.random() * maxMilliseconds);

const getUser = callback => {
  setTimeout(() => {
    const user = {
      firstName: "Ivan",
      lastName: "Ivanovich",
      nationality: "Russian",
    };
    console.log(callback(user));
  },delay());
};

getUser(userFullName); // deve imprimir "Hello! My name is Ivan Ivanovich" depois de um certo tempo
getUser(userNationality); // deve imprimir "Ivan is Russian" depois de um certo tempo

// Obs: note e averigue o comportamento assíncrono da função getUser ao chamar getUser(userFullName) seguido de getUser(userNationality) . Tem hora que é impresso antes no console o nome da pessoa, e tem hora que é impressa antes a nacionalidade da pessoa!

