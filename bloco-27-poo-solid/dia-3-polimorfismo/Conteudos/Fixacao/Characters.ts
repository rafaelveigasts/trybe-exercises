/* 
Crie uma classe abstrata Character que tenha os métodos abstratos talk(): void e specialMove(): void .

Crie a classe concreta MeleeCharacter que estenda Character e sobrescreva os métodos abstratos dessa classe.

Crie a classe concreta LongRangeCharacter que estenda Character e sobrescreva os métodos abstratos dessa classe.

Crie uma função que receba como parâmetro character: Character e chame os métodos talk e specialMove para apresentar o personagem.
 */

abstract class Characters {
  abstract talk():void
  abstract specialMove():void
}

class MeleeCharacter extends Characters {
  constructor(
    private name: string, 
    private specialMoveName: string) {
    super()
  }

  talk(): void {
    console.log(`${this.name} attacks at close range`);
  }

  specialMove(): void {
    console.log(`${this.name} uses ${this.specialMoveName}`);
  }
}

class LongRangeCharacter extends Characters {
  constructor(
    private name: string, 
    private specialMoveName: string) {
    super()
  }

  talk(): void {
    console.log(`${this.name} attacks at long range`);
  }

  specialMove(): void {
    console.log(`${this.name} uses ${this.specialMoveName}`);
  }
}

function characterPresentation( character: Characters ) {
  character.talk()
  character.specialMove()
}

const ryu = new MeleeCharacter('Ryu', 'Hadouken')
const ken = new LongRangeCharacter('Ken', 'Shoryuken')

characterPresentation(ryu)
characterPresentation(ken)