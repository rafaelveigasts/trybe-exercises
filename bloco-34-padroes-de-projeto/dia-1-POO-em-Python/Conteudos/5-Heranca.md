## Herança

Pensando em eletrônicos, alguns deles possuem características em comum, não é mesmo? Tais como: voltagem, potência, ligado ou desligado e cor. Com isso, podemos perceber que para o construtor da geladeira, televisão e liquidificador, sempre teremos atributos idênticos.

Mas você pode estar refletindo: "Repetir tanto código não é eficiente, correto?"

Sim! E a boa notícia é que podemos evitar essa repetição com o conceito de herança, criando assim uma classe Eletrodomésticos. Neste sentindo, as classes geladeira, batedeira, fogão, micro-ondas serão suas filhas, ou seja, a herdam.

Anota aí ✏️: Herança é especializar o comportamento de uma classe, ou seja, a classe herdeira é tudo que a classe ascendente é e talvez um pouco mais!

Veja o exemplo a seguir:

class Eletrodomestico:
    def __init__(self, cor, potencia, voltagem, preco):
        self.preco = preco
        self.__cor = cor
        self.__potencia = potencia
        self.__voltagem = voltagem
        self.__ligado = False
        self.__amperagem_atual_no_motor = 0

    def ligar(self, velocidade):
        self.__velocidade = velocidade
        self.__amperagem_atual_no_motor = (
            (self.__potencia / self.__voltagem) / self.__velocidade_maxima
        ) * velocidade
        self.__ligado = True

    def desligar(self):
        self.__ligado = False
        self.__velocidade = 0

    def esta_ligado(self):
        return self.__ligado

Em Python, para declarar que um objeto herda as características de outro, basta na declaração da classe passarmos como primeiro parâmetro a classe que será herdada.

Vamos ver um exemplo de como informar que a Geladeira e o Liquidificador herdam da classe Eletrodoméstico:

class Liquidificador(Eletrodomestico): # Exemplo de Herança
    def __init__(self, cor, potencia, voltagem, preco):
	# chamando o método da classe mãe
        super().__init__(cor, potencia, voltagem, preco)


class Geladeira(Eletrodomestico):
    def __init__(self, cor, potencia, voltagem, preco, quantidade_de_portas=1):
        super().__init__(cor, potencia, voltagem, preco)
	# sobrescrita do método da classe mãe
        self.quantidade_de_portas = quantidade_de_portas


class Pessoa:
    def __init__(self, nome, saldo_na_conta):
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
	self.eletrodomesticos = []

    # Permitindo a aquisição de qualquer eletrodoméstico
    def comprar_eletrodomestico(self, eletrodomestico: Eletrodomestico):
        if eletrodomestico.preco >= self.saldo_na_conta:
            self.saldo_na_conta -= eletrodomestico.preco
            self.eletrodomestico.append(eletrodomestico)

Exercício de Fixação 2
Implemente a classe dos demais eletrodomésticos (microondas, batedeira, fogão), sempre herdando da classe Eletrodoméstico e teste seu uso com prints no console.
