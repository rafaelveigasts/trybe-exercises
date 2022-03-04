## Herança

Antes de tudo, é importante salientar que herança é uma característica da classe, e não do objeto.

Ou seja, criamos uma classe que herda de outra, e não um objeto que herda de outro.

A herança permite que classes mais específicas sejam criadas a partir de classes mais genéricas.

Com isso podemos criar uma classe com o comportamento base, e estender os comportamentos de uma classe existente sem precisar modificá-la.

A classe base é denominada classe pai ou superclasse , e a classe que estende dela é denominada classe filha , ou subclasse .

Algo muito interessante é que em todo lugar onde um objeto da superclasse é esperado, um objeto da subclasse pode ser passado, pois ele apresenta todos os atributos e métodos de um objeto da superclasse.

Isso é mágico pois se alguém criar uma classe que atende a um propósito em uma base de código, mas você precisa adicionar uma funcionalidade a ela, você pode utilizar herança.

Com isso, tudo que usa a superclasse continua funcionando, e você só precisa implementar as novas funcionalidades na subclasse que acabou de criar 🤩.

Vamos ver um pouco de código pra entender melhor? 💻