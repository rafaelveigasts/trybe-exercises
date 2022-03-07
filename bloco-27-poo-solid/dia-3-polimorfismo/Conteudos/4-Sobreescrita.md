## Sintaxe com classes

Sobrescrita de método
Considere o seguinte exemplo:

class Animal {
  constructor(public name: string) { }
  move() { console.log(`${this.name} está se movendo.`); }
}

class Bird extends Animal {
  move() { console.log(`${this.name} está voando.`); }
}

class Mammal extends Animal {
  move() { console.log(`${this.name} está andando.`); }
}

const a = new Animal('Tubarão');
const b = new Bird('Papagaio');
const m = new Mammal('Tatu');

const myMove = (animal: Animal) => {
  animal.move();
}

myMove(a);
myMove(b);
myMove(m);

/*
Saída:
Tubarão está se movendo.
Papagaio está voando.
Tatu está andando.
*/

Observe que myMove recebe como parâmetro um animal da classe Animal e chama o método move .

Conforme você viu na aula passada, sabe que podemos passar uma subclasse quando uma superclasse é esperada, visto que ela possui todos os métodos que a superclasse possui.

Neste caso em específico, as classes Ave e Mamífero sobrescrevem o método move da classe Animal , e quando passamos um objeto de uma dessas classes, uma implementação diferente do método move é utilizado.

## Uso do super

Ontem você viu como utilizar o super para chamar o construtor da superclasse dentro da subclasse.

Uma outra coisa que você pode fazer é, ao sobrescrever um método qualquer, chamar a implementação dele na superclasse por meio do super .

Como que faz? 🤔 Assim:

class Animal {
  constructor(public name: string) { }
  move() { console.log(`${this.name} está se movendo.`); }
}

class Bird extends Animal {
  move() {
    **super.move();**
    console.log(`${this.name} está voando.`);
  }
}

class Mammal extends Animal {
  move() { console.log(`${this.name} está andando.`); }
}

const a = new Animal('Tubarão');
const b = new Bird('Papagaio');
const m = new Mammal('Tatu');

const myMove = (animal: Animal) => {
  animal.move();
}

myMove(a);
myMove(b);
myMove(m);

/*
Saída:
Tubarão está se movendo.
Papagaio está se movendo.
Papagaio está voando.
Tatu está andando.
*/

Observe a chamada super.move() dentro de move , na classe Ave .

É importante salientar que você pode chamar outros métodos da superclasse (caso existam), e não só o mesmo no qual você está na subclasse. Por exemplo, se a classe Animal tivesse, além do método move , um método sleep , dentro do método move na classe Ave você pode chamar o método sleep da classe Animal digitando super.sleep() .