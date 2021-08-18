/*
Expect e matchers
Ao escrever testes, você precisa verificar que valores satisfazem a algumas condições. A função expect é utilizada para dar acesso a um conjunto de métodos chamados matchers . Esses métodos permitem testar valores de diversas formas. expect recebe o valor a ser testado e retorna um objeto representando uma expectation . Sobre esse objeto pode-se chamar os matchers que Jest fornece.

Vamos passar pelos matchers mais comuns. É interessante saber que existem muitos outros matchers que podem ser encontrados na documentação oficial do Jest (https://jestjs.io/docs/expect) . No dia a dia, é normal quem desenvolve ler documentação , porque na maior parte das vezes esse é o local com mais informações atualizadas. Conforme as ferramentas que conhecemos passarem a ter mais opções de uso e funcionalidades, será normal recorrermos à documentação para aprendermos a utilizá-las melhor.


toBe

toBe , que utilizamos no exemplo anterior, é o matcher mais simples. Esse matcher testa igualdade estrita entre o valor passado para expect e seu argumento. Isso significa, por exemplo, que um teste com o expectation abaixo falharia porque a string "5" não é igual ao número 5.
*/
expect(5).toBe("5")

/* 
toEqual
Para compreendermos a diferença entre toEqual e toBe , precisamos entender que no JavaScript existem duas formas de atribuir valores. A primeira é para a variável e a segunda é para propriedade do objeto, bem como ao passar argumentos para uma função. Essas formas de atribuição são conhecidas por valor e referência .
Para nos aprofundarmos nessas duas formas, é importante entender os tipos de dados, que separamos em tipos primitivos (Ex. number, string, boolean, etc) e objetos (Ex. Objetos, Funções, Arrays, etc).
Os tipos primitivos a atribuição ocorre por valor , ou seja, uma cópia do valor original, pois eles são imutáveis. Eles são como gêmeos, uma vez o primeiro gêmeo corta seu cabelo, o segundo não terá seu cabelo alterado. Por exemplo:
 */
let name = "Pedro";
let firstName = name;

name = "Carol";

console.log(name); // Carol
console.log(firstName); // Pedro

/* 
Por outro lado, os objetos tem atribuição por referência , ou seja, a cada vez que você cria um novo objeto, cria-se um novo espaço na memória para ele. Eles são mutáveis, por tanto podemos considerar que é uma forma de criar um apelido ( alias ) para o original, ou seja, você pode ser chamado pelo seu nome ou por seu apelido, mas você é uma pessoa única, não é possível criar um clone seu. Veja este exemplo:
 */
let myName = { firstName: "Pedro" };
let identity = myName;

myName.firstName = "Carol";

console.log(myName.firstName); // Carol
console.log(identity.firstName); // Carol

/* 
Isso significa que objetos e arrays com conteúdo iguais são considerados diferentes no JavaScript . Para testar igualdade de objetos e arrays, é preciso usar o matcher toEqual , que acessa cada elemento do objeto ou array, fazendo um trabalho de comparação específico e que retorna uma resposta mais voltada para a necessidade dos testes:
 */
test('array and object equality', () => {
  const arr = [1, 2 ,3];
  const obj = { a: 1, b: 2, c: 3};

  expect(arr).toBe([1, 2, 3]); // fails
  expect(obj).toBe({ a: 1, b: 2, c: 3}); // fails
  expect(arr).toEqual([1, 2, 3]); // OK
  expect(obj).toEqual({ a: 1, b: 2, c: 3}); // OK
});

/* 
Valores booleanos
null , undefined e false são valores falsy . Isso significa que são tratados como false sempre que se espera um valor booleano, como em condicionais. Às vezes, porém, é preciso distinguir entre eles. Jest fornece matchers específicos para cada um. Leia mais sobre eles na documentação do Jest (https://jestjs.io/docs/using-matchers#truthiness).
 
Números
Há matchers para as principais formas de comparar números. Leia aqui (https://jestjs.io/pt-BR/docs/using-matchers#n%C3%BAmeros) sobre esses matchers

Strings
Para comparar string com expressões regulares, utilize o matcher toMatch (https://jestjs.io/pt-BR/docs/expect#tomatchregexporstring).

Arrays
Você pode verificar se um array contém um item em particular utilizando toContain (https://jestjs.io/pt-BR/docs/expect#tocontainitem) . Para verificar que um item possui uma estrutura mais complexa, utilize toContainEqual (https://jestjs.io/pt-BR/docs/expect#tocontainequalitem) . toHaveLength (https://jestjs.io/pt-BR/docs/expect#tohavelengthnumber) permite facilmente verificar o tamanho de um array ou de uma string.

Objetos
É bastante comum testar se um objeto possui uma propriedade específica. O matcher toHaveProperty (https://jestjs.io/pt-BR/docs/expect#tohavepropertykeypath-value) é ideal para esses casos.

Exceções
toThrow (https://jestjs.io/pt-BR/docs/expect#tothrowerror) testa se uma função lança um erro quando é executada. Para testar se uma função está retornando um erro, é importante estar atento à sintaxe do .toThrow :
*/
const multiplyByTwo = (number) => {
  if (!number) {
    throw new Error('number é indefinido')
  }
  return number * 2;
};
multiplyByTwo(4);

test('testa se multiplyByTwo retorna o resultado da multiplicação', () => {
  expect(multiplyByTwo(4)).toBe(8);
});
test('testa se é lançado um erro quando number é indefinido', () => {
  expect(() => { multiplyByTwo() }).toThrow(); // testa se o erro é lançado
});
test('testa se a mensagem de erro é "number é indefinido"', () => { // testa se a mensagem do erro.
  expect(() => { multiplyByTwo() }).toThrowError(new Error('number é indefinido'));
});

/* 
Note que para testar se um erro é lançado, passamos para o expect uma função. Chamamos multiplyByTwo dentro da arrow function . Chamar a função diretamente dentro de expect fará com que o erro não seja capturado. Assim, a asserção falhará, porque o erro acontecerá antes mesmo de expect ser executado e ter a chance de capturar o erro. Para testar a mensagem de erro, como fizemos no terceiro teste do exemplo acima, usamos o matcher toThrowError e passamos dentro do parênteses a mensagem que será mostrada em caso de erro: new Error("number é indefinido") . Observe que nos dois casos a função que queremos testar é chamada indiretamente por uma arrow function . Seguir essa sintaxe é importante para que o seu teste funcione corretamente.

not
not permite testar o oposto de algo. Por exemplo, este código testa que domingo é um dia da semana, mas não um dia útil:
 */
const workDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const weekDays = ['Sunday', ...workDays, 'Saturday'];

test('Sunday is a week day', () => {
  expect(weekDays).toContain('Sunday');
});

test('Sunday is not a workday', () => {
  expect(workDays).not.toContain('Sunday');
});

// Estes foram alguns dos matchers mais comuns. Existem muitos outros, e você pode até mesmo criar os seus. A documentação do Jest (https://jestjs.io/pt-BR/docs/expect) explica com detalhes todos os matchers disponíveis. Consulte-a sempre!