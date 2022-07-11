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

## Inserir no final

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

<hr>

## Inserir em qualquer posição

<img src='linked_list_example_insert_anywhere-.webp'/>

Devemos informar que o elemento que estamos inserindo será adicionado na posição desejada em nossa estrutura.

👀 De olho na dica: a primeira posição, assim como em arrays, será considerada como 0

Levaremos em consideração as seguintes observações:

> Se o elemento tem a posição inferior a 1, será adicionado na posição inicial, utilizando a função insert_first;

> Se o elemento tem a posição igual ou superior à quantidade de elementos, será adicionado na posição final, utilizando a função insert_last.

```
linked_list_content.py
# from node import Node


class LinkedList:
    # ...

    def insert_at(self, value, position):
        if position < 1:
            return self.insert_first(value)
        if position >= len(self):
            return self.insert_last(value)
        current_value = self.head_value
        while position > 1:
            current_value = current_value.next
            position -= 1
        next_value = Node(value)
        next_value.next = current_value.next
        current_value.next = next_value
        self.__length += 1
```

Desta forma podemos voltar nossos esforços apenas para a parte que estava "descoberta". Ou seja, voltamos a nossa lógica apenas para as posições do meio da nossa estrutura. A lógica é similar ao inserir no final insert_last, no entanto, não analisamos se existe um próximo, mas sim se o próximo é a posição que queremos inserir o novo valor.

<hr>

## Remover no início

Devemos informar que o elemento que estamos removendo será o último da nossa estrutura de cadeia de Nodes. Os problemas vistos na sessão Inserir no final também se aplicam aqui.

Dito isso, caso tenhamos apenas um elemento em nossa estrutura, invocaremos a função de remoção existente, remove_first:

```
linked_list_content.py
# from node import Node


class LinkedList:
    # ...

    def remove_last(self):
        if len(self) <= 1:
            return self.remove_first()

        previous_to_be_removed = self.head_value

        while previous_to_be_removed.next.next:
            previous_to_be_removed = previous_to_be_removed.next

        value_to_be_removed = previous_to_be_removed.next
        previous_to_be_removed.next = None
        self.__length -= 1
        return value_to_be_removed
```

> 💡 Veja que essa função requer uma atenção especial, pois além de uma variável auxiliar que utilizamos como ponteiro para identificar o Node a ser removido, precisamos ter uma outra variável para indicar o Node anterior. Desta forma, indicamos que o Node anterior ao último vai apontar para None como próximo, liberando assim a referência ao anteriormente tido como último em nossa estrutura.

<hr>
