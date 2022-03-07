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

class CharacterService {
  constructor(readonly model: LocalDbModel) { }
  async create(character: Character) {
    const newCharacter = await this.model.create(character);
    return ({ status: 201, data: newCharacter });
  }

  async getAll() {
    const allCharacter = await this.model.getAll();
    return ({ status: 200, data: allCharacter });
  }

  async getById(id: number) {
    const character = await this.model.getById(id);
    return ({ status: 200, data: character });
  }

  async update(id: number, character: Character) {
    const updatedCharacter = await this.model.update(id, character);
    return ({ status: 200, data: updatedCharacter });
  }

  async delete(id: number) {
    const deleted = await this.model.delete(id);
    return ({ status: 200, data: deleted });
  }

  async getByName(name: string) {
    const character = await this.model.getAll();
    const filtered = character.filter(c => c.name === name);
    return ({ status: 200, data: filtered });
  }

  async getBySpecialMove(specialMove: string) {
    const character = await this.model.getAll();
    const filtered = character.filter(c => c.specialMove === specialMove);
    return ({ status: 200, data: filtered });
  }

  async getByNameAndSpecialMove(name: string, specialMove: string) {
    const character = await this.model.getAll();
    const filtered = character.filter(c => c.name === name && c.specialMove === specialMove);
    return ({ status: 200, data: filtered });
  }

  async getByNameOrSpecialMove(name: string, specialMove: string) {
    const character = await this.model.getAll();
    const filtered = character.filter(c => c.name === name || c.specialMove === specialMove);
    return ({ status: 200, data: filtered });
  }

  async getByNameAndSpecialMoveOrName(name: string, specialMove: string) {
    const character = await this.model.getAll();
    const filtered = character.filter(c => c.name === name && c.specialMove === specialMove || c.name === name);
    return ({ status: 200, data: filtered });
  }
}

  
class MockDbModel implements Imodel {
  async create(character: Character) {
    console.log('character created');
    return { id: 1, name: 'Peach', specialMove: 'Toad' };
  };

  async update(id: number, character: Character) {
    console.log('character updated');
    return { id: 1, name: 'Yoshi', specialMove: 'Egg Lay' };
  };

  async delete(id: number) {
    console.log('character deleted');
    return true;
  };

  async getAll() {
    return [
      { id: 1, name: 'Samus', specialMove: 'Charge Shot' },
      { id: 2, name: 'Kirby', specialMove: 'Inhale' }
    ];
  }

  async getById(id: number) {
    return { id: 1, name: 'Mario', specialMove: 'Fireball' };
  }
}

const A = new CharacterService(new LocalDbModel());
A.getAll().then(console.log);

const B = new CharacterService(new MockDbModel());
B.getAll().then(console.log);