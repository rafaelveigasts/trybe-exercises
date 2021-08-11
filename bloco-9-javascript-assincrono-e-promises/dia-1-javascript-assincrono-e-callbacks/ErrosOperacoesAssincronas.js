/*
Lidando com erros em operações assíncronas

No último exercício, você deve ter reparado que está usando em conjunto callbacks e assincronicidade, que nesse caso correspondem a:

operação assíncrona : retorno de user depois de um certo tempo, que varia;

callbacks : as funções userFullName e userNationality , que são chamadas depois que o usuário é retornado.

Nesse caso, a operação assíncrona sempre finaliza com sucesso, e existe um callback que atua sobre o resultado desse sucesso. Mas isso não reflete por completo todas as operações assíncronas.

Suponha que você esteja pegando dados de usuário via requisição em um outro servidor. Podemos garantir que essa requisição vai ocorrer sempre com sucesso? E se houver uma falha de conexão? E se o servidor não estiver funcionando no momento da requisição? Esses casos são exemplos de fatores externos, sobre os quais não se tem controle algum, que precisam ser tratados.

Ou seja, da mesma forma que se tem um callback para quando a operação assíncrona tem sucesso, também precisaria ter um callback para quando a operação assíncrona termina com erro.

Para fixar

Vamos botar tudo isso em prática com este exercício de fixação:

1 - A função getCountry abaixo tem aproximadamente 50% de chance de obter com sucesso um país, tendo um callback para poder ser feita qualquer operação sobre o país retornado. Adicione um outro callback para getCountry , de forma que trate a mensagem de erro retornada.
*/


const countryName = ({ name }) => console.log(`Returned country is ${name}`);
const countryCurrency = ({ name, currency }) => console.log(`${name}'s currency is the ${currency}`);

const delay = (maxMilliseconds = 5000) => Math.floor(Math.random() * maxMilliseconds);

const printErrorMessage = (error) => console.log(`Error getting country: ${error}`);

const getCountry = (onSuccess) => {
  setTimeout(() => {
    const didOperationSucceed = Math.random() >= 0.5;
    if(didOperationSucceed) {
      const country = {
        name: "Brazil",
        hdi: 0.759,
        currency: "Real",
      };
      onSuccess(country);
    }
    else {
      const errorMessage = "Country could not be found";
    }
  }, delay());
};

// Deve imprimir "Returned country is Brazil" no sucesso, ou "Error getting country: Country could not be found" em falha
getCountry(countryName, printErrorMessage);

// Deve imprimir "Brazil's currency is the Real" no sucesso, ou "Error getting country: Country could not be found" em falha
getCountry(countryCurrency, printErrorMessage);

/*

Solução:

Agora nossa função está dependendo de um certo resultado para funcionar corretamente. Repare que a atribuição na linha em que a constante didOperationSucceed é uma operação. Mas o resultado dela vai resultar em um true ou false de acordo com a seguinte lógica: "Te dei um número aleatório entre 0 e 0.999... . Ele é igual ou maior que 0.5? Se for verdade, retorne true na variável, se não, retorne false ".

const didOperationSucceed = Math.random() >= 0.5;

Repare que temos uma função printErrorMessage também. Ela é responsável por receber um erro por parâmetro e imprimir ele. Ela é a segunda callback da função getCountry .

const printErrorMessage = (error) => console.log(`Error getting country: ${error}`);

Vamos falar da nossa função principal agora, esse é o modelo resolvido dela:

const getCountry = (onSuccess, onError) => {
  setTimeout(() => {
    const didOperationSucceed = Math.random() >= 0.5;
    if(didOperationSucceed) {
      const country = {
        name: "Brazil",
        hdi: 0.759,
        currency: "Real",
      };
      onSuccess(country);
    }
    else {
      const errorMessage = "Country could not be found";
      onError(errorMessage);
    }
  }, delay());
};

Note que a nossa função agora possui uma estrutura condicional de if/else. Lembra da nossa constante que é um true ou false? Ela vai ser útil aqui, pois sempre que chamarmos nossa função, ela vai ser definida com um valor aleatório de novo.

Caso não esteja familiarizado com aquela condição que está no if, pode pensar como se fosse: "A constante didOperationSucceed é true ? Se for, execute esse bloco de código. Se não for, execute o bloco do else ".
O bloco de código que atende a condição que é verdadeira mudou pouca coisa. Apenas imprime informações de acordo com a callback recebida. Mas o bloco do else agora contém uma constante que armazena uma string. Logo em seguida, ele passa essa mensagem para nossa callback que irá lidar com o erro, no caso, a printErrorMessage da qual falamos mais cedo.

Por fim, no final do código, chamamos nossas funções passando as callbacks corretas. Confira você mesmo, essa é a versão final no código:

const countryName = ({ name }) => console.log(`Returned country is ${name}`);
const countryCurrency = ({ name, currency }) => console.log(`${name}'s currency is the ${currency}`);

const delay = (maxMilliseconds = 5000) => Math.floor(Math.random() * maxMilliseconds);

const printErrorMessage = (error) => console.log(`Error getting country: ${error}`);

const getCountry = (onSuccess, onError) => {
  setTimeout(() => {
    const didOperationSucceed = Math.random() >= 0.5;
    if(didOperationSucceed) {
      const country = {
        name: "Brazil",
        hdi: 0.759,
        currency: "Real",
      };
      onSuccess(country);
    }
    else {
      const errorMessage = "Country could not be found";
      onError(errorMessage);
    }
  }, delay());
};

Deve imprimir "Returned country is Brazil" no sucesso, ou "Error getting country: Country could not be found" em falha
getCountry(countryName, printErrorMessage);

Deve imprimir "Brazil's currency is the Real" no sucesso, ou "Error getting country: Country could not be found" em falha
getCountry(countryCurrency, printErrorMessage);
*/