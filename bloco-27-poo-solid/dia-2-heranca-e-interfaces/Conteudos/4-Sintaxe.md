## Sintaxe geral

Vamos começar criando uma classe Animal e uma classe Mamífero, que herda de animal, e brincando um pouco com o uso.

Como são muitos termos específicos em inglês, para este caso em específico será disponibilizado um dicionário informal:

age: idade
birth date: data de nascimento
full year: ano completo (os 4 dígitos)
mammal: mamífero
name: nome
walk: andar
year: ano
 

class Animal {
  /*
    Ao invés de declarar os atributos antes do construtor, receber parâmetros 
    no construtor e colocá-los nos atributos da classe, se não formos 
    validar, podemos utilizar uma forma simplificada de escrita, simplesmente
    colocando o modificador de visibilidade na frente
    do nome do parâmetro no construtor

    Exemplo
    O seguinte código:

    public x: number
    constructor(x: number) { this.x = x }

    Pode ser substituído por:

    constructor(public x: number) { }
  */
  constructor(public name: string, private birthDate: Date) { }

  get age() {
    const today = new Date();
    let age = today.getFullYear() - this.birthDate.getFullYear();

    if (today.getMonth() - this.birthDate.getMonth() <= 0 && today.getDate() <= this.birthDate.getDate()) {
      age--;
    }
    return age;
  }
}

class Mammal extends Animal {
  walk() {
    console.log(`${this.name} está andando!`);
  }
}

const d1 = new Date();
d1.setFullYear(2015);
const m1 = new Mammal('Tatu', d1);

const myFunc = (animal: Animal) => {
  console.log(animal.age);
}

myFunc(m1);
m1.walk();

/*
Saída (código rodado em 2021):

Tatu está andando!
*/

A sintaxe para criar uma classe que herda outra é bem simples, basta utilizar a palavra reservada extends .

Observe que a função myFunc recebe um parâmetro do tipo Animal , mas é passado um objeto da classe Mammal , e o código funciona perfeitamente.

Entretanto, não é possível acessar algo específico da classe Mamífero neste mesmo contexto:

const myFunc = (animal: Animal) => {
  console.log(animal.age);
  animal.walk(); // Erro, pois a classe Animal não possui o método walk
}

myFunc(m1);

Nada nos impede de criar uma nova classe Ave ( Bird ) que também herda de Animal e utilizá-la de forma similar, mas com suas especificidades (neste caso o método fly , voar):

class Bird extends Animal {
  fly() {
    console.log(`${this.name} está voando!`);
  }
}

const d2 = new Date();
d2.setFullYear(2017);

const b1 = new Bird('Papagaio', d2);
console.log(b1.age);
b1.fly();

/*
Saída (código executado em 2021):

Papagaio está voando!
*/

Para fixar:
Que tal exercitar a sintaxe um pouco, com um breve exercício bem simples? Juro que parece muita coisa, mas não é!
Crie uma classe chamada Superclass .
A Superclass deve possuir um atributo público isSuper
isSuper deve ser setado como true na inicialização.
A Superclass deve possuir um método público chamado sayHello , que deve imprimir um "Olá mundo!".
Crie uma classe chamada Subclass que herda da Superclass .
Crie uma função fora do escopo da Subclass que recebe um objeto da Superclass .
Dentro da função, chame o método sayHello do objeto passado como parâmetro.
Crie um objeto da Superclass e outro da Subclass .
Chame a função 2 vezes, passando os objetos criados.
Vamos agora a alguns tópicos um pouco mais avançados, atributos protegidos e o uso do super .


## Atributos protegidos

Observe que temos, na classe Animal um atributo privado dataDeNascimento .
Você não pode acessar ou alterar este atributo fora da classe Animal .

class Animal {
  constructor(private birthDate: Date) { } // Repare no private

}
class Bird extends Animal {
  showBirthDate() {
    console.log(this.birthDate); // ERRO!
  }
}

Entretanto, as vezes precisamos manter alguns atributos e métodos privados do mundo externo , mas possíveis de serem modificados dentro de subclasses.

É aí que entra o protected .

class Animal {
  constructor(protected birthDate: Date) { } // Repare no protected

}
class Bird extends Animal {
  showBirthDate() {
    console.log(this.birthDate); // Okay!
  }
}

Para fixar:
Com base no exemplo do exercício anterior:
Comente a chamada da função passando o objeto da Superclass .
Faça a função receber não mais um objeto da Superclass , mas sim da Subclass .
Crie, na Subclass , um método público chamado sayHello2 .
Chame o método sayHello dentro do método sayHello2 .
Mude a visibilidade do método sayHello de public para protected .
Ao mudar a visibilidade, o compilador (ou o vs code) vai mostrar um erro. Conserte esse erro utilizando o novo método sayHello2 .
Mude a visibilidade do método sayHello de protected para private . O que acontece?
Desfaça estas alterações (ou seja, volte para como era ao final do primeiro exercício) antes de fazer o próximo exercício.

## Super
Para Fixar
Com base no final do primeiro exercício de fixação.
No construtor da Subclass , o atributo isSuper deve ser setado como false . Você vai precisar utilizar o super .
Dentro da função que recebe um objeto da Superclass como parâmetro, cheque o valor do atributo isSuper e imprima no console "Super!" se for true e "Sub!" se for false ;
