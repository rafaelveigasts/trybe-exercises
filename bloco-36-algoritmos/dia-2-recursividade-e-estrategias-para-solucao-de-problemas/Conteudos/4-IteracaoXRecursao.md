## Iterativo x Recursivo!

Agora, vamos ver que é possível ter funções tanto recursivas, quanto iterativas para o mesmo problema. Para isso, utilizaremos os exemplos que já usamos nesse conteúdo.

Vamos começar olhando para a função recursiva de contagem regressiva. Conseguimos montar uma função iterativa para ela? Sim! Vamos ver como fazer isso:

def iterative_countdown(n):
while n > 0:
print(n)
n = n - 1
print("FIM!")

iterative_countdown(5)
Vamos ver agora como fica o código iterativo de cálculo de fatorial:

def iterative_factorial(n):
fact = 1

    for i in range(1, n + 1):
        fact = fact * i

    return fact

iterative_factorial(5)

Como vimos anteriormente, escolher entre uma solução recursiva ou iterativa depende muito do que estamos buscando.

Escolher uma solução recursiva não significa ganho de performance, muito pelo contrário, grande parte das vezes, a solução iterativa será mais performática.

Escolher a solução recursiva terá um ganho na diminuição de complexidade do código do seu projeto. Aqui, complexidade significa legibilidade. Ou seja, nosso código fica mais simples, mais harmonioso, quando utilizamos a recursividade.
