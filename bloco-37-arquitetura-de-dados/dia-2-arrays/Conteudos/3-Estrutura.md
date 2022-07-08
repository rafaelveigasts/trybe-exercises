## Entendendo a estrutura

Para entender o que acontece a cada inserção em um array, devemos entender o comportamento de uma lista (list), pois é a base da implementação da nossa estrutura de dados.
Lembre-se que agora estamos falando da estrutura de dados Array, ou seja, a implementação do tipo abstrato. É incorreto falar sobre estas análises em um tipo abstrato de dados.
array_example.py

```
import sys

# class Array:
#     def __init__(self):
#         self.data = []
# ...
# array = Array()

# sys.getsizeof retorna o tamanho da lista em bytes
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size)

# ...
```

Quando inicializamos nossa estrutura array e internamente inicializamos uma lista(list) vazia, adicionando alguns itens, um espaço adicional é reservado para armazenar os itens. O tamanho de cada slot é baseado no tamanho da estrutura que vamos armazenar (referência para objetos no caso do Python).
Vamos inserir alguns itens e comparar o resultado.

> array_example.py

```
# ...

array.set(0, "Marcos")
array.set(1, "Patrícia")
# quando começamos as inserções o valor muda
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size)  # 56

array.set(2, "Matheus")
array.set(3, "Giovana")
# como um espaço adicional é reservado o valor não é modificado
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size) # 88
```

Inserimos mais alguns valores e vamos ver o que acontece.

> array_example.py

```
# ...

array.set(4, "Alberto")
array.set(5, "Marta")
array.set(6, "Túlio")
array.set(7, "Michelle")
array_memory_size = sys.getsizeof(array.data)
print(array_memory_size) # 120
```

Agora notamos que a lista cresceu de tamanho à medida que adicionamos novos itens. De acordo com a documentação da linguagem Python, a cada vez que um elemento é inserido, a lista cresce o seu tamanho em 1.125.

Embora à primeira vista pareça que a estrutura apenas aloca mais espaços em memória e adiciona novos itens, o que acontece na verdade é que, quando há um crescimento, um novo endereço na memória é reservado para uma nova lista. Em seguida, os elementos são copiados da lista original para a nova, e então o novo elemento é adicionado ao espaço de memória da nova lista.

Para ajudar a compreensão, vamos ver isto de uma forma um pouco mais visual.

```
# Supondo uma lista com 4 valores numéricos:
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |   posição na memória: 0x01
            *---*---*---*---*

# Ao adicionar um novo item, a lista precisa crescer:
            *---*
novo item   | 5 |
            *---*
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |    posição na memória: 0x01
            *---*---*---*---*

# Uma nova lista é criada:
            *---*---*---*---*---*---*---*---*
nova        |   |   |   |   |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

# Os elementos da lista original são copiados para a nova lista:
            *---*---*---*---*
original    | 1 | 2 | 3 | 4 |    posição na memória: 0x01
            *---*---*---*---*
              ↓   ↓   ↓   ↓
            *---*---*---*---*---*---*---*---*
nova        | 1 | 2 | 3 | 4 |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

# O novo elemento é colocado na nova lista:
            *---*
novo item   | 5 | -------------
            *---*             ↓
            *---*---*---*---*---*---*---*---*
nova        | 1 | 2 | 3 | 4 |   |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*

# O endereço onde se encontrava a lista antiga é liberado para ser utilizado
# e o "nome original" é atribuído a nova lista:
            *---*---*---*---*---*---*---*---*
original    | 1 | 2 | 3 | 4 | 5 |   |   |   |    posição na memória: 0x1A
            *---*---*---*---*---*---*---*---*
```

Essa organização em espaços contínuos em memória torna o acesso a índices muito eficiente, pois basta pegar o endereço em memória do primeiro elemento e somar ao índice, multiplicando pelo tamanho do tipo armazenado e teremos o valor daquela posição. Posso ter dez, cem ou mil itens que o tempo para acessar o valor pelo índice será o mesmo.

> 💡 A decisão por criar uma nova lista e os valores parece esquisita a primeira vista, mas a operação de realocação tem um custo muito muito grande, explicando assim esta decisão.

Até agora inserimos somente ao final do nosso array. Mas e se precisarmos adicionar um elemento no início, ou no meio?

> array_example.py

```
# ...
# array = Array()

array.set(0, "Marcos")
array.set(1, "Patrícia")
# print(array), internamente chama o método array.__str__() que implementamos
print(array)  # saída: ["Marcos", "Patrícia"]

# inserindo no começo do array
array.set(0, "Valeria")
print(array)  # saída: ["Valeria", "Marcos", "Patrícia"]

# inserindo em uma posição intermediária
array.set(1, "Miguel")
print(array) # saída: ['Valeria', 'Miguel', 'Marcos', 'Patrícia']
```

Quando inserimos um novo elemento no início do array, todos os elementos já existentes são deslocados à direita, tendo seu índice modificado em 1. Análogo a isto, quando adicionamos em uma posição intermediária, todos os elementos com índices posteriores ao inserido serão movidos em uma posição.

```
# Supondo uma lista com 4 caracteres ao qual adicionaremos mais um no início:
            *---*
novo item   | a |
            *---*
              ↓
            *---*---*---*---*
original    | b | c | d |   |    posição na memória: 0x01
            *---*---*---*---*
                ⤻  ⤻  ⤻

# Os elementos são deslocados para o próximo índice.

            *---*---*---*---*
original    | a | b | c | d |    posição na memória: 0x01
            *---*---*---*---*


# As regras de crescimento ainda se aplicam portanto pode ser que uma nova lista
# seja criada, o elemento adicionado e os elementos copiados para a nova lista.
# Ainda assim, o índice de todos os elementos posteriores a inserção
# serão acrescidos em 1.
```

O mesmo acontece se inserirmos um novo elemento no meio da lista:

```
# Supondo uma lista com 3 caracteres ao qual adicionaremos mais um na segunda posição, vulgo índice 1:
(inserimos b na posição 1).

                *---*
novo item       | b |
                *---*
                  ↓
            *---*---*---*---*
original    | a | c | d |   |    posição na memória: 0x01
            *---*---*---*---*
                    ⤻  ⤻

# O resultado final seria:
            *---*---*---*---*
original    | a | b | c | d |    posição na memória: 0x01
            *---*---*---*---*
```

Algo similar ocorre quando fazemos remoções de valores à partir dos índices:

```
# Supondo uma lista com 4 caracteres ao qual removeremos um elemento

# Se removermos o último elemento (índice 3), nada precisa ser modificado

         *---*---*---*---*
array    | a | b | c |   |    posição na memória: 0x01
         *---*---*---*-⤹-*
                        d

# Porém se removermos o primeiro, ou qualquer outro índice,
# todos os valores serão deslocados à esquerda:
                 ⤺  ⤺  ⤺
         *---*---*---*---*---*---*---*---*
array    | a |   | c | d | e |   |   |   |    posição na memória: 0x01
         *---*-⤹-*---*---*---*---*---*---*
                b

# À medida que itens são removidos, a estrutura diminui em tamanho:
         *---*---*---*---*
array    | a | c | d | e |    posição na memória: 0x01
         *---*---*---*---*
```

O código de remoção ficaria assim:
array_example.py

```
# import sys

class Array:
    # ...
    def remove(self, index):
        # removeremos o item, retornando-o
        return self.data.pop(index)

# ...
# array = Array()
array.set(0, "Marcos")
array.set(1, "Patrícia")
print(array)  # saída: ['Marcos', 'Patrícia']

array.remove(0)  # retorna a string "Marcos"
print(array)  # saída: ['Patrícia']
```

### Exercício de Fixação

3 Que tal adicionarmos um método update que atualiza o valor a partir de um índice?

🐦 A assinatura deve ser def update(self, index, value):
