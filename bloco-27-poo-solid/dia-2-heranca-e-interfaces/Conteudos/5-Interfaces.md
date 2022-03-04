## Implementando interfaces

Ao utilizarmos herança, geralmente queremos garantir o funcionamento de uma subclasse onde uma superclasse é esperada.

Existem diversas outras utilidades de herança, mas se o que se almeja é só firmar um contrato , no qual uma classe deve obrigatoriamente possuir alguns atributos e implementar alguns métodos, pode ser interessante utilizar uma interface .

A interface especifica quais componentes uma determinada entidade deve possuir/implementar. No caso de Orientação a Objetos, essa entidade é uma classe. Importante ressaltar que, diferentemente do que acontece ao herdar uma classe, não podemos deixar nenhum método já implementado em uma interface, portanto a classe que implementa uma interface vai sempre obrigatoriamente ter que implementar todos os métodos declarados na interface.

interface Animal {
  name: string;
  getBirthDate(): Date;
  age: number;
}

class Bird implements Animal {
  private _birthDate;
  constructor(public name: string, birthDate: Date) {
    this._birthDate = birthDate;
  }
  get age() {
    return new Date().getFullYear() - this._birthDate.getFullYear();
  }
  getBirthDate() {
    return this._birthDate;
  }
  fly() { console.log(`${this.name} está voando!`); }
}

const d1 = new Date();
d1.setFullYear(2015);
const b1 = new Bird('Papagaio', d1);
console.log(b1.age);
b1.fly();

/*
Saída (código executado em 2021):

Papagaio está voando!
*/

Observe que a interface é implementada por uma classe por meio da sintaxe class Classe implements Interface .

Importante salientar que a interface é um contrato de tudo que a classe deve possuir de forma pública.

Atributos privados precisam ter seu correspondente público, e você pode usar getters e setters como uma forma pública de acessar atributos privados.

Observe também que a classe Ave possui o método voar , não definido pela interface. A classe deve possuir todos atributos e métodos definidos na interface, mas não necessariamente se limitar a eles 😉.

## Para fixar:

Crie uma interface chamada MyInterface .
MyInterface deve possuir um atributo myNumber do tipo number .
MyInterface deve possuir um método myFunc , que recebe um parâmetro myParam do tipo number e retorna uma string .
Crie uma classe MyClass que implementa MyInterface .
Faça o atributo myNumber ser inicializado diretamente nos parâmetros do construtor da MyClass .
Faça o método myFunc somar o myNumber com o myParam e retornar uma string qualquer que contenha a soma.
Crie um objeto da classe MyClass e o utilize acessando myNumber e chamando myFunc .
