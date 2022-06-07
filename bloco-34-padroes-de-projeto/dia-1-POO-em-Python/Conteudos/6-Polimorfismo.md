## Polimorfismo

### Polimorfismo de métodos

É quando um objeto pode conter diferentes declarações de um método, de acordo com os parâmetros de entrada. Algumas linguagens até permitem que você escreva um novo método como o mesmo nome, porém, com mais ou menos parâmetros (C#).

Contudo, em Python este recurso é liberado apenas indicando que os elementos são opcionais.

Voltando no exemplo da classe Pessoa, para declarar informarmos a idade, o nome e saldo_na_conta, mas será que é necessário? Podemos deixar alguns opcionais ? Observe o exemplo a seguir:

class Pessoa:
    # None é equivalente ao clássico NULL em outras linguagens
    def __init__(self, nome, idade=None, saldo_na_conta=None):
        self.idade = idade
        self.nome = nome
        self.saldo_na_conta = saldo_na_conta
        self.brinquedos = []

pessoa_1 = Pessoa("Marcelo", 22, 700)
pessoa_2 = Pessoa("Matheus")
pessoa_3 = Pessoa("Matheus", 33)
pessoa_4 = Pessoa("Matheus", saldo_na_conta=100)

### Polimorfismo com interface

Técnica que reduz significativamente o esforço para ampliar um projeto. A Interface é uma classe abstrata que define comportamentos para classes concretas.
Vamos considerar uma aplicação que gera três tipos de gráficos:

<img src ='graficos.png' />

Para desenvolver esta aplicação, podemos criar uma classe Grafico(), possuindo um método para cada gráfico existente, e um método geral desenhar(), que possui uma condição para escolher o tipo de gráfico. Observe:
Copiar
class Grafico:
    def __init__(self, dados):
        self.dados = dados

    def desenhar(self, tipo_de_grafico):
        if tipo_de_grafico == "GraficoBarras":
            self.__desenharGraficoBarras()

        if tipo_de_grafico == "GraficoRadar":
            self.__desenharGraficoBarras()

        if tipo_de_grafico == "GraficoPizza":
            self.__desenharGraficoBarras()

    def __desenharGraficoBarras(self):
        print("Lógica para gráfico de barras")

    def __desenharGraficoRadar(self):
        print("Lógica para gráfico radar")

    def __desenharGraficoPizza(self):
        print("Lógica para gráfico de Pizza")


grafico_1 = Grafico([1, 2])

grafico_1.desenhar("GraficoRadar")

Este código pode parecer seguir as boas práticas de estrutura. Entretanto, sempre que forem adicionados novos gráficos ele ficará ainda maior e consequentemente custoso para realizar a manutenção.

⚠️ Aviso: Estruturas como essas são conhecidos como Code Smell, ou seja, código que cheira mal (Code Smell).

Como a vida de uma pessoa programadora consiste em resolver problemas, temos uma solução para os Code Smell. Por meio de uma Interface, podemos aplicar o polimorfismo em Python, melhorando assim a qualidade do código, como podemos ver a seguir:

from abc import ABC, abstractmethod


class Grafico(ABC):
    @abstractmethod
    def desenhar(self):
        raise NotImplementedError


class GraficoBarras():
    def __init__(self, dados):
        self.dados = dados

    def desenhar(self):
        print("Lógica para gráfico de barras")


class GraficoRadar():
    def __init__(self, dados):
        self.dados = dados

    def desenhar(self):
        print("Lógica para gráfico radar")


class GraficoPizza():
    def __init__(self, dados):
        self.dados = dados

    def desenhar(self):
        print("Lógica para gráfico de Pizza")


grafico_1 = GraficoRadar([1, 2])
grafico_1.desenhar()
