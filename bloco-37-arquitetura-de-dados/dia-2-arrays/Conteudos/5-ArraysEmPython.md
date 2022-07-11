## Arrays no Pythonverso

Arrays também estão presentes no universo Python em outras implementações além do tipo list. Abaixo veremos alguns exemplos:

### Módulo array

Este módulo que já vem na linguagem Python, contém uma implementação de arrays compacta e otimizada para valores básicos como caracteres, números inteiros e ponto flutuante.

> module_array_example.py

```import sys
from array import array

# define um array vazio de inteiros sem sinal
myarray = array("I")

# podemos adicionar alguns valores
myarray.insert(0, 5)  # na posição 0 o valor 5
myarray.insert(1, 3)
myarray.insert(2, 5)
print("Após adicionar alguns valores: ", myarray)

# adicionar em uma posição intermediária
myarray.insert(1, 4)
print("Após inserção em índice intermediário: ", myarray)


# remover um valor através do índice
myarray.pop(0)
print("Após remover um valor:", myarray)

# compare o tamanho entre uma lista e um array
elements = list(range(100))  # definimos uma lista de 100 números
print("Tamanho da lista:", sys.getsizeof(elements))
array_from_list = array("I", elements)  # criamos um array a partir da lista
print("Tamanho do array", sys.getsizeof(array_from_list))
```

Um exemplo de utilização deste array pode ser para armazenar avaliações de um motorista em um sistema de motoristas particulares.

### Numpy

Pacote fundamental para computação científica em Python, possui uma implementação rápida e versátil para array de n-dimensões.

🐦 Para usar o Numpy devemos instalá-lo através do pip. Vamos utilizar o seguinte comando:

```
python3 -m pip install numpy
```

> numpy_array_example.py

```
import numpy as np

# define um array vazio de inteiros
myarray = np.array([], dtype=int)

# podemos adicionar alguns valores
myarray = np.insert(myarray, 0, 5)  # na posição 0 o valor 5
myarray = np.insert(myarray, 1, 3)
myarray = np.insert(myarray, 2, 5)
print("Após adicionar alguns valores: ", myarray)

# adicionar em uma posição intermediária
myarray = np.insert(myarray, 1, 4)
print("Após inserção em índice intermediário: ", myarray)


# remover um valor através do índice
myarray = np.delete(myarray, 0)
print("Após remover um valor:", myarray)
```

Bibliotecas como o pandas para análise de dados, ou scikit-learn para aprendizado de máquina utilizam o numpy por baixo dos panos, devido a sua implementação eficiente.
