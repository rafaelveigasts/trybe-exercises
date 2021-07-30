// Estrutura das HOFs em Arrays
// As Higher Order Functions que veremos hoje são parecidas entre si: elas mudam em alguns pontos específicos, mas todas possuem a mesma estrutura. Para demonstrar, olhe o exemplo de uma HOF que imprime na tela cada valor do array:

const arrayOfValues = ['josé', 50, 0.25, { comida: 'Chocolate' }];
arrayOfValues.forEach((element) => {
  console.log('Cada elemento do array:', element);
});

// Cada elemento do array: josé
// Cada elemento do array: 50
// Cada elemento do array: 0.25
// Cada elemento do array: { comida: 'Chocolate' }

// Sua estrutura:

arrayOfValues.forEach((element) => {
  console.log('Cada elemento do array:', element);
});

// Suas partes:
// arrayOfValues - Nome do array que será percorrido;
// .forEach - A HOF , pode ser, .find , .some , .every ;
// element - Valor do elemento do array;
// (element) => {console.log('Cada elemento do array:', element); - função a ser executada, pode ser passada igual ao terceiro exemplo do conteúdo com a função verifyGrade .
// É isso mesmo! Quando você passa uma arrow function para uma HOF , o primeiro parâmetro que essa arrow function recebe é o elemento do array. Em português, é como se:

meuArray.forEach((elemento) => {
  if (elemento % 2 === 0) {
    console.log(`${elemento} é divísivel por 2!`);
  }
});

// Significasse Verifique se cada elemento do meu array é múltiplo de 2 .
// Uma função como meuArray.find(elemento => elemento % 5 === 0) , por outro lado, seria Encontre o primeiro elemento de meuArray que é múltiplo de cinco .
// Ficou mais claro agora? A própria Higher Order Function se encarrega da lógica de pegar cada elemento do array e passar como parâmetro para a arrow function . Com for você faria isso manualmente, a proposta aqui é a HOF fazer pra você! Sua única preocupação deve ser "O que eu quero fazer com cada elemento do array?", e não "Como eu acesso cada elemento do array?".
// Observe abaixo que podemos passar mais de um parâmetro para a função também. As HOFs disponibilizam para você, caso precisar, acesso a mais informações do array:

const arrayOfValues = ['josé', 50, 0.25, { comida: 'Chocolate' }];
arrayOfValues.forEach((element, indexOfTheArray, theEntireArray) => {
  console.log('Cada elemento do array:', element);
  console.log('Index, posição do elemento:', indexOfTheArray);
  console.log('Array percorrido:', theEntireArray);
});

// => ---------------
//   Cada elemento do array: josé
//   Index, posição do elemento: 0
//   Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]
//   ---------------
//   Cada elemento do array: 50
//   Index, posição do elemento: 1
//   Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]
//   ---------------
//   Cada elemento do array: 0.25
//   Index, posição do elemento: 2
//   Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]
//   ---------------
//   Cada elemento do array: { comida: 'Chocolate' }
//   Index, posição do elemento: 3
//   Array percorrido: [ 'josé', 50, 0.25, { comida: 'Chocolate' } ]

// A arrow function passada para o forEach possui element , index e array como parâmetros, onde:
// element - Valor do elemento do array;
// index - Índice em cada iteração ou posição do elemento no array, começando do 0;
// array - Array original que está sendo percorrido.
// Agora que já aprendeu sobre a estrutura, vamos nos aprofundar em cada uma das HOF .

// Array.prototype.forEach()

// Descrição
// O forEach executa o callback fornecido uma vez para cada elemento da ordem com um valor atribuido. Ele não é invocado para propriedades de índices que foram deletados ou que não foram inicializados (por ex. em arrays esparsos).

// callback é invocado com três argumentos:

// o valor do elemento
// o índice do elemento
// o array que está sendo percorrido
// Se um parâmetro thisArg for passado para forEach(), ele será passado para o callback  quando invocado como valor para this.  Caso contrário, o valor undefined será passado como valor para this. O valor de this assumido no callback é determinado de acordo com as regras usuais para determinação do this visto por uma função.

// O intervalo dos elementos processados por forEach() é determinado antes da primeira invocação do callback. Elementos que forem adicionados ao array depois da chamada ao forEach() começar não serão visitados pelo callback. Se os valores dos elementos existentes do array forem alterados, o valor passado para o callback será o valor no momento em que o forEach() visitá-los; elementos que forem deletados antes de serem visitados não serão visitados.

// forEach() executa a a função callback uma vez para cada elemento do array – diferentemente de map() ou reduce(), ele sempre retorna o valor undefined e não é encadeável. O caso de uso típico é alterar o array no final do loop.

// O método forEach() executa uma dada função em cada elemento de um array.

// Sintaxe
// arr.forEach(callback(currentValue [, index [, array]])[, thisArg]);

// Parâmetros
// callback
// Função para executar em cada elemento, recebendo três argumentos:

// currentValue
// O valor atual do elemento sendo processado no array.

// index Optional
// O índice do elemento atual sendo processado no array.
// array Optional

// O array que forEach() está sendo aplicado.
// thisArg Optional

// Opcional. Valor a ser usado como this quando executar callback.
// Valor retornado
// undefined.

// A única maneira de parar ou interromper um loop forEach() é disparando uma exceção. Se você precisa desse recurso, o método forEach() é a ferramenta errada. Você estará mais bem servido com um loop simples nesse caso. Se estiver testando o array de elementos para um predicado e precisar de um valor de retorno Boleano, você pode usar every() ou some(). Se estiverem disponíveis, os novos métodos find() e findIndex() também podem ser usados para terminação antecipada em predicados verdadeiros.