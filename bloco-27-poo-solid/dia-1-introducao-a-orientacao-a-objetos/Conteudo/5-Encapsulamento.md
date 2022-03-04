## Encapsulamento

O pilar do encapsulamento consiste na exibição e concessão de acesso para a pessoa que usa a classe apenas daquilo que ela pode/deve de fato ver ou interagir.

A ideia é garantir que os processos internos da classe possam ocorrer sem que a pessoa que a utiliza altere atributos de forma indevida, o que poderia ocasionar problemas no funcionamento.

Para isso existem os modificadores de atributo, sendo os principais o **public , o private , o protected e o readonly** . O protected vai ser apresentado juntamente com herança.

Os atributos criados sem modificadores de visibilidade são públicos por padrão, e podem ser acessados e alterados tanto dentro quanto fora da classe. Se quisermos deixar explícito que não simplesmente esquecemos de colocar a visibilidade adequada, podemos utilizar a palavra reservada public na frente do atributo.

Os atributos criados com o modificador **private só podem ser lidos e modificados dentro da classe**. Isso significa que se você tentar utilizar a notação objeto.atributo do lado de fora das chaves que delimitam a criação da classe, você terá um erro do compilador.

Os atributos criados com o modificador **readonly podem ser lidos em qualquer lugar, mas só podem ser inicializados uma vez, no construtor.** Apesar desse modificador não estar exatamente ligado a Orientação a Objetos, mas é legal que você saiba da existência dele 😉.

Para alterar atributos privados fora de uma classe, utilizamos os métodos. Eles validam as leituras e alterações, de forma a não comprometer o funcionamento da classe. Por exemplo, você pode ter uma classe Pessoa com o atributo dataDeNascimento privado, e possuir um método para mudar esta data de nascimento de forma a validar se é digitada uma data válida. **Para ler os valores dos atributos, podemos criar os métodos getters , e para modificar, os métodos setters .** É importante salientar que atributos privados não são obrigados a ter getters e setters. Eles só precisam destes métodos caso seja necessário alterá-los diretamente, podendo garantir uma validação do dado que foi passado. Veremos mais sobre isso na parte de sintaxe.

A depender da filosofia da linguagem que se utiliza, uma boa prática é deixar todos os atributos como privados e criar os getters e setters de acordo com a necessidade de cada atributo.

**Uma outra prática muito comum é o uso de um underline antes do nome de atributos privados.**

## Para Fixar
Utilizando o mesmo código dos exercícios de fixação anteriores:
Altere a visibilidade dos atributos definidos na classe Tv para private .
Crie um método getter e um setter para o atributo _connectedTo , da classe Tv.
O setter deverá verificar se o valor definido está entre as conexões disponíveis ( _connections ) e:
Em caso positivo, definir este valor para o atributo _connectedTo ;
Em caso negativo, imprimir no console a mensagem "Sorry, connection unavailable!"
Defina um valor para o atributo _connectedTo por meio do método setter criado e imprima seu valor.
