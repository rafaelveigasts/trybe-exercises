// Crie uma classe chamada _Superclass_.
class Superclass {
  // A _Superclass_ deve possuir um atributo público _isSuper_.
  isSuper: boolean;

  constructor() {
    // _isSuper_ deve ser setado como `true` na inicialização.
    this.isSuper = true;
  }

  // A _Superclass_ deve possuir um método público chamado `sayHello`, que deve imprimir um "Olá mundo!".
  protected sayHello(): void {
    console.log('Olá mundo!');
  }
}

// Crie uma classe chamada _Subclass_ que herda da _Superclass_.
class Subclass extends Superclass {
  public sayHello2(): void {
    // O método `sayHello` deve ser chamado.
    this.sayHello();
  }
 }

// Crie uma função que recebe um objeto da _Superclass_.
const myFunc = (object: Subclass) => {
  // Dentro da função, chame o método `sayHello` do objeto passado como parâmetro.
  object.sayHello2();
};

// Crie um objeto da _Superclass_ e outro da _Subclass_.
const sup = new Superclass();
const sub = new Subclass();

// Chame a função 2 vezes, passando os objetos criados.
// myFunc(sup);
myFunc(sub);

/* Para fixar:
Com base no exemplo do exercício anterior:
Comente a chamada da função passando o objeto da Superclass .
Faça a função receber não mais um objeto da Superclass , mas sim da Subclass .
Crie, na Subclass , um método público chamado sayHello2 .
Chame o método sayHello dentro do método sayHello2 .
Mude a visibilidade do método sayHello de public para protected .
Ao mudar a visibilidade, o compilador (ou o vs code) vai mostrar um erro. Conserte esse erro utilizando o novo método sayHello2 .
Mude a visibilidade do método sayHello de protected para private . O que acontece?
Desfaça estas alterações (ou seja, volte para como era ao final do primeiro exercício) antes de fazer o próximo exercício. */

