## Dependency Inversion Principle

Foi visto que o Princípio de Inversão de Dependência diz o seguinte:

Entidades de alto nível não devem depender de entidades de baixo nível. Ambos devem depender de abstrações.

Para entender melhor o esse princípio, vamos começar compreendendo o que é uma dependência, e em seguida um padrão de projeto chamado Injeção de Dependência .

## Dependência

A dependência ocorre quando uma entidade de software (geralmente uma classe ou função) utiliza outra entidade em seu interior. Por exemplo, se temos uma pessoa que toca uma flauta, teremos uma classe Musician que depende de uma classe Flute . Isto acontece pois dentro de Musician precisaremos de um objeto da classe Flute para ser tocado.

## Injeção de Dependência

Pensando no exemplo de Musician e Flute , é natural que pensemos em instanciar uma nova Flute dentro de Musician . 

Algo como isso aqui:

class Flute {
  constructor(public name: string) { }
  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Musician {
  flute: Flute

  constructor(public name: string) {
    this.flute = new Flute('minha flauta');
  }

  play() {
    this.flute.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão das melodias`
    );
  }
}

const musician = new Musician('Márcia');
musician.play();

