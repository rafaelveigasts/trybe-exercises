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

O problema desta abordagem é que a gente fixa um determinado objeto como dependência. Isso cria um alto acoplamento e faz com que o código fique difícil de ser testado e de ser utilizado em outros lugares e contextos. Se você fizer um teste de Musician.play() este teste vai ser, obrigatoriamente, um teste de integração, pois o método Flute.play() também será executado.

Para possibilitar o uso de um mock nos testes, bem como diminuir o acoplamento, vem para nos ajudar a Injeção de Dependências:

Se uma função ou classe de alto nível (vamos chamar de H ) utiliza outra função ou classe de mais baixo nível (vamos chamar de L ) em seu interior, L deve ser passada para H por quem chama/usa H , e não estar explicitamente instanciada dentro de H .

Voltando para o exemplo, um objeto da classe Flute deve ser passado no construtor da classe Musician .


class Flute {
  constructor(public name: string) { }
  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Musician {
  // Agora a flauta é recebida como parâmetro
  constructor(public name: string, public flute: Flute) { }

  play() {
    this.flute.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão das melodias`
    );
  }
}

const flute = new Flute('Minha flauta');
const musician = new Musician('Márcia', flute);
musician.play();

Com isso podemos passar uma flauta "fake", mockada, para Musician , e assim testar unitariamente o método Musician.play() .

Se quisermos podemos deixar um valor padrão, fazendo com que seja possível não passar uma flauta criada externamente e ainda assim o código funcione.

class Flute {
  constructor(public name: string) { }
  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Musician {
  // Agora o parâmetro da flauta tem um valor padrão caso nenhuma seja passada
  constructor(
    public name: string,
    public flute: Flute = new Flute('Minha flauta')
  ) { }

  play() {
    this.flute.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão das melodias`
    );
  }
}

const musician = new Musician('Márcia');
musician.play();