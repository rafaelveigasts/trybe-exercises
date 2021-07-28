// Para fixar
// Vamos praticar com os seguintes exercícios:
// 1 - Crie uma função que retorne a string 'Acordando!!' ;
// 2 - Crie outra função que retorne a string 'Bora tomar café!!' ;
// 3 - Crie mais uma função que retorne a string 'Partiu dormir!!' ;
// 4 - Agora desenvolva uma HOF chamada doingThings e configure esta função para que imprima no console o resultado da execução das funções que você criou nos exemplos anteriores. Exemplo:

// Ao chamar a função doingThings:

// Ela deve retornar o valor do respectivo parâmetro, neste caso:
// Acordando!!


const wakeUp = () => 'Acordando!!';
const breakfast = () => 'Tomar café';
const dormir = () => 'hora de dormir';

const doingThings = (callback) => {
  const result = callback();
  console.log(result);
};

doingThings(wakeUp);

// Função Callback
// Uma função callback é uma função passada a outra função como argumento, que é então invocado dentro da função externa para completar algum tipo de rotina ou ação.

// https://developer.mozilla.org/pt-BR/docs/Glossary/Callback_function


// Portanto, uma callback é uma função que te permite operar em cima do retorno de outras funções da forma que for necessário.
// https://medium.com/totvsdevelopers/entendendo-fun%C3%A7%C3%B5es-callback-em-javascript-7b500dc7fa22
