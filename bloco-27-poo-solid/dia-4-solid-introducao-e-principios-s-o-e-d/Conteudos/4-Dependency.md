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

## Inversão de Dependência

Vimos que
Entidades de alto nível não devem depender de entidades de baixo nível. Ambos devem depender de abstrações.

E que
Se uma função ou classe de alto nível (vamos chamar de H ) utiliza outra função ou classe de mais baixo nível (vamos chamar de L ) em seu interior, L deve ser passada para H por quem chama/usa H , e não estar explicitamente instanciada dentro de H .

Complementando com a Inversão de Dependência: H não deve esperar especificamente L , mas sim uma abstração qualquer (vamos chamar de A ), que geralmente é uma interface, que L deve respeitar. Isso faz com que, caso queiramos passar algo diferente de L para H , vamos supor uma L2 , desde que L2 também implemente A , não haverá problemas.

Ainda há confusão? 🤔 Vamos seguir com o exemplo.

Imagine que agora a pessoa precisa tocar não só flauta, mas também bateria e violão, bem como alguns outros instrumentos que podem ser criados no futuro. O código fica assim:

interface Instrument {
  name: string;
  play(): void;
}

class Flute implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está emitindo melodias`);
  }
}

class Drums implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está fazendo o ar vibrar bem forte`);
  }
}

class Guitar implements Instrument {
  constructor(public name: string) { }

  public play(): void {
    console.log(`${this.name} está vibrando suas cordas`);
  }
}

class Musician {
  constructor(
    public name: string,
    public instrument: Instrument = new Flute('Minha flauta')
  ) { }

  play() {
    this.instrument.play();
    console.log(
      `"${this.name}" é quem está comandando a emissão dos sons`
    );
  }
}

const musician1 = new Musician('Márcia');
const musician2 = new Musician('Vicente', new Drums('Minha bateria'));
const musician3 = new Musician('Natan', new Guitar('Meu violão'));

musician1.play();
musician2.play();
musician3.play();

### Para fixar

Faça as adequações necessárias no construtor da classe ReadingTracker , de forma que ele passe a respeitar o Princípio da Inversão de Dependência (DIP) .

interface Notificator {
  sendNotification(message: string): void;
}

class ConsoleNotification implements Notificator {
  sendNotification(message: string) {
    console.log(`Here we go again! - ${message}`);
  }
}

class EmailNotification implements Notificator {
  private email: string;
  constructor(email: string) {
    this.email = email;
  }
  sendNotification(message: string) {
    console.log(
      `Here should go the implementation to send notification to the email: ${this.email} - ${message}`
    );
  }
}

class PhoneNotification implements Notificator {
  private phone: number;
  constructor(phone: number) {
    this.phone = phone;
  }
  sendNotification(message: string) {
    console.log(
      `Here should go the implementation to send notification to the phone ${this.phone} - ${message}`
    );
  }
}

export class ReadingTracker {
  private readingGoal: number;
  private booksRead: number;
  notificator: Notificator;
  
  constructor(readingGoal: number,  email: string) {
    this.notificator = new EmailNotification(email);
    this.readingGoal = readingGoal;
    this.booksRead = 0;
  }

  trackReadings(readsCount: number) {
    this.booksRead += readsCount;
    if (this.booksRead >= this.readingGoal) {
      this.notificator.sendNotification(
        "Congratulations! You've reached your reading goal!"
      )
      return;
    }
    this.notificator.sendNotification("There are still some books to go!");
  }

  // Aqui viriam mais métodos, que fogem o escopo deste exercício 
}

## DIP Conclusão

Por mais que a ideia seja ter funções autocontidas, dependências sempre existirão. A inversão de dependência faz com que o acoplamento entre as entidades seja o menor possível.

Como foi visto, no final do exemplo era possível passar qualquer objeto de qualquer classe, desde que esta implementasse o método play e que possuísse um atributo name . Isso faz com que seja possível criar diversos outros instrumentos para atender às necessidades da classe Musician , como por exemplo piano, violino, etc.

No contexto de desenvolvimento web, podemos imaginar que uma pessoa que é cliente do seu sistema precisa receber uma notificação quando um item que ela comprou tenha saído para a entrega. Essa notificação pode ser via e-mail, SMS, whatsapp, etc.

Supondo que o primeiro tipo de notificação implementado tenha sido o por e-mail, melhor do que criar o objeto EmailNotificator dentro da compra é passar um objeto que respeite a interface Notificator . Além disso, fazer EmailNotificator , SMSNotificator e WhatsappNotificator implementarem a interface Notificator .

Com isso fica fácil trocar de uma forma de notificação para outra. E se no futuro um TelegramNotificator seja criado, vai ser muito simples de utilizar a novidade sem sequer alterar a classe da compra que já está configurada para receber qualquer Notificator .

Não é pra esquecer que podemos passar um Notificator mockado para testar a classe de compra unitariamente 😄.
