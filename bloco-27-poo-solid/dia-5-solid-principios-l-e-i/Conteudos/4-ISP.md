## Interface Segregation Principle - ISP

O Princípio da Segregação de Interface afirma que:
Nenhum cliente deve ser forçado a depender de métodos que não utiliza

Isso quer dizer que devemos separar as interfaces e as compor conforme for necessário, fazendo com que uma entidade (classe) não precise implementar coisas que ela não vai usar.


Por exemplo, podemos pensar que ao fazer uma pizza, independentemente do sabor, teremos uma massa que servirá de base. Entretanto, não faz sentido a base possuir, além da massa, queijo, visto que algumas pizzas (por exemplo as doces ou veganas) não levam queijo. Da mesma forma, não faz sentido a base possuir chocolate (tal como em uma pizza doce), visto que nem toda pizza leva chocolate.

O ideal é que exista uma base pronta, e interfaces para cada um dos adicionais, como o queijo e o chocolate. Assim, cada pizza implementa as interfaces pertinentes, ou seja, usa queijo só quando precisa, e chocolate só quando precisa.

Vamos retomar o exemplo para ficar mais nítido?

## ISP Continuando o exemplo

Imagine que de tempos em tempos os dados que ficaram no banco em memória redis serão copiados para o banco MySQL . Para isso, de tempos em tempos o banco redis deverá ser lido por um RedisConnector . Entretanto, nossa classe RedisConnector possui alguns métodos de escrita que não são desejáveis para um objeto que deverá realizar somente leituras (imagine que quem vai consumir essa classe é uma pessoa que pode, sem querer, apagar um dado importante).

De forma a garantir que tenhamos uma classe ReadOnlyRedisConnector que só pode ler, bem como que tenhamos reutilização de código (pra isso que usamos Orientação a Objetos, não é?) e deixemos cada entidade com suas devidas responsabilidades, segregamos a interface.

## Segregando a interface

Vamos segregar nossa interface Connector em duas: ReadOnlyConnector e Connector :

// ./src/Connectors/Connector.ts

export interface ReadOnlyConnector {
  getCount(token: string): number | Promise<number>;

  closeConnection(): void;
}

export interface Connector extends ReadOnlyConnector {
  incrementCount(token: string): void;

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

Agora temos duas interfaces, sendo que as classe que implementam a ReadOnlyConnector não são obrigadas a implementar métodos de escrita, como incrementCount , clearCount e firstCount , respeitando assim o ISP.
