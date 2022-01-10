const readline = require('readline-sync');

const name = readline.question('Qual o seu nome? ');
const peso = readline.question('Qual o seu peso? ');
const altura = readline.question('Qual a sua altura? ');

const imc = () => {
    return peso / (altura * altura);
}

console.log(`Hello, ${name}! You are ${imc()}!`);