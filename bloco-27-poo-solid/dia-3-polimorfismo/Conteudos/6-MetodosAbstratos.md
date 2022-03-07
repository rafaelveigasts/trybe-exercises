## Métodos (e atributos) estáticos

Uma outra funcionalidade interessante é o que chamamos de método estático.

Um método estático nada mais é do que uma função que não precisa acessar nenhum atributo do objeto.

A diferença semântica de um método estático para uma função é que o método estático tem a ver com a classe. Isso significa que fica meio "sem sentido" você disponibilizar o dito método sozinho, pois, por mais que ele não precise manipular uma instância, ele está muito ligado à classe.

Além de métodos, podemos ter atributos estáticos, que são acessados manipulando a classe, não a instância.

Vamos a um exemplo?

/*
Dicionário en-pt:
- employee: pessoa empregada/funcionária
- static: estático
*/

class Employee {
  private static employeeCount = 0

  constructor(public name: string) {
    Employee.addEmployee();
  }

  private static addEmployee() {
    this.employeeCount += 1;
  }

  static get employees() {
    return this.employeeCount;
  }
}

console.log(Employee.employees);
const e1 = new Employee('Ronald');
console.log(Employee.employees);
const e2 = new Employee('Cíntia');
console.log(Employee.employees);

/*
Saída:
0
1
2
*/

Observe que o this no contexto de um método estático se refere à classe, não ao objeto. Em métodos não estáticos ou fora da classe você deve utilizar o nome da classe para referenciar seus atributos e métodos estáticos.

Entretanto, é importante salientar que na maioria das vezes é preferível criar uma função normal, no mesmo módulo que a classe está sendo criada, exportando-as de forma separada. Isso facilita a vida de quem vai usar.

## Para fixar

Suponha que você está modelando os personagens do jogo de luta multijogadores Super Smash Bros . No jogo, há personagens de alcances variados e movimentos especiais variados; vence a pessoa que acumulou mais pontos na partida.

Crie uma classe abstrata Character que tenha os métodos abstratos talk(): void e specialMove(): void .

Crie a classe concreta MeleeCharacter que estenda Character e sobrescreva os métodos abstratos dessa classe.

Crie a classe concreta LongRangeCharacter que estenda Character e sobrescreva os métodos abstratos dessa classe.

Crie uma função que receba como parâmetro character: Character e chame os métodos talk e specialMove para apresentar o personagem.
