## Relembrando

Você já aprendeu 3 dos 4 pilares de POO.

Já sabe criar classes e objetos que criam abstrações que facilitam o desenvolvimento.

Já sabe encapsular atributos e métodos para que só sejam visíveis para o que de fato precisa vê-los.

Já sabe reutilizar código e especializar o mesmo utilizando herança.

Agora resta saber o que fazer quando quiser que métodos com a mesma assinatura se comportem de formas diferentes.

Vamos ao polimorfismo .

## Analogia

O pilar polimorfismo permite que coisas diferentes aconteçam ao chamarmos objetos de classes filhas distintas de uma mesma super classe. Por exemplo, pense que existe a classe Pessoa , que possui um método dormir , só que esse método não é implementado (não possui nenhum código). Então são criadas duas outras classes: PessoaQueDormeDeBrucos e PessoaQueDormeDeLado , e ambas implementam o método dormir conforme seus nomes. Se em algum lugar do código eu espero um objeto da classe Pessoa , eu posso perfeitamente passar um objeto de uma classe filha (já que ele herda tudo que tem na classe Pessoa ), ou seja, eu posso passar tanto um objeto da classe PessoaQueDormeDeBrucos quanto da classe PessoaQueDormeDeLado . Como o código esperava um objeto da classe Pessoa , qualquer um dos dois servem, mas se o método dormir for chamado, ele irá se comportar de forma diferente.

Deu pra refrescar a memória? Vamos lá entender melhor sobre o polimorfismo!

