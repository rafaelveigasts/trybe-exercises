## Polimorfismo

Polimorfismo vem do grego muitas formas , e nos remete às várias formas que um mesmo método pode possuir.

Existe mais de uma forma de polimorfismo (seria isso polipolimorfismo ? 🤣), mas vamos nos concentrar na mais comum: sobrescrita de métodos.

Nesta situação, o polimorfismo ocorre quando um método implementado em uma superclasse é reimplementado numa subclasse, comportando-se de forma diferente.

OBS : Não confundir sobrescrita com sobrecarga. A sobrecarga faz com que funções com o mesmo nome possam existir, desde que com assinaturas diferentes.

A assinatura de uma função (ou método) corresponde ao nome da função, seu tipo de retorno, o nome dos argumentos e seus tipos.

Em linguagens como o C++, por exemplo, você pode escrever métodos como:

// Recebe um número inteiro e retorna ele
int myMethod(int number) { return number; }
// Recebe dois números inteiros e retorna o primeiro vezes o segundo
int myMethod(int number, int number2) { return number * number2; }

Ou seja, a classe teria dois métodos com o mesmo nome. Se o método fosse chamado passando um parâmetro só, a implementação que recebe somente um número seria chamada. Já se fosse chamado com dois parâmetros, aí a implementação que recebe dois seria chamada.

Entretanto, isto não funciona em TypeScript. Apesar de existir sobrecarga, todas as assinaturas (nome, parâmetros e tipos dos parâmetros e do retorno) devem resultar em uma mesma implementação (somente um abre e fecha chaves).

Com isso, a sobrescrita se torna a opção mais interessante e mais utilizada 😃.