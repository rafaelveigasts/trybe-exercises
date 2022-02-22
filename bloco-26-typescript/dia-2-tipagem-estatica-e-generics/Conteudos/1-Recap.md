## Recapitulação sobre o sistema de tipos

No útimo dia de conteúdo aprendemos um pouco sobre tipagem e o sistema de tipos do TypeScript , que é uma linguagem fortemente tipada e estaticamente tipada .

Ou seja: uma vez que declaramos uma variável com um tipo, não podemos alterar esse tipo, e não conseguimos fazer operações com variáveis de tipos diferentes, sendo necessário converter um dos valores, se possível, para que ambos passem a ser de um único tipo.

let x: number;
x = 20;
x = "30"; // Error: Type "string" is not assignable to type "number"

const y: number = 10;
const yes: boolean = true;

const test = yes + y; // Error: Operator "+" cannot be applied to types "boolean" and "number".

Aprendemos também que o TypeScript possui inferência de tipo , e não precisamos declarar explicitamente a tipagem de cada variável pois o TSC , que é o compilador, fará a inferência do tipo através do valor que a atribuímos, mas continuamos não podendo alterar esse tipo após a declaração.

let message = "Hello World!"; // infere o tipo string

message = 100; // Error: Type "number" is not assignable to type "string".

Conhecemos a divisão de tipos no TypeScript e sobre alguns tipos primitivos.

// boolean: true ou false
let yes: boolean = true;
let no: boolean = false;

// number: int, float, hex, octal, binary, etc... Todos os valores numéricos aceitos no JavaScript
let int: number = 11;
let float = 123.456;
let hex: number = 0xb; // número onze em hexadecimal
let octal = 0o13; // número onze em octal
let binary = 0b1011; // número onze em binário

// string: "string", "string", `string`
let hello = "Hello"
let world = "World"
let message: string = `${hello}, ${world}!`

// void: sem retorno, utilizado em funções
function sayHelloWorld(): void {
    console.log("Hello World!");
}

// null e undefined: respectivamente nulo e indefinido
const valueNull = null
const valueUndefined = undefined

Ah, e não se esqueça, vamos aprender sobre as enums hoje. Além disso, também vamos conhecer os tipos de objeto e parâmetros de tipo nas próximas seções.
