## Melhor caso, pior caso e caso médio

Há um último conceito importante para aprendermos aqui, antes de passarmos para a aula ao vivo e os exercícios!

Você verá mais para frente durante seu aprendizado aqui na Trybe, os termos "melhor caso", "pior caso" e "caso médio".

Eles significam o seguinte: "A depender da minha entrada, o meu algoritmo pode executar em O(1) ou O(n)". Por exemplo, pense na busca sequencial:

def linear_search(numbers, target):
n = len(numbers) # N será a quantidade de elementos da lista
for index in range(0, n): # vamos iterar a lista completa
if numbers[index] == target: # se encontrar o elemento alvo, retorne a posição
return index

    return -1 # Não encontrou? Retorne -1

print(linear_search([1, 2, 3], 2)) # saída: 1
print(linear_search([1, 2, 3], 4)) # saída: -1

Dizemos que, para entradas muito grandes, esse algoritmo é O(n).

O que acontece, porém, caso tenhamos sorte e o número que procuramos seja o primeiro do array?🤔

Resposta: Nesse caso, mesmo para uma entrada infinita, nossa complexidade será O(1). Esse é o melhor caso desse algoritmo. De forma análoga, o pior caso é o número ser o último elemento do array, ou seja O(n).

Você pode estar se perguntando: "E o caso médio"? 🤔

Resposta: Seria algo como O(n \* 1/2), por exemplo. Nesse caso, o número que procuramos está no meio da lista. Mas, para entradas muito grandes, aprendemos a desprezar os números menos relevantes da soma, então, podemos simplificar e dizer que o caso médio é O(n) também.

Diferentes algoritmos têm diferentes cenários de melhor caso, pior caso e caso médio. Veremos vários exemplos disso ao longo dos próximos blocos.
