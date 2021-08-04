/* 
Parâmetro Rest
Agora que você viu como funciona o spread operator , vamos aprender mais um recurso que irá te auxiliar a criar funções que recebem um número ilimitado de argumentos: o parâmetro rest .
O parâmetro rest é uma feature do ES6 que permite com que você crie funções que recebam um número variável de argumentos. Assim, suas funções ficam mais flexíveis. Os argumentos que serão passados como parâmetro são salvos em um array que pode ser acessado de dentro da função. Por isso, podemos passar qualquer tipo de parâmetro quando usamos o rest . Todos eles serão colocados dentro de um array, o que te permite usar métodos como o .length . Acompanhe o exemplo abaixo para entender melhor essa ideia:
 */

function quantosParams(...args) {
  console.log('parâmetros:', args);
  return `Você passou ${args.length} parâmetros para a função.`;
}

console.log(quantosParams(0, 1, 2)); // Você passou 3 parâmetros para a função.
console.log(quantosParams('string', null, [1, 2, 3], { })); // Você passou 4 parâmetros para a função.

// Observe no segundo console.log que passamos diferentes tipos de argumentos para a função quantosParams e todos foram colocados em um array. Quer ver mais um exemplo onde o rest é muito útil? Acompanhe!
const sum = (...args) => args.reduce((accumulator, current) => accumulator + current, 0);
console.log(sum(4, 7, 8, 9, 60)); // 88

/* Nós já aprendemos sobre higher order functions e vimos como o método reduce é útil para somar os elementos de um array. No exemplo acima, a função sum calcula a soma de todos os argumentos passados a ela - independente do número. Como o parâmetro rest "empacota" todos os argumentos em um array, podemos utilizar o reduce para somar tudo o que estiver dentro deste array. Experimente passar mais números como argumento para a função sum . Você verá que independente do número de argumentos passados, a função irá executar a soma. Sua função é muito mais flexível quando queremos passar múltiplos parâmetros com o rest pois você não precisa especificar quantos argumentos a função irá receber! */

