## Composição

A ideia de herança é muito boa para reuso de código. Entretanto, deve-se tomar cuidado com o uso indevido.

Utilizamos herança sempre que queremos especializar uma classe, ou seja, deixar ela mais específica. É bem simples: basta se perguntar se subclasse é um tipo de superclasse . Se a resposta for não, então não devemos utilizar herança.

Por exemplo, imagine a classe (ou classe abstrata/interface) Database (banco de dados). Faz sentido que uma classe chamada MySQLDatabase herde (ou implemente) Database , visto que MySQLDatabase é um tipo de Database .

Agora imagine que você possui no contexto de um jogo de xadrez, um tabuleiro e as peças em suas posições. Além disso, lhe é solicitado que o tabuleiro tenha um método save , que o salva em um banco de dados. Não faz sentido que a classe Board (tabuleiro) (nem a classe ChessBoard , tabuleiro de xadrez) herde da classe Database , visto que um tabuleiro não é um tipo de banco de dados. O correto neste caso seria utilizar composição, o que daria algo mais ou menos assim:

interface Board {
  save(): void;
  // ...
}

class GenericBoard implements Board {
  // Finja que faz sentido as casas do tabuleiro serem um array de strings
  constructor(public houses: string[], protected database: Database) {}

  public save() {
    this.database.save(this.houses);
  }
}

class ChessBoard extends GenericBoard {
  constructor(
    public houses: string[],
    protected database: Database,
    // Parâmetros específicos de um tabuleiro de xadrez
  ) {
    // Implementação específica de um tabuleiro de xadrez
  }
}

interface Database {
  save(content: any): void;
  // ...
}

class MySQLDatabase implements Database {
  private connection: MySQLConnection; // Uma conexão fictícia com o banco
  // ...
  save(content: any) {
    // Uma query fictícia para salvar o conteúdo no banco
    this.connection.query(`INSERT INTO table_name VALUES (${content})`);
  }
}

const db = new MySQLDatabase();
const board = new ChessBoard(['A1', 'A2', 'B1', 'B2'], db);
board.save();

## Para fixar:
Crie uma interface Logger .
Logger deve possuir um método log , que recebe um parâmetro do tipo string e não retorna nada ( void ).
Crie uma classe ConsoleLogger que implementa Logger . Você deve imaginar como o método log deve ser implementado, né? 😁.
Crie uma classe ConsoleLogger2 igual à classe anterior, apenas a título de exemplo.
No console.log dentro do método log , diferencie o ConsoleLogger2 do ConsoleLogger .
Crie uma interface Database .
Database deve possuir um atributo do tipo Logger .
Database deve possuir um método save , que recebe dois parâmetros, key e value , ambos strings , e não retorna nada ( void ).
Crie uma classe ExampleDatabase que implementa Database .
ExampleDatabase deve receber o Logger como parâmetro do construtor, e possuir como valor padrão um ConsoleLogger .
Dentro do método save , chame a função log do Logger passado para o database para fazer o log dos parâmetros passados para a save .
Crie um objeto de cada um dos Loggers .
Crie três objetos da ExampleDatabase , cada um dos dois primeiros recebendo um dos Loggers , e o último não recebendo nenhum.
Utilize todos eles para salvar um conteúdo fictício.
