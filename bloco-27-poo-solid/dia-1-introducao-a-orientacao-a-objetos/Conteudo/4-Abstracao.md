## Abstração

Um dos pilares da Orientação a Objetos é a abstração . Quando criamos códigos Orientados a Objetos, deve ser intencional o uso de abstração, ou seja, de "esconder" detalhes da implementação da pessoa que vai usar a classe ou os objetos.

Vamos a um exemplo: imagine que log é um método do objeto console . Eu presumo que você não faz ideia de como, magicamente, você escreve console.log("alguma coisa") e aparece "alguma coisa" no terminal.

Pense que para isso acontecer, seu texto tem que ser carregado em buffers especiais, enviado para decodificadores, passar por um grande passo a passo, culminando em um sinal elétrico sendo enviado ao seu monitor, por fim resultando no acendimento dos pixels correspondentes às letras que formam a frase "alguma coisa".

Entre a chamada do console.log e a visualização do resultado na tela, existem várias camadas de abstração, que se por um lado não te dão nitidez do que acontece, por outro resolvem seu problema sem que você tenha que se preocupar com isso.

A mentalidade ao desenvolver código Orientado a Objetos deve ser essa: a pessoa que vai usar não deve ter que se preocupar em como determinado método funciona. Ela só precisa saber que, ao receber determinada entrada, este método irá retornar ou exibir um determinado resultado.

### Para Fixar
Pense em três métodos que você utilizou com alguma frequência ao longo do curso mesmo sem entender como eles funcionavam "por debaixo dos panos". Cronometre ⏲️ cinco minutos para pensar e siga adiante!

array.filter(callback)
array.map(callback)
object.hasOwnProperty(prop)