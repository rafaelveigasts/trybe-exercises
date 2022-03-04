## Resolução do problema inicial

Lembra do probleminha que você parou pra pensar em como resolver no começo da aula?
Acha que agora já tem uma ideia de como resolver?
Aqui vai uma sugestão de resolução, só pra fixar o aprendizado. Leia com calma, e por uns bons minutos!
Dada a quantidade expressiva de termos em inglês, mais um dicionário informal:

clause: cláusula
contract: contrato
describe: descrever
legal person: pessoa jurídica
person: pessoa
natural person: pessoa física
sale(s): venda(s)
sign: assinar
signatory/signatories: assinante, assinantes (do contrato)
subject: assunto (do contrato)

interface Contract {
  subject: string;
  clauses: string[];
  signatories: Person[];
  describe(): void;
}

class Person {
  private _name;
  constructor(name: string) {
    this._name = name;
  }
  get name() { return this._name; }
}

class NaturalPerson extends Person {
  private _cpf;
  constructor(name: string, cpf: string) {
    super(name);
    this._cpf = cpf;
  }
  get cpf() { return this._cpf; }
}

class LegalPerson extends Person {
  private _cnpj;
  constructor(name: string, cnpj: string) {
    super(name);
    this._cnpj = cnpj;
  }
}

class SalesContract implements Contract {
  private _signatories: Person[];
  private _clauses: string[];

  constructor() {
    this._signatories = [];
    this._clauses = [];
  }

  get signatories() { return [...this._signatories]; }
  get clauses() { return [...this._clauses]; }
  get subject() { return "Sales"; }

  sign(signatory: Person) { this._signatories.push(signatory); }
  addClause(clause: string) {
    if (this._signatories.length > 0) return;
    this._clauses.push(clause);
  }

  describe() {
    console.log('--------------------');
    console.log(`Contrato: ${this.subject}`);
    this.clauses.forEach((clause) => { console.log(`Cláusula: ${clause}`) });
    this.signatories.forEach((signatory) => { console.log(`Assinado por: ${signatory.name}`) });
    console.log('--------------------\n');
  }
}

const s1 = new SalesContract();
const pp1 = new NaturalPerson('Tony', '123456789');
const pp2 = new NaturalPerson('Lilly', '987654321');
const lp = new LegalPerson('International Sales SA', '23961237162378');

s1.describe();
s1.addClause('Foo');
s1.addClause('Bar');
s1.describe();
s1.sign(pp1);
s1.sign(pp2);
s1.describe();
s1.addClause('Baz');
s1.sign(lp);
s1.describe();

/*
Saída:
--------------------
Contrato: Sales
--------------------

--------------------
Contrato: Sales
Cláusula: Foo
Cláusula: Bar
--------------------

--------------------
Contrato: Sales
Cláusula: Foo
Cláusula: Bar
Assinado por: Tony
Assinado por: Lilly
--------------------

--------------------
Contrato: Sales
Cláusula: Foo
Cláusula: Bar
Assinado por: Tony
Assinado por: Lilly
Assinado por: International Sales SA
--------------------
 */

 Existem muitas validações que não foram feitas, visto que é só um exemplo, mas já dá pra ter uma ideia de como os conceitos de herança e interfaces facilitam a vida, não é?
Se quiser, brinque um pouco criando novos tipos de contratos e implemente mais funcionalidades 😎.
