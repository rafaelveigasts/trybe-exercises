// Array.sort
// Por último, existe a função sort . Ela permite ordenar um array de acordo com algum critério estabelecido. Veja este exemplo com um array de strings:

const food = ['arroz', 'feijão', 'farofa', 'chocolate', 'doce de leite'];
food.sort();
console.log(food);
// [ 'arroz', 'chocolate', 'doce de leite', 'farofa', 'feijão' ]

// Funcionou bem com um array de strings, não é mesmo? Por tanto, caso queira ordenar de forma alfabética, basta chamar sort , sem parâmetros algum na função. Agora, veja este exemplo com um array de números:

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.sort();
console.log(numbers); // [1, 10, 2, 3, 4, 5, 6, 7, 8, 9]

// 😮 O que aconteceu com esta ordenação?
// Como pode notar, a forma como ela organiza os elementos do array não é tão intuitiva. Isso ocorre, pois ela distribui sempre por ordem alfabética . No caso, quando há elementos como números, a sort coloca de acordo com a ordem alfabética dos códigos desse elemento na tabela de caracteres unicode!
// Agora, se deseja ordenar de forma numérica crescente, é necessário passar a função a seguir:

const points = [40, 100, 1, 5, 25, 10];
points.sort((a, b) => a - b);
console.log(points); // [1, 5, 10, 25, 40, 100]

/*A lógica é a seguinte: a função recebe, da sort , todos os elementos do array, em pares (elemento1, elemento2) , e vai comparando-os. O formato é meuArray.sort((elemento1, elemento2) =>  logica da função ) . Ou seja: para o array [1, 2, 3, 4] , a função receberá (2, 1) , (3, 2) , (4, 3) como parâmetros e ordenará o array com base em seu resultado. Se a operação de elemento1 com elemento2 der resultado negativo, elemento1 vai para trás. Caso contrário, vai para frente, para, de forma decrescente, só inverter elemento1 - elemento2 para elemento2 - elemento1 . Novamente, o artigo do MDN é uma excelente fonte de informação para entender melhor.
https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

Veja agora se realizarmos uma simples modificação no retorno da função que ordena os números e veja o que acontece:*/

const points = [40, 100, 1, 5, 25, 10];
points.sort((a, b) => b - a);
console.log(points); // [ 100, 40, 25, 10, 5, 1 ]

// Para visualizar como o sort funciona, brinque com este exemplo feito no CodePen. https://codepen.io/pen/?template=gOMYaXy

// Para fixar
// 1 - Utilize a sort para ordenar o array pela idade das pessoas em ordem crescente .

const people = [
  { name: 'Mateus', age: 18 },
  { name: 'José', age: 16 },
  { name: 'Ana', age: 23 },
  { name: 'Cláudia', age: 20 },
  { name: 'Bruna', age: 19 },
];

// people.sort((personA, personB) => personA.age - personB.age)
// console.log(people);

// 2 - Modifique o sort do exercício anterior para que ordene o array pela idade das pessoas em ordem decrescente .

people.sort((personA, personB) => personB.age - personA.age)
console.log(people);
