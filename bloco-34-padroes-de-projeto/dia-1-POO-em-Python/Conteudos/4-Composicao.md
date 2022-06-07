## Composição

Agora que temos nosso liquidificador funcionando, vamos associá-lo a uma pessoa cozinheira, dizendo assim que esta pessoa pode possuir um liquidificador.

⚠️Aviso: Lembre que uma pessoa não é da mesma classe que um liquidificador, ela somente é possuidora desse objeto. Neste caso, precisamos utilizar do conceito de Composição.

Anota aí ✏️: Composição é atribuir o objeto de uma classe a outra, gerando assim um relacionamento de pertencimento entre eles.

Observe o exemplo abaixo que aplica esse conceito:

class Pessoa:
    def __init__(self, nome, saldo_na_conta):
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
        self.liquidificador = None

    def comprar_liquidificador(self, liquidificador: Liquidificador):
        if liquidificador.preco <= self.saldo_na_conta:
            self.saldo_na_conta -= liquidificador.preco
            self.liquidificador = liquidificador

Agora, a classe Pessoa tem o método específico para comprar seu liquidificador:

pessoa_cozinheira = Pessoa("Jacquin", 1000)
pessoa_cozinheira.comprar_liquidificador(liquidificador_vermelho)

Exercício de fixação 1:
Uma casa possui eletrodomésticos, tais como: geladeira, batedeira, micro-ondas, fogão e etc..
Implemente o objeto pessoa realizando a compra de uma geladeira e a ligue. Teste com prints para que possamos visualizar a pessoa e seus eletrônicos.

