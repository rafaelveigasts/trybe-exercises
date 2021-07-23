// Para começar, veja o exemplo abaixo de um objeto que contém as informações de um cliente de uma loja:

const customer = {
  firstName: 'Roberto',
  age: 22,
  job: 'Teacher',
};

// Imagine um cenário em que você precisa completar as informações do cliente adicionando uma nova propriedade para armazenar seu sobrenome. Uma das formas já vistas até então é reescrever o objeto, dessa vez já com a nova propriedade lastName .
const customer = {
  firstName: 'Roberto',
  lastName: 'Faria', // Propriedade adicionada.
  age: 22,
  job: 'Teacher',
};

const customer1 = {
  firstName: 'Roberto',
  age: 22,
  job: 'Teacher',
};

console.log(customer1);

customer1.lastName = 'Faria';
console.log(customer1);

const customer2 = {
  firstName: 'Maria',
  age: 23,
  job: 'Medic',
};

console.log(customer2);
customer2['lastName'] = 'Silva';
console.log(customer2);
// Existem também outras formas de adicionar essa propriedade de maneira muito mais simples e prática, sem a necessidade de reescrever o objeto e suas propriedades. Veja o exemplo abaixo:
const customer1 = {
  firstName: 'Roberto',
  age: 22,
  job: 'Teacher',
};

console.log(customer1);

customer1.lastName = 'Faria';
console.log(customer1);

const customer2 = {
  firstName: 'Maria',
  age: 23,
  job: 'Medic',
};

console.log(customer2);
customer2['lastName'] = 'Silva';
console.log(customer2);

// Agora, suponha que seja necessário adicionar algumas novas propriedades ao objeto, como a naturalidade, a data de nascimento e o estado civil.
// Essas novas propriedades serão adicionadas de acordo com o valor de algumas variáveis.

const customer = {
  firstName: 'Roberto',
  age: 22,
  job: 'Teacher',
};

let newKey = 'lastName';
const lastName = 'Ferreira';
customer[newKey] = lastName;
newKey = 'fullName';
const fullName = `${customer.firstName} ${customer.lastName}`;
customer[newKey] = fullName;
console.log(customer);

// No exemplo acima, você viu que há diferentes formas de associar chaves e valores a um objeto.

// Agora, para praticar, crie uma função que receba três parâmetros, sendo eles: um objeto, o nome de uma chave e o seu valor. O retorno dessa função deve ser o objeto já com a nova chave adicionada nele.


const pessoa = {
  nome: 'Rafael',
};

function a (objeto, chave, valor) {
  let novaChave = chave;
  objeto[novaChave] = valor
}

console.log(a(pessoa, 'sobrenome', 'veiga'))