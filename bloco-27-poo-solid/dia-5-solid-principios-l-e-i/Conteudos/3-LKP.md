## Liskov Substitution Principle

O Princípio de Substituição de Liskov diz que:
Objetos em um programa devem ser substituíveis por instâncias de seus subtipos, sem alterar a funcionalidade do programa.

Isso quer dizer que se você possui uma superclasse A e uma subclasse B , onde quer que A seja esperada, se B for passada seu programa deve se comportar da mesma forma.

Podemos estender isso para uma interface (já que uma interface pode ser vista como uma classe abstrata com todos os métodos e elementos públicos, e nenhum método implementado): se A é uma interface, e B é uma classe que implementa A , onde quer que seja esperada algo do tipo A , se B for passada seu programa deve se comportar da mesma forma.

Se uma terceira classe, a C , herda de A também, onde A é esperada podemos colocar tanto B quanto C .

## Princípio da Responsabilidade Única - SRP

Primeiramente vamos aplicar o já conhecido SRP, de forma a garantir que cada classe tenha seu lar, assegurando a responsabilidade única dos arquivos.

Crie uma pasta chamada Connectors/ dentro da pasta src e, dentro dela, crie o arquivo src/Connectors/Connector.ts , que irá conter nossas interfaces, bem como o arquivo src/Connectors/index.ts para centralizar nossas exportações.

**mkdir src/Connectors && touch src/Connectors/index.ts src/Connectors/Connector.ts**

Crie também as pastas src/Connectors/mysql/ e src/Connectors/redis/ , bem como os arquivos src/Connectors/mysql/MySQLConnector.ts e src/Connectors/redis/RedisConnector.ts .

**mkdir -p src/Connectors/mysql src/Connectors/redis/ && touch src/Connectors/mysql/MySQLConnector.ts src/Connectors/redis/RedisConnector.ts**

O arquivo src/Connectors/mysql/MySQLConnector.ts é o antigo arquivo src/Connector.ts , então você pode simplesmente renomeá-lo e colocá-lo nesta pasta correta ou copiar seu conteúdo para o arquivo no diretório novo e apagá-lo.

## As interfaces

Vamos extrair os métodos importantes da nossa atual MySQLConnector em uma interface, e agrupar junto com a já existente ConnectorConstructor no seu devido lugar:

// .src/Connectors/Connector.ts

export interface Connector {
  getCount(token: string): number | Promise<number>;

  incrementCount(token: string): void;
  
  closeConnection(): void;

  clearCount(token: string): void;

  firstCount(token: string): void;
}

export interface ConnectorConstructor {
  host: string;
  port: number;
  database?: string;
  user?: string;
  password?: string;
}

export default Connector;