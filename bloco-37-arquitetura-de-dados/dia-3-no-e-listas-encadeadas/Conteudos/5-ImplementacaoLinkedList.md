## Implementação de uma LinkedList

Devemos utilizar a classe criada anteriormente, para criar nossa estrutura da LinkedList:

<img src ='linked_list_example-.webp'>

```python
linked_list_content.py

from node import Node


class LinkedList:
    def __init__(self):
        self.head_value = None
        self.__length = 0

    def __str__(self):
        return f"LinkedList(len={self.__length}, value={self.head_value})"

    def __len__(self):
        return self.__length
```

💡 Utilizamos o conceito Literal String Interpolation na função **str**. Caso haja dúvidas, dê uma olhada na doc do pep-0498.

Agora vamos implementar as operações do LinkedList para entendermos melhor as funcionalidades dessa estrutura de dados.

### Inserir no início

<img src='linked_list_example_insert_first-.webp'>

Devemos informar que o elemento que estamos inserindo é o novo head_value:

```
linked_list_content.py

# from node import Node


class LinkedList:
    # ...

    def insert_first(self, value):
        first_value = Node(value)
        self.head_value = first_value
        self.__length += 1
```

Caso optemos por inserir o valor 3, teremos o resultado:

`LinkedList(len=1 value=Node(value=3 next=None))`

No entanto, seguir essa abordagem faz com que os elementos anteriores sejam sobrepostos pelo novo. Dito isso, devemos indicar que o elemento atual, head_value, será o next do elemento que estamos inserindo.

Resumindo: ✏️ o next será preenchido com o valor que está atualmente na head_value, para que o novo valor, que estamos inserindo no início da lista, seja preenchido na variável head_value, tornando-se a "cabeça" da lista.

```
# from node import Node


class LinkedList:
    # ...

    def insert_first(self, value):
        first_value = Node(value)
        first_value.next = self.head_value
        self.head_value = first_value
        self.__length += 1
```

Desta forma, adicionando o valor 3 e posteriormente o valor 1 teremos o resultado:

    ```LinkedList(len=2 value=Node(value=1 next=Node(value=3 next=None)))```

<hr>

### Inserir no final

<img src='linked_list_example_insert_last-.webp'>

Devemos informar que o elemento que estamos inserindo será o último na nossa estrutura de cadeia de Nodes:

> linked_list_content.py

# from node import Node

```
class LinkedList:
    # ...

    def insert_last(self, value):
        last_value = Node(value)
        current_value = self.head_value

        while current_value.next:
            current_value = current_value.next
        current_value.next = last_value
        self.__length += 1
```

Idealmente esta abordagem estaria correta, desde que houvesse ao menos um elemento em nossa estrutura. Porém, caso não haja nenhum elemento, o trecho while current_value.next: causaria o erro AttributeError: 'NoneType' object has no attribute 'next'.

Isso acontece, pois o head_value ainda não possui valor. Para corrigir essa lógica, podemos utilizar a função insert_first escrita previamente:

> linked_list_content.py

```
# from node import Node


class LinkedList:
    # ...

    def insert_last(self, value):
        last_value = Node(value)
        current_value = self.head_value

        # Mais abaixo criaremos o método is_empty()
        # que substituirá a condição deste if
        if current_value is None:
            return self.insert_first(value)

        while current_value.next:
            current_value = current_value.next
        current_value.next = last_value
        self.__length += 1
```

Desta forma, adicionando o valor 3 e posteriormente o valor 1 teremos o resultado:

`LinkedList(len=2 value=Node(value=3 next=Node(value=1 next=None)))`

Percebam que usamos a variável auxiliar current_value para percorrer toda a cadeia de Nodes. Isto é necessário, pois assim não perdemos a referência para a cabeça da estrutura, head_value.
