## Strategy

A equipe qual você faz parte está sendo reconhecida pela empresa! Dada a facilidade em lidar com os problemas, vocês receberam a missão de simplificar um código extenso, que sempre apresenta bugs. A manutenção do código em questão é temida por muitas pessoas desenvolvedoras.

Antes de tudo, deve-se conferir o que este código deve fazer com base no relato da pessoa usuária:

Depois de que o relatório é processado, costumamos emitir uma ordem de cobrança bancária para cada cliente que possui débito automático. Temos um código que realiza a comunicação com as principais instituições bancárias. Mas é frequente um dos bancos alterar a Api deles e nosso código para de funcionar, derrubando o sistema para todo mundo. 😕

class DebitoAutomatico:
    @classmethod
    def debitar(self, conta, valor, banco):
        if banco == "itau":
            # Codigo especifico do Itaú (exemplo)
            # connect_server_udp(itau_line)
            # itau_line.check_system()
            # itau_zig_zag(valor, 'Token 454')
            print("Débito realizado pelo Itau")
        elif banco == "Santander":
            # Codigo especifico do Santander (exemplo)
            # connect_server_tcp(santander_line)
            # santander_line.check_ping()
            # metodo_106(valor)
            print("Santander, Débito efetuado!")
        elif banco == "Bradesco":
            # Codigo especifico do Bradesco (exemplo)
            print("Sucesso!")
        # ... + 150 bancos...
        elif banco == "Caixa":
            # Codigo especifico da Caixa (exemplo)
            print("Efetuado com sucesso, Caixa Agradece!")


DebitoAutomatico.debitar(120, 123, "itau")
DebitoAutomatico.debitar(110, 456, "Santander")
DebitoAutomatico.debitar(120, 789, "Bradesco")

Cada banco possui um método especifico. São muitas instituições bancárias e esse código é gigante, tendo mais de 8.000 linhas. Ninguém que dar manutenção nele. 

Podem me ajudar? 😊

Como melhorar o código? Que estratégia utilizar? É hora de pensar...

Podemos observar que a classe está enorme, afinal, ela possui muitas responsabilidades já que cada banco possui uma estratégia. Que tal começar criando um Objeto/Classe para cada banco? Como possuem similaridades, é possível respeitar uma interface única — por exemplo, todos possuírem um método debitar().

from abc import ABC, abstractmethod


class BancoStrategy(ABC):  # Interface
    @classmethod
    @abstractmethod
    def debitar(cls):
        raise NotImplementedError


class ItauStrategy(BancoStrategy):
    @classmethod
    def debitar(cls, conta, valor):
        # Codigos especifico do Itau (exemplo)
        print("Débito realizado pelo Itau")


class SantanderStrategy(BancoStrategy):
    @classmethod
    def debitar(cls, conta, valor):
        # Codigos especifico do Santander (exemplo)
        print("Santander, Débito efetuado!")


class BradescoStrategy(BancoStrategy):
    @classmethod
    def debitar(cls, conta, valor):
        # Codigos especifico do Bradesco (exemplo)
        print("Sucesso!")

# ... métodos para todos os bancos

As classes foram colocadas juntas no mesmo arquivo como forma de facilitar a visualização. Considere que cada uma já pode estar em seu respectivo arquivo.
O último passo será criar a classe Banco, que receberá como parâmetro a estratégia escolhida:

from itau_strategy import ItauStrategy
from santander_strategy import SantanderStrategy
from bradesco_strategy import BradescoStrategy

class Banco:
    def __init__(self, banco_strategy):
        self.__banco_strategy = banco_strategy

    def debitar(self, conta, valor):
        self.__banco_strategy.debitar(conta, valor)

Banco(ItauStrategy).debitar(120, 123)
Banco(SantanderStrategy).debitar(110, 456)
Banco(BradescoStrategy).debitar(120, 789)

Como vimos, é possível transformar um código enorme em códigos menores e organizados. Com isso:

Facilita-se, e muito, a manutenção, pois se um banco parar de funcionar, não afeta o todo (baixo acoplamento).
Permite-se a adição e exclusão de novos bancos com maior facilidade.
Tem-se um menor número de conflitos no Git, já que não é um arquivo único.
Mais pessoas programadoras podem trabalhar no mesmo código.
O código fica melhor em legibilidade, logo é melhor entendido pelas pessoas.
Fica aberto para extensão, e fechado para alteração (SOLID Open/Closed Principle).
