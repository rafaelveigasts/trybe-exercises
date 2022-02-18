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