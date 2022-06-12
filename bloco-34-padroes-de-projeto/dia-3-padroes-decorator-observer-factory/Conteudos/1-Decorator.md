## Padrão Decorator

O Decorator é um padrão de projeto estrutural que permite adicionar novos comportamentos e responsabilidades aos objetos de forma flexível.

Lembra do @fixture, que utilizamos para decorar um teste com objetos pré-carregados? Pois é, usar notações com @ antes dos métodos é a forma com que o Python lida com os decorators. Mas hoje, vamos além, pois criaremos o nosso código com o Padrão Decorator, ou seja, daremos mais poderes aos nossos métodos sem a necessidade de subclasses para estender funcionalidades.

### Aplicando o Padrão Decorator

Vamos criar uma calculadora para um jogo de matemática para a Educação Infantil:

1️⃣ Podemos começar criando a classe de objeto Calculadora, com o método somar():

class Calculadora:
def soma(self, x, y):
return x + y

2️⃣ Parece que está funcionando bem, caso sejam passados os parâmetros x e y como números. Porém, recebemos a missão de criar uma calculadora que consiga interpretar números escritos por extenso, reconhecendo em inglês ou em português, dependendo de como a pessoa usuária preferir:

"um", "dois, "três", "quatro", "cinco", "seis", "sete", "oito", "nove", "dez"

"um" + "quatro" = 5

### Calculadora Decorada

3️⃣ Mas esta classe Calculadora() é utilizada em outros lugares do sistema, então o time de desenvolvimento decidiu que não podemos alterá-la. A solução será criar uma nova classe que atenda às nossas necessidades, mas como a pessoa usuária poderá escolher, optaremos por criar uma calculadora decorada utilizando o Padrão Decorator:

class CalculadoraDecorada:
def **init**(self, calculadora):
self.calculadora = calculadora

    def converterNumero(self, numero):
        if not isinstance(numero, str):
            return numero

        # Neste cenário, em vez de fazermos IF e else... podemos usar o dicionário
        # conseguimos acessar obter o valor a partir da chave
        return {
            "um": 1, "dois": 2, "três": 3, "quatro": 4, "cinco": 5,
            "seis": 6, "sete": 7, "oito": 8, "nove": 9, "dez": 10,
        }.get(numero)

    def soma(self, x, y):
        return self.calculadora.soma(
            self.converterNumero(x), self.converterNumero(y)
        )

4️⃣ Agora que já temos uma calculadora decorada, podemos utilizá-la no lugar da principal:

if **name** == "**main**":
calculadora = Calculadora()
print("10 + 20 =")
calculadora.soma(10, 20)

    calculadoraDecorada = CalculadoraDecorada(calculadora)
    print("'oito' + 'dois' =", calculadoraDecorada.soma("oito", "dois"))

▶️ Em resumo, com o Padrão Decorator é possível adicionar ou remover comportamentos dos objetos de forma dinâmica, sem o risco de precisar alterar códigos já testados.

### Exercícios de fixação

Crie uma segunda classe decorator que contemple os números em inglês:
"one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"
