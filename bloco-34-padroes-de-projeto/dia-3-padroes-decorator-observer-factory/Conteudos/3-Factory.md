##Padrão Factory

O Padrão Factory pode ser dividido entre dois padrões classificados como padrões criacionais:

Factory Method: é um padrão que implementa uma interface responsável por fabricar/criar outros objetos.

Abstract Factory: é um padrão que permite produzir famílias de objetos relacionados. Por exemplo, considere que uma fábrica pode produzir diversos carros (Uno, Palio, Celta etc.) e diferentes tipos de motores (1.0, 1.4, 2.0). Essa estrutura simplifica a construção de um objeto Carro, ajudando na combinação dos diferentes elementos.

### Onde e/ou por que o Padrão Factory pode ser utilizado?\*\*

O Padrão Factory pode ser usado para:

Substituir as Fixtures, a fim de facilitar a criação de testes;
Simplificar a criação de objetos diferentes, pois dispensa conhecer os métodos e parâmetros da fábrica;
Caso um novo tipo de objeto surja na regra de negócio, é fácil adaptar para que a fábrica também o produza;
Fazer uso do princípio de responsabilidade única (SOLID), já que o código de criação do objeto se concentra em um único lugar.

### Aplicando o Padrão Factory

Vamos aplicar o padrão Factory Method para ajudar uma hamburgueria a impulsionar suas vendas! 🍔 A nossa intenção será estimular a aquisição de Combos por clientes. Para agilizar a produção dos combos e evitar erros, vamos desenvolver uma Fábrica de Combos, que facilitará a montagem dos mesmos.

Basicamente, uma fábrica é uma classe de Interface Criadora, que é herdada por fábricas Criadoras Concretas, que veremos nos passos 3 e 4 a seguir:

1️⃣ Vamos começar criando uma classe abstrata, que será a interface base para as classes dos itens do cardápio:

from abc import ABC, abstractmethod

class Item(ABC):
@abstractmethod
def **repr**(self): # **repr** é o método que o Python chama quando realizamos um print() do objeto
pass

2️⃣ Criaremos agora as classes dos itens do cardápio, que possuem a interface Item, criada anteriormente, e implementa os métodos que a interface sugere (**repr** em nosso caso):

class ItemHamburger(Item):
def **repr**(self):
return "Hamburguer"

class ItemRefrigerante(Item):
def **repr**(self):
return "Refrigerante"

class ItemSorvete(Item):
def **repr**(self):
return "Sorvete"

class ItemFritas(Item):
def **repr**(self):
return "Fritas"

3️⃣ Para finalmente implementarmos a nossa Fábrica, vamos criar uma Interface Criadora, que define a assinatura do método criar_combo, além de implementar os métodos exibe_itens e adicionar_itens que serão oferecidos para quem herdá-la:

# ...

class Combo(ABC):
def **init**(self):
self.items = []
self.criar_combo()

    @abstractmethod
    def criar_combo():
        pass

    def exibe_itens(self):
        return self.items

    def adicionar_itens(self, item):
        self.items.append(item)

4️⃣ Por fim, implementaremos as classes Criadoras concretas, que possuem a responsabilidade final de fabricar o objeto desejado e tudo que é necessário para ele:

Em nosso exemplo, temos três Combos: ComboTudo, ComboFeliz e ComboGelado. Cada um é fabricado conforme é desejado pelo restaurante.

class ComboTudo(Combo):
def criar_combo(self):
self.adicionar_itens(ItemHamburger())
self.adicionar_itens(ItemSorvete())
self.adicionar_itens(ItemFritas())
self.adicionar_itens(ItemRefrigerante())

class ComboFeliz(Combo):
def criar_combo(self):
self.adicionar_itens(ItemHamburger())
self.adicionar_itens(ItemFritas())
self.adicionar_itens(ItemRefrigerante())

class ComboGelado(Combo):
def criar_combo(self):
self.adicionar_itens(ItemHamburger())
self.adicionar_itens(ItemSorvete())

5️⃣ Agora podemos apenas usar nossa fábrica e teremos um código simples e objetivo:

if **name** == "**main**":
combo_escolhido = input(
"Olá, qual seu pedido? [ComboTudo, ComboFeliz, ComboGelado]: "
)

    #Para transformar uma string em código executável basta usar o método eval()
    # Equivalente a chamar ComboTudo(), ComboFeliz(), ComboGelado()
    combo = eval(combo_escolhido)()

    print(f"\nCriando o combo {type(combo).__name__}.")
    print(f"Combo fabricado com os seguintes itens: {combo.exibe_itens()}")

Podemos perceber que depois que as fábricas ficaram prontas, a lógica da chamada final de fabricar os combos ficou bem mais simples, assim como inserir um novo combo no código não exige muitas manutenções, pois basta criar um novo objeto que represente uma nova fábrica concreta.

O Padrão Factory organiza bem o código, permitindo dividir a tarefa de desenvolvimento entre mais pessoas, afinal, cada pessoa pode puxar uma fábrica concreta no dia a dia.

### Exercício de fixação

Atualize o código acima com um novo combo, chamado de Combo Fritas, que será composto somente de hambúrguer e fritas.
