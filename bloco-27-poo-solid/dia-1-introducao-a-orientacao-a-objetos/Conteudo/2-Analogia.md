## Analogia

A POO traz alguns conceitos fundamentais. Vamos entender, por meio de uma analogia, cada um destes conceitos e suas relações?

### Conceitos

Classe é o primeiro dos conceitos, utilizado para determinar algo genérico. Na programação orientada a objetos, toda classe tem como finalidade modelar com precisão a representação de uma entidade do mundo real. Um exemplo de uma classe é Pessoa . Existem várias pessoas no mundo, sendo você e eu duas delas, e por mais que sejamos pessoas diferentes, pertencemos à mesma classe Pessoa . Agora repare que eu mencionei que somos pessoas diferentes. Isto quer dizer que somos objetos diferentes de uma mesma classe. Objeto (ou instância da classe ) é algo específico.

Dentro das classes e dos objetos existem atributos e métodos . Exemplos de atributos de uma Pessoa são a altura e a massa da Pessoa . Observe que a definição dos atributos é feita na classe, mas os valores são do objeto. Todas as pessoas possuem uma altura e uma massa, portanto a definição fica na classe, mas minha altura é diferente da sua, e minha massa é diferente da sua, portanto os valores são de cada objeto.

Se um atributo representa um valor, um método (ou mensagem ) nada mais é do que uma ação. Por exemplo, uma pessoa pode dormir. Observe que, da mesma forma que o atributo, o método é algo que existe para a classe, mas cada objeto pode realizá-lo de forma diferente. Todas as pessoas dormem, mas eu posso dormir de lado e você de bruços, por exemplo.

Trazendo para programação: um atributo é uma variável criada numa classe, e um método é uma função criada numa classe. Um método que merece destaque é o método construtor . Ele é rodado automaticamente na criação de um objeto, e serve para inicializar alguns atributos e chamar alguns métodos. Por exemplo, no nascimento de uma pessoa, os atributos altura e massa são definidos, e o método chorar é chamado.

## Pilares da POO

A POO possui quatro pilares fundamentais:

O pilar abstração indica que você não necessariamente precisa saber os detalhes de como algo funciona. Pense por exemplo em uma câmera (como a do seu celular). Você provavelmente não sabe todos os detalhes de como ela funciona, mas para operar você apenas precisa apontar, conferir no visor e apertar o botão. Uma atualização de firmware pode mudar detalhes do funcionamento da câmera, mas sua operação vai continuar essencialmente a mesma.

O pilar encapsulamento faz com que alguns atributos só possam ser acessados e/ou modificados dentro da classe. Pense, por exemplo, na sua massa. Você não pode, diretamente, mudar sua massa. Não tem como você pensar "vou ter x kg" e você passar a ter essa massa. Entretanto, algumas interfaces para alterar essa massa são expostas. Você pode comer para aumentar a massa, e dentro de você, sem que você possa ditar como seu corpo irá se comportar, ele vai absorver as calorias do alimento. Ou seja, você não pode mudar diretamente a sua massa, pois ela é um atributo privado da classe Pessoa , mas existem métodos na classe Pessoa que permitem que a massa seja alterada de forma interna, como o método comer .

O pilar herança permite que classes filhas , que herdam métodos e atributos de outra classe ( super classe ), sejam criadas. Pense em uma classe Pessoa , com os atributos nome e altura e com o método sonhar . A partir dessa classe Pessoa , eu posso criar uma outra classe que herda dela, chamada PessoaCantora , que por herdar de Pessoa , já vai vir automáticamente com os atributos nome e altura e com o método sonhar , mas poderá ter um método somente dela: cantar .

O pilar polimorfismo permite que coisas diferentes aconteçam ao chamarmos objetos de classes filhas distintas de uma mesma super classe. Por exemplo, pense que existe a classe Pessoa , que possui um método dormir , só que esse método não é implementado (não possui nenhum código). Então são criadas duas outras classes: PessoaQueDormeDeBrucos e PessoaQueDormeDeLado , e ambas implementam o método dormir conforme seus nomes. Se em algum lugar do código eu espero um objeto da classe Pessoa , eu posso perfeitamente passar um objeto de uma classe filha (já que ele herda tudo que tem na classe Pessoa ), ou seja, eu posso passar tanto um objeto da classe PessoaQueDormeDeBrucos quanto da classe PessoaQueDormeDeLado . Como o código esperava um objeto da classe Pessoa , qualquer um dos dois servem, mas se o método dormir for chamado, ele irá se comportar de forma diferente.

