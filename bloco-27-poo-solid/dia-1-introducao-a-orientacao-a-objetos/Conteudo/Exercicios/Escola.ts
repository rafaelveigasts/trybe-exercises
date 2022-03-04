/* 
Exercício 1: Vamos modelar algumas partes de um software de uma escola. Escreva uma classe cujos objetos representarão pessoas estudantes matriculadas em uma disciplina. Cada objeto dessa classe deve conter os seguintes dados: matrícula, nome, 4 notas de prova, 2 notas de trabalho.
 */

class Student {
  private _id: number;
  private _name: string;
  private _grades: number[];
  private _assignments: number[];

  constructor(
    id: number,
    name: string,
    grades: number[],
    assignments: number[]
  ) {
    this._id = id;
    this._name = name;
    this._grades = grades;
    this._assignments = assignments;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    if (this.name.length < 3) {
      throw new Error("Nome deve ter mais de 3 caracteres");
    }
    this._name = value;
  }

  get grades(): number[] {
    return this._grades;
  }

  set grades(values: number[]) {
    if (this.grades.length > 4) {
      throw new Error("Não é permitido mais de 4 notas");
    }
    this._grades = values;
  }

  get assignments(): number[] {
    return this._assignments;
  }

  set assignments(values: number[]) {
    if (this.assignments.length > 2) {
      throw new Error("Não é permitido mais de 2 notas");
    }
    this._assignments = values;
  }

  /* 
Exercício 2: Agora vamos adicionar à nossa classe de pessoa estudante os comportamentos. Para isso adicione dois métodos: um que calcula a soma das notas da pessoa estudante e outro que calcula a média das notas da pessoa estudante.
 */

  sumNotes(): number {
    return [...this.grades, ...this.assignments].reduce(
      (previousNote, note) => {
        note += previousNote;

        return note;
      },
      0
    );
  }

  sumAvarageNotes(): number {
    const sumNotes = this.sumNotes();
    const divider = this.grades.length + this.assignments.length;

    return Math.round(sumNotes / divider);
  }
}

const maria = new Student(1, "Maria", [8, 9, 10, 7], [9, 8]);
console.log(maria.sumNotes());
console.log(maria.sumAvarageNotes());
