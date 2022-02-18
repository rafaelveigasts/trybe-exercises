enum StudentStatus {
  Active = 1,
  Inactive,
  Paused
}
let newStudentStatus: StudentStatus = StudentStatus.Inactive; //referenciamos em enum usando EnumName.Value


console.log(newStudentStatus); //saída: 1

enum StatusCodes {
  OK = 200,
  BadRequest = 400,
  Unauthorized,
  PaymentRequired,
  Forbidden,
  NotFound,
}

const ok = StatusCodes.OK;
const indiceOk = StatusCodes["OK"];
const stringBadRequest = StatusCodes[400];

console.log(ok); //saída: 200
console.log(indiceOk); //saída: 200
console.log(stringBadRequest); //saída: BadRequest

/* Exercícios
Crie uma Enum que represente os dias da semana . Seu valor deve ser número do dia.
Crie uma Enum que represente as cores do arco iris . Seu valor deve ser o nome das cores em português.
Crie uma Enum que represente as ações: salvar , imprimir , abrir , visualizar e fechar . Seu valor deve ser do tipo inteiro.
Crie uma Enum que represente os pontos cardeais: Norte , Leste , Sul e Oeste . Seu valor deve ser a primeira letra do nome do ponto cardial.
 */

enum Days {
  Monday = 1,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday
}

const Monday = Days.Monday;
const Tuesday = Days.Tuesday;
const Wednesday = Days.Wednesday;
console.log(Monday); 
console.log(Tuesday);
console.log(Wednesday);

enum Colors {
  Red = "Red",
  Blue = "Blue",
  Green = "Green"
}

enum Actions {
  Save = 1,
  Print,
  Open,
  View,
  Close
}

enum CompassPoints {
  North = "N",
  East = "E",
  South = "S",
  West = "W"
}


type Point = {
  x: number;
  y: number;
};


function printCoord(pt: Point) {
  console.log("O valor da cordenada x é: " + pt.x);
  console.log("O valor da coordenada y é: " + pt.y);
}

printCoord({ x: 100, y: 100 });
//saída:
//O valor da cordenada x é: 100
//O valor da cordenada y é: 100


/* Exercícios
Crie um type para um objeto que represente um pássaro.
Crie um type que represente uma função que recebe 2 valores numéricos e retorna a soma dos dois.
Crie um type para um objeto que represente um endereço.
 */

type Bird = {
  name: string;
  fly: boolean;
  wings: number;
  beaks: number;
  biped: boolean;
};

type Sum = (a: number, b: number) => number;

type Address = {
  street: string;
  number: number;
  city: string;
  state: string;
  country: string;
};

/* Exercícios
Crie um type union que represente os estados físicos da matéria: líquido, sólido ou gasoso.
Crie um type union que represente o documento identificador de uma pessoa que pode receber valores numéricos ou texto. Ex: “123.567.890-12” ou 123456789012.
Crie um type union que represente sistemas operacionais: linux, mac os ou windows.
Crie um type union que represente as vogais do alfabeto.
 */

type PhysicalState = "liquid" | "solid" | "gas";
type Id = number | string;
type OperatingSystem = "linux" | "mac os" | "windows";
type Vowel = "a" | "e" | "i" | "o" | "u";


/* Exercícios
Crie uma classe cujo objeto represente um Cachorro.
Crie uma classe cujo objeto represente uma Casa.
Crie uma classe cujo objeto represente um Voo.
 */

class Dog {
  name: string;
  age: number;
  breed: string;
  
  constructor(name: string, age: number, breed: string) {
    this.name = name;
    this.age = age;
    this.breed = breed;
  }
}

class House {
  room: number;
  area: number;
  floors: number;
  kitchen: boolean;
  garage: boolean;
  address: string;
  
  constructor(room: number, area: number, floors: number, kitchen: boolean, garage: boolean, address: string) {
    this.room = room;
    this.area = area;
    this.floors = floors;
    this.kitchen = kitchen;
    this.garage = garage;
    this.address = address;
  }
}

class Flight {
  origin: string;
  destination: string;
  departure: Date;
  arrival: Date;
  
  constructor(origin: string, destination: string, departure: Date, arrival: Date) {
    this.origin = origin;
    this.destination = destination;
    this.departure = departure;
    this.arrival = arrival;
  }
}