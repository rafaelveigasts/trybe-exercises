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

class LocalDbModel implements Imodel {
  async create(character: Character): Promise<DbCharacter> {
    const newCharacter = { ...character, id: db.length + 1 };
    db.push(newCharacter);
    return newCharacter;
  }

  async update(id: number, character: Character): Promise<DbCharacter> {
    const index = db.findIndex(c => c.id === id);
    if (index < 0) {
      throw new Error('Character not found');
    }
    const newCharacter = { ...character, id };
    db[index] = newCharacter;
    return newCharacter;
  }

  async delete(id: number): Promise<boolean> {
    const index = db.findIndex(c => c.id === id);
    if (index < 0) {
      throw new Error('Character not found');
    }
    db.splice(index, 1);
    return true;
  }

  async getAll(): Promise<DbCharacter[]> {
    return db;
  }

  async getById(id: number): Promise<DbCharacter> {
    const character = db.find(c => c.id === id);
    if (!character) {
      throw new Error('Character not found');
    }
    return character;
  }
}
