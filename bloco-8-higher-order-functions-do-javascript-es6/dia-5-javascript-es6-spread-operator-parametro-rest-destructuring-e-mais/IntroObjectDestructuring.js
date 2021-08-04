/* 
Object Destructuring
Você certamente já precisou extrair valores de um objeto em Javascript. No exemplo abaixo, como você faria para imprimir o valor de cada propriedade do objeto product ? 
*/
const product = {
  name: 'Smart TV Crystal UHD',
  price: '1899.05',
  seller: 'Casas de Minas',
};

/* 
Uma forma seria acessar os valores utilizando a notação de objeto, como console.log(product.name) , e repetir para cada propriedade. Essa tarefa é repetitiva e verbosa...quando lidamos com objetos mais complexos, ela seria até mesmo impraticável. Para a nossa alegria o ES6 introduz mais um recurso para tornar atividades corriqueiras, como acessar os valores de um objeto, mais simples e com menos declarações. Essa feature é o que chamamos de desestruturação de objeto ou object destructuring .
E como exatamente funciona a desestruturação de objeto? Vamos voltar ao exemplo do objeto product . A sintaxe da desestruturação de objetos pede para passarmos o nome das propriedades que queremos acessar do lado esquerdo, entre chaves, e o objeto do lado direito:
 */
const { name } = product;
console.log(name); // Smart TV Crystal UHD

// Se quisermos pegar, além do nome, o vendedor do produto, podemos incluir a propriedade seller dentro das chaves para acessar o seu valor correspondente:
const { name, seller } = product;
console.log(name); // Smart TV Crystal UHD
console.log(seller); // Casas de Minas

/* 
Dessa forma, conseguimos extrair o valor da propriedade que precisamos acessar com muito menos código, atribuindo este valor à variáveis. Vale lembrar também que podemos adicionar quantas propriedades forem necessárias dentro das chaves, basta seguirmos a sintaxe da desestruturação de objetos.
Outro truque legal dessa feature é que você pode reatribuir o nome da propriedade que deseja acessar ao declará-la como uma variável. Acompanhe o exemplo abaixo.
*/

const student = {
  a: 'Maria',
  b: 'Turma B',
  c: 'Matematica',
};

/* 
As propriedades do objeto student não são nada descritivas, não é mesmo? Se fossemos desestruturar esse objeto, as variáveis que seriam criadas ao extrair as propriedades de students teriam nomes sem significado...pensando nisso, podemos trocar o nome da variável ao fazermos a desestruturação:
 */

const student = {
  a: 'Maria',
  b: 'Turma B',
  c: 'Matematica',
};

const { a: name, b: classAssigned, c: subject } = student;

console.log(name); // Maria
console.log(classAssigned); // Turma B
console.log(subject); // Matemática

// Nesse exemplo, informamos qual a propriedade que gostaríamos de acessar e a declaramos em uma nova variável seguindo a sintaxe: { propriedade:nomeVariável } = objeto . Essa forma de acessar um valor de um objeto e atribuí-lo a uma variável é equivalente ao que temos abaixo:
const student = {
  a: 'Maria',
  b: 'Turma B',
  c: 'Matematica',
};
const name = student.a;
console.log(name); // Maria

/* 
Você deve estar se perguntando: o que acontece quando tento acessar um campo inexistente? Experimente fazer esse teste! Como sabemos, o Javascript não vai conseguir fazer essa associação porque esse campo não existe e a variável receberá o valor undefined .
Por fim, uma outra situação que podemos usar a desestruturação de objetos é quando queremos passar os valores de um objeto como parâmetros para uma função, como no exemplo abaixo:
*/

const product = {
  name: 'Smart TV Crystal UHD',
  price: '1899.05',
  seller: 'Casas de Minas',
};

const printProductDetails = ({ name, price, seller }) => {
  console.log(`Promoção! ${name} por apenas ${price} é só aqui: ${seller}`);
};

printProductDetails(product); // Promoção! Smart TV Crystal UHD por apenas 1899.05 é só aqui: Casas de Minas