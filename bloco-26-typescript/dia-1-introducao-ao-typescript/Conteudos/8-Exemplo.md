## Primeiro programa em TypeScript

Agora escreveremos nosso primeiro programa utilizando o TypeScript , vamos criar um módulo para calcular a área de figuras geométricas.

Crie um diretório chamado exercises e dentro dele vamos inicializar nosso projeto TypeScript .

mkdir exercises && cd exercises

npm init -y
npm install -D @tsconfig/node14
touch tsconfig.json

// ./tsconfig.json
{
  "extends": "@tsconfig/node14/tsconfig.json", // estendemos a configuração base para o Node 14
  "compilerOptions": {
    "outDir": "./dist", // pasta onde nossos arquivos compilados serão salvos
  },
}

Por fim vamos instalar o pacote npm com as definições de tipos para o Node.js.

npm install -D @types/node

Vamos criar agora dois arquivos, um chamado index.ts , que usaremos para testar o nosso módulo, e um chamado exercises.ts que será onde faremos a implementação do nosso módulo com algumas funções.

touch index.ts && touch exercises.ts

A primeira função que vamos desenvolver recebe um nome e o imprime na tela com o texto "Olá Nome".

// ./exercises.ts

export function greeter(name: string) {
    return `Olá ${name}!`;
}

A segunda função que vamos desenvolver irá mostrar na tela o nome da pessoa e sua idade.

// ./exercises.ts

// export function greeter(name: string) {
//    return `Olá ${name}!`;
// }

export function personAge(name: string, age: number) {
    return `${name} tem ${age} anos!`;
}

A terceira função que vamos desenvolver fará a adição de todos os números que estão dentro de um array. Para isso, faremos uma função add que será chamada dentro da função sumArray , que por sua vez utilizará o método reduce para realizar a soma dos valores.

// ./exercises.ts

// export function greeter(name: string) {
//     return `Olá ${name}!`;
// }

// export function personAge(name: string, age: number) {
//     return `${name} tem ${age} anos!`;
// }

export function add(x: number, y: number): number {
    return x + y;
}

export function sumArray(numbers: number[]): number {
    return numbers.reduce(add, 0);
}

A quarta função que vamos desenvolver será para calcular a área do triângulo. Para calcular a área de um triângulo, basta multiplicar a medida da base com a medida da altura e dividir o resultado por dois.

export function triangle(base: number, height: number): number {
    return (base * height) / 2;
}

A quinta função que vamos desenvolver será para calcular a área do quadrado. Para calcular sua área, multiplicamos a medida da base com a medida altura. Como as medidas são as mesmas, multiplicá-las é o mesmo que elevar o lado ao quadrado.

export function square(side: number): number {
    return side ** 2;
}

E a última função que vamos desenvolver será para calcular a área do retângulo. A área do retângulo é dada pela multiplicação da base pela altura.


// ./exercises.ts
export function rectangle(base: number, height: number): number {
    return base * height;
}

Pronto. Agora vamos fazer algumas chamadas ao nosso módulo de àrea no arquivo index.ts.

// ./index.ts

import * as Exercise from './exercises';

console.log(Exercise.greeter('Maria'));
console.log(Exercise.personAge('Maria', 40));
console.log(`A soma do array é igual a ${Exercise.sumArray([3, 6, 9])}`);

console.log(`Triângulo de base 10cm e altura 25cm: ${Exercise.triangle(10, 25)}cm²`);
console.log(`Triângulo de base 5cm e altura 30cm: ${Exercise.triangle(5, 30)}cm²`);
console.log(`Triângulo de base 100cm e altura 200cm: ${Exercise.triangle(10, 25)}cm²`);

console.log(`Quadrado de lado 10cm: ${Exercise.square(10)}cm²`);
console.log(`Quadrado de lado 5cm: ${Exercise.square(5)}cm²`);
console.log(`Quadrado de lado 100cm: ${Exercise.square(10)}cm²`);

console.log(`Retângulo de base 10cm e altura 25cm: ${Exercise.rectangle(10, 25)}cm²`);
console.log(`Retângulo de base 5cm e altura 30cm: ${Exercise.rectangle(5, 30)}cm²`);
console.log(`Retângulo de base 100cm e altura 200cm: ${Exercise.rectangle(10, 25)}cm²`);

Vamos agora compilar o nosso programa:

npx tsc

Nossos arquivos JavaScript foram gerados dentro do diretório dist , agora é só rodar o nosso programa compilado utilizando o Node .

node ./dist/index.js

A saída esperada é:

Olá Maria!
Maria tem 40 anos!
A soma do array é igual a 18
Triângulo de base 10cm e altura 25cm: 125cm²
Triângulo de base 5cm e altura 30cm: 75cm²
Triângulo de base 100cm e altura 200cm: 125cm²
Quadrado de lado 10cm: 100cm²
Quadrado de lado 5cm: 25cm²
Quadrado de lado 100cm: 100cm²
Retângulo de base 10cm e altura 25cm: 250cm²
Retângulo de base 5cm e altura 30cm: 150cm²
Retângulo de base 100cm e altura 200cm: 250cm²

O que acha de colocar a mão na massa e incrementar mais esse nosso módulo de cálculo de àrea de figuras geométricas?

1) Crie uma nova função para calcular a área do losango. A área do losango é dada pelo resultado da multiplicação da diagonal maior (D) com a diagonal menor (d) dividido por dois. (D * d) / 2
Calcule a área de um losango que tem D = 32cm e d = 18cm;
Calcule a área de um losango que tem D = 200cm e d = 50cm;
Calcule a área de um losango que tem D = 75cm e d = 25cm.

2) Crie uma nova função para calcular a área do trapézio. A área do trapézio é dada pelo produto da altura (h) com a soma da base maior (B) e a base menor (b) dividido por dois. ((B + b) * h) / 2
Calcule a área de um trapézio que tem B = 100cm, b = 70cm e altura = 50cm;
Calcule a área de um trapézio que tem B = 75cm, b = 50cm e altura = 35cm;
Calcule a área de um trapézio que tem B = 150cm, b = 120cm e altura = 80cm.

3) Crie uma nova função para calcular a área do círculo. A área do círculo de raio r é dada pelo produto do raio ao quadrado com o número irracional ℼ (em geral utilizamos o valor ℼ = 3,14). PI * r²
Calcule a área de um círculo de raio igual 25cm;
Calcule a área de um círculo de raio igual 100cm;
Calcule a área de um círculo de raio igual 12,5cm.