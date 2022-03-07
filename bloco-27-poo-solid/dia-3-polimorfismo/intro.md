## O que vamos aprender?

Você já aprendeu a modelar entidades utilizando classes e objetos.

Também já aprendeu a reutilizar estas entidades para criar outras mais especializadas, com herança. Agora está na hora de aprender a implementar comportamentos distintos para um mesmo método.

Na aula de hoje, você aprenderá sobre o quarto e último pilar da POO: o polimorfismo .

Com ele você conseguirá garantir que classes distintas possuam determinados métodos implementados, mas que não necessariamente se comportam da mesma forma.

Além disso, você aprenderá sobre métodos e classes abstratas, bem como métodos e atributos estáticos.

Vamos lá!

## Você será capaz de:

Descrever, como pilar da Programação Orientada a Objetos , o Polimorfismo - múltiplas formas de se implementar um método descrito em uma interface

Descrever Classe Abstrata como uma classe que não pode ser instanciada, devendo ser usada apenas por suas Classes Herdeiras

Definir Métodos Abstratos , ou Funções Abstratas

Implementar Métodos Estáticos para Classes em TypeScript

## Por que isso é importante?

Em diversas situações nas quais você queira reaproveitar código por meio de herança, irá precisar fazer com que alguns métodos específicos se comportem de formas distintas.

O que vai acontecer é que será necessário que dois objetos de classes distintas que herdam de uma mesma superclasse sejam obrigados a implementar um certo método. Entretanto, este método pode se comportar de forma diferente a depender de qual é a sua classe de origem.

Isso acontece em diversos cenários, tendo a título de exemplo uma superclasse que modela conexões com bancos de dados. Esta superclasse possui métodos de conexão ao banco e inserção de dados, por exemplo. Entretanto, cada banco de dados ( MySQL , Postgresql , SQLite , etc) deve executar estas mesmas ações de maneiras diferentes, visto que são bancos diferentes.

Utilizar o polimorfismo é uma forma (e provavelmente a melhor forma) de resolver este corriqueiro problema!
