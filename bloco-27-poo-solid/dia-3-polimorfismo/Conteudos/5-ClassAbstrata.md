## Classe abstrata e método abstrato

Por vezes, criamos classes que devem possuir métodos pensados para ser criados em subclasses.

A ideia é que a superclasse, mais genérica, não deve fazer ideia de como esse método deve funcionar, apenas saber que ele existe.

Isso é o mesmo que quando há uma implementação de interface, com a diferença na interface nenhum método é implementado, e aqui queremos selecionar alguns métodos para que não sejam implementados.

Para isso, utilizamos classes abstratas, e estas possuem métodos abstratos.

As **classes abstratas não podem ser instanciadas** , ou seja, você não pode criar um objeto a partir de uma classe abstrata.

**Métodos abstratos só podem existir em classes abstratas** , e eles devem ser implementados na subclasse.

Vamos ao exemplo:

/*
Dicionário en-pt:
- fish: peixe
*/

abstract class Animal {
  constructor(public name: string) { }
  abstract move(): void
}

class Bird extends Animal {
  move() { console.log(`${this.name} está voando.`); }
}

class Mammal extends Animal {
  move() { console.log(`${this.name} está andando.`); }
}

class Fish extends Animal {
  move() { console.log(`${this.name} está nadando.`); }
}

const a = new Fish('Tubarão');
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
Tubarão está nadando.
Papagaio está voando.
Tatu está andando.
*/