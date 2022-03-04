## Sintaxe geral

Agora, vamos ver como fica a sintaxe de criação de classes, objetos, atributos e métodos em TypeScript. Para isso vamos utilizar o exemplo visto anteriormente:

class Person {
  name: string;
  height: number;
  weight: number;

  constructor(n: string, h: number, w: number) {
    console.log(`Creating person ${n}`);
    this.name = n;
    this.height = h;
    this.weight = w;
  }

  sleep() {
    console.log(`${this.name}: zzzzzzz`);
  }
}

const p1 = new Person('Maria', 171, 58);
const p2 = new Person('João', 175, 66);
console.log(p1.name, p1.height, p1.weight);
console.log(p2.name, p2.height, p2.weight);
p1.sleep();
p2.sleep();

/*
Saída:
Creating person Maria
Creating person João
Maria 171 58
João 175 66
Maria: zzzzzzz
João: zzzzzzz
*/

Para criar uma classe é bem simples, basta utilizar a palavra reservada class , seguida do nome da classe e um par de chaves.

Dentro das chaves podemos criar atributos simplesmente digitando o nome do atributo e seu tipo, e os métodos digitando seu nome, os parênteses com os parâmetros e as chaves com o corpo, assim como uma função normal, só que sem precisar do const ou let .

Observe que com a classe Person podemos criar dois (ou mais) objetos (duas pessoas) diferentes, p1 e p2 . O método construtor ( constructor ) é chamado assim que utilizamos a sintaxe de criação de um objeto com a palavra reservada new . O construtor recebe os parâmetros n , h e w , que foram reduzidos apenas para deixar explícito que o nome não é diretamente relacionado com o atributo que eles populam, mas normalmente eles possuem o mesmo nome (ou seja, n seria name , etc).

Um ponto muito importante é o uso da palavra reservada this . 

Lembra que você aprendeu que pode criar duas pessoas diferentes, ou seja, dois objetos de uma mesma classe, e que ambas compartilham dos mesmos atributos, mas com valores diferentes? Então, o this serve justamente para representar o objeto em si. Quando, no construtor, escrevemos this.name = n , estamos dizendo que o atributo name do objeto que chamou o método irá possuir o valor n . Quando p1 é criada, this se refere a p1 , logo, n e name passam a ser "Maria". Quando p2 é criada, this se refere a p2 , logo, n e name passam a ser "João". Do lado de fora usamos a sintaxe objeto.atributo , mas como do lado de dentro não temos como saber qual é o objeto, precisamos utilizar a sintaxe this.atributo .

O mesmo se aplica aos métodos, como é possível observar com o sleep : ao chamarmos, no final do arquivo, p1.sleep() , o método sleep sabe que o this se refere a p1 , portanto this.name é "Maria". Ao chamarmos p2.sleep() , o this se refere a p2 , e p2.name é "João".

## Para Fixar
Utilizando o que você já aprendeu até aqui, faça os seguintes exercícios:
Crie uma classe chamada Tv, com os atributos:
- brand : marca da TV;
size : tamanho em polegadas;
resolution : resolução da tela;
connections : conexões disponíveis(HDMI, Ethernet, etc.);
connectedTo : conexão atual Este atributo não precisa ser inicializado no construtor .
Dentro da classe Tv, crie o método turnOn , que imprimirá os atributos inicializados no construtor.
Instancie um objeto a partir da classe Tv, chame o método turnOn para imprimir seus atributos.
