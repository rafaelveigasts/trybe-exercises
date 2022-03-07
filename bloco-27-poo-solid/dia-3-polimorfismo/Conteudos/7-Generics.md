## Sintaxe com interfaces e generics

### Polimorfismo com interfaces

O polimorfismo com interfaces se dá da mesma forma que o com herança.

Duas classes diferentes implementam a mesma interface, implementando também os métodos obrigatórios que a interface estipula.

Podemos enviar a uma função, por exemplo, um parâmetro com o tipo da interface, e passar em seu lugar um objeto de uma classe que implementa tal interface.

Há uma garantia de que tudo o que a interface estipula está implementado na classe e, consequentemente, no objeto.

Classes diferentes irão implementar determinados métodos de formas diferentes. No exemplo abaixo o método showIdentification é implementado de forma diferente nas classes PessoaFísica e PessoaJurídica .

interface Person {
  id: number;
  name: string;
  showIdentification(): void;
}

class PhysicalPerson implements Person {
  private static lastId = 0;
  private _name;
  private _id;
  private _cpf;

  constructor(name: string, cpf: string) {
    this._id = PhysicalPerson.newId();
    this._name = name;
    this._cpf = cpf;
  }

  private static newId() { return this.lastId++; }
  get id() { return this._id; }
  get name() { return this._name; }
  get cpf() { return this._cpf; }
  showIdentification() { console.log(this.id, this._cpf); }
}

class LegalPerson implements Person {
  private static lastId = 0;
  private _name;
  private _id;
  private _cnpj;

  constructor(name: string, cnpj: string) {
    this._id = LegalPerson.newId();
    this._name = name;
    this._cnpj = cnpj;
  }

  private static newId() { return this.lastId++; }
  get id() { return this._id; }
  get name() { return this._name; }
  get cnpj() { return this._cnpj; }
  showIdentification() { console.log(this.id, this._cnpj); }
}

const pp0 = new PhysicalPerson('John', '123456789');
const pp1 = new PhysicalPerson('Jenny', '987654321');
const lp = new LegalPerson('International Sales SA', '834729384723');

const showIdentification = (person: Person) => {
  person.showIdentification();
}
showIdentification(pp0);
showIdentification(pp1);
showIdentification(lp);

/*
Saída:
 123456789
 987654321
 834729384723
*/

## Garantia de tipo com generics

Agora imagine que você queira agora criar uma classe contrato, que vai possuir uma pessoa corretora, que pode ser tanto uma pessoa física quanto uma pessoa jurídica.

Ao passar simplesmente Pessoa como tipo da pessoa corretora, você perde a capacidade de acessar elementos específicos das classes PessoaFísica e PessoaJurídica .

class Contract {
  static _number = 0;
  constructor(public broker: Person){}
  static get number() { return this._number; }
}

const c1 = new Contract(pp0);
console.log(c1.broker.cpf); // Erro, pois não existe cpf em Person

Para garantir o tipo utilizado, podemos utilizar generics.
É bem simples:

Escolhemos uma letra para representar o elemento e a colocamos entre sinais de menor e maior que (<>) após o nome da classe

Utilizamos esta letra no lugar do tipo Pessoa

class Contract<T> { // Agora a classe recebe o genérico T
  static _number = 0;
  constructor(public broker: T) { } // T no lugar de Person
  static get number() { return this._number; }
}

// Tipo inferido (não explícito)
const c1 = new Contract(pp0); // TypeScript "advinha" que pp0 é pessoa física
console.log(c1.broker.cpf); // Okay

// Tipagem explícita
const c2: Contract<LegalPerson> = new Contract(lp); // Deixo explícito que lp é pessoa jurídica
console.log(c2.broker.cnpj); // Okay

/*
Saída:
123456789
834729384723
*/

## Para fixar

Utilize a estrutura a seguir nos exercícios dessa seção:

Character define os atributos básicos de um personagem de um videogame de luta, com o nome do personagem ( name ) e de seu movimento especial ( specialMove ):

DbCharacter estendo os atributos da classe Character para incluir aqueles existentes no banco de dados.

interface Character {
  name: string;
  specialMove: string;
}

interface DbCharacter extends Character {
  id: number;
}

const db: DbCharacter[] = [];

Crie uma interface chamada IModel que defina as operações básicas de um CRUD para a entidade Character .
Crie uma classe LocalDbModel que implemente a interface IModel .
Crie uma classe CharacterService que recebe como dependência em seu construtor uma instância do tipo LocalDbModel e a utilize em sua utilize em sua lógica de negócio.
Refatore CharacterService para que possa receber uma instância de qualquer classe que implemente a interface IModel .
Crie uma classe MockedDbModel que implemente IModel com uma versão mock .
Verifique que a classe CharacterService pode receber uma instância tanto de LocalDbModel como de MockedDbModel .
