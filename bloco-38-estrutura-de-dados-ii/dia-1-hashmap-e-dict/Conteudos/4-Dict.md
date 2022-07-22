## A classe Dict de Python

Dicionários (Dict) são estruturas de dados do tipo chave-valor que são implementados como hashmaps por baixo dos panos. A combinação de hash functions e tratamento de colisões do Dict garantem uma complexidade assintótica de O(1) para inserção de consulta. São estruturas muito eficientes, versáteis e poderosas. O Dict considera verificações importantes como a existência de apenas uma chave, bem como fornece diversos métodos convenientes para acesso e manipulação dos dados.

A sintaxe para utilização do Dict é diferente do que usamos na classe HashMap que construímos. Daqui pra frente, vamos seguir apenas com o uso do Dict de Python, uma vez que é mais eficiente e segura. Vamos ver como fica o nosso problema do cadastro, implementado com a classe Dict:

```
# Instanciando a classe Dict
employee_registry = {}

# Inserindo dados
# objeto[chave] = valor
employee_registry[14] = 'name1'
employee_registry[23] = 'name2'
employee_registry[10] = 'name3'
employee_registry[9] = 'name4'
print(employee_registry)

# Alterando o nome do id 10
# objeto[chave] = novo_valor
employee_registry[10] = 'name30'
print(f"Novo valor do id 10, após a atualização: {employee_registry[10]}")
```

> Para executar o código acima você pode criar um novo arquivo.

⚠️Atenção: apenas objetos imutáveis podem ser utilizados como chave, ou seja, apenas aqueles objetos que depois de instanciados não podem ser alterados. Isso varia de linguagem para linguagem. Em Python, os objetos imutáveis são:

```
- int;

- float;

- string;

- tuple;

- range;

- byte;

- frozenset.
```

👀 De olho na dica: não se preocupe se você não conhece ainda alguns desses objetos. Você sempre pode consultar na internet se o objeto que você quer usar como chave é imutável ou consultar a lista completa de objetos imutáveis de Python.

Agora vamos ver a sintaxe para as principais operações.

```
# Instanciação do objeto vazio
dict1 = {}
dict2 = dict()

# Instanciação com preenchimento inicial de dados
dict3 = {1: 'name1', 2: 'name2'}
print(f"Dicionário 1: {dict1}")
print(f"Dicionário 2: {dict2}")
print(f"Dicionário 3: {dict3}")

# Inserção e Alteração
# Se a chave não existir no dict, uma nova entrada será criada
# Se já existir, o valor será sobreposto
dict1[14] = 'name1'
print(f"Novo dicionário 1, pós inserção/alteração: {dict1}")

# Consulta e Remoção
# Se a chave não existir no dict, causa erro
name = dict1[14]
del dict1[14]
print(f"Dicionário 1 pós consulta e deleção: {dict1}")
```

### Outros métodos para a manipulação de dados

Além dessas operações, a classe Dict oferece vários métodos convenientes para a manipulação dos dados que podem ser consultados na documentação. Consultar a documentação é uma das formas mais poderosas de se aprender sobre um aspecto da linguagem ou framework que você está utilizando:

<li>Documentação oficial da classe Dict https://docs.python.org/3/tutorial/datastructures.html#dictionaries

<li>Métodos da classe Dicthttps://docs.python.org/3/library/stdtypes.html#dict

Para praticar, vamos fazer mais dois exercícios: 💪

**Exercício 5:** Consulte a forma de se criar um dicionário chamado de dict comprehension e crie um dicionário que mapeia inteiros de 3 a 20 para o seu dobro.

Exemplo:

```
- 3 deve ser mapeado para 6;

- 10 deve ser mapeado para 20.
```

**Exercício 6:** Dada uma string, construa um dicionário com a contagem de cada caractere da palavra. Utilize o pseudocódigo e o exemplo abaixo para se nortear.

```
Para cada char na string:
	- Se o char não estiver no dicionário, inclua com o valor 1;

	- Se estiver, incremente o valor.


# Exemplo:

str = "bbbbaaaacccaaaaaaddddddddccccccc"
# saída: {'b': 4, 'a': 10, 'c': 10, 'd': 8}

str = "coxinha"
# saída: {'c': 1, 'o': 1, 'x': 1, 'i': 1, 'n': 1, 'h': 1, 'a': 1}
# Explicação: Nenhuma letra repete em coxinha :)
```

**Exercício 7:** Utilize o dicionário criado no exercício 5. Para as chaves ímpares, não queremos mais mapear para o seu dobro, mas sim para o seu triplo. Consulte o método keys() e atualize o seu dicionário para a nova regra.
