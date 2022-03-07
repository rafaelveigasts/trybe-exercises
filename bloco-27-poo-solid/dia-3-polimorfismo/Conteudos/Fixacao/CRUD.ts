/* Character define os atributos básicos de um personagem de um videogame de luta, com o nome do personagem ( name ) e de seu movimento especial ( specialMove ):

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
 */

interface Character {
  name: string;
  specialMove: string;
}

interface DbCharacter extends Character {
  id: number;
}

const db: DbCharacter[] = [];

interface Imodel {
  create: (character: Character) => Promise<DbCharacter>;
  update: (id: number, character: Character) => Promise<DbCharacter>;
  delete: (id: number) => Promise<boolean>;
  getAll: () => Promise<DbCharacter[]>;
  getById: (id: number) => Promise<DbCharacter>;
}

