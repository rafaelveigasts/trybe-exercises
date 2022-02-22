## Enum ou enumeração

Aqui começamos a conhecer tipos e estruturas de dados que o JavaScript não possui, e a primeira delas é a Enum ou enumeração .

Uma enum é um nome simbólico para um conjunto de valores relacionados, o que significa que você pode utilizá-la para criar um conjunto de constantes para uso com variáveis e propriedades.

Elas são muito úteis quando temos um conjunto de valores que determinado tipo de variável pode assumir. Imagine que você tem um campo em um banco de dados externo que representa o status da matrícula de uma pessoa estudante em um curso, chamado StudentStatus que é do tipo inteiro e pode conter os números 1, 2 ou 3, que representam respectivamente: Active , Inactive e Paused . Vamos criar uma enumeração com esses valores e entendermos como eles funcionam no TypeScript .

enum StudentStatus {
     Active,
     Inactive,
     Paused
}

Agora vamos declarar uma variável para uma nova pessoa estudante do tipo StudentStatus e atribuir o tipo Inactive.

let newStudentStatus: StudentStatus = StudentStatus.Inactive; //referenciamos em enum usando EnumName.Value

console.log(newStudentStatus); //saída: 1

Opa, mas não tivemos a saída esperada não é mesmo? Por padrão uma enum é baseada em números , os valores começam de zero e para cada opção é assinalado um número incrementado por 1 , assim como os índices de um array. Portanto Active é 0, Inactive é 1 e Paused é 2. **Para termos a nossa enum refletindo os valores que temos no banco de dados externo podemos especificar isso na declaração da seguinte forma:**

enum StudentStatus {
     Active = 1,
     Inactive,
     Paused
}

Atribuir o número 1 para o primeiro valor da nossa enum já é o suficiente, agora se imprimirmos a nossa variável newStudentStatus o valor será 2 como era esperado.

let newStudentStatus: StudentStatus = StudentStatus.Inactive;
console.log(newStudentStatus); //saída: 2

Sempre que parte da sua lógica aceitar um conjunto limitado de valores, considere utilizar uma enum . Elas tornam o código mais legível e demonstram melhor a intenção de quem codificou além de nos ajudar a reduzir os erros causados pela transcrição ou digitação incorreta de valores e facilitar a alteração dos valores no futuro.

Enums suportam o acesso ao dado em ambos os lados: Da chave ao valor e do valor à chave.

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

Podem ser de diferentes tipos, sendo o tipo string o mais comum.

enum directionsGamePad {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGTH = "RIGHT",
}

Exercícios
Crie uma Enum que represente os dias da semana . Seu valor deve ser número do dia.
Crie uma Enum que represente as cores do arco iris . Seu valor deve ser o nome das cores em português.
Crie uma Enum que represente as ações: salvar , imprimir , abrir , visualizar e fechar . Seu valor deve ser do tipo inteiro.
Crie uma Enum que represente os pontos cardeais: Norte , Leste , Sul e Oeste . Seu valor deve ser a primeira letra do nome do ponto cardial.
