## Tipos de dados embutidos

### Booleanos (bool)

Os valores booleanos True e False pertencem ao tipo embutido bool.

De olho na dica👀: Aqui devemos ficar atentos ao início maiúsculo dessas palavras reservadas.

Números inteiros (int)

O primeiro dos tipos numéricos é o int, ele representa um número inteiro, ou seja, é escrito sem parte fracionária.

Inicialize uma variável a = 5, digite o comando type(a) e observe o retorno.

Anota aí ✏️: O método type(operando) corresponde ao operador typeof operando do JavaScript.

De olho na dica👀: Assim como qualquer linguagem de programação, Python também possui uma grande quantidade de comandos que precisamos aprender. Para nos ajudar nessa tarefa, podemos digitar help() dentro da linha de comandos do Python que ele nos dará detalhes do comando passado por parâmetro.

Exemplo:

help(list)

O comando help() também pode ser utilizado em cláusulas if ou for, desde que colocado entre aspas e para sair de dentro do comando, basta apertar a tecla q.

help("if")

## Números fracionários (float)

O segundo tipo numérico é o float, também conhecido por ponto flutuante, ele representa um número decimal ou fracionário.

Inicialize uma variável a = 5.0, digite o comando type(a) e observe o retorno.

Strings (str)

Além dos tipos numéricos, temos o tipo de sequência de texto str. Ele representa uma cadeia de caracteres ou, como popularmente conhecida, uma string. As strings são definidas envolvendo um valor com aspas simples ou duplas. Exemplo: a = "Olá"

Temos ainda estruturas do tipo:
sequência(list, tuple, range);
conjuntos(set, frozenset);
mapeamento(dict);
sequências binárias(bytes, bytearray, memoryview).
Além dessas temos várias outras, que você pode encontrar acessando os links abaixo:
Tipos padrões do Python
Outros tipos de dados do Python
Listas (list)

Anota aí ✏️: uma lista é uma sequência mutável e ordenada de elementos. Ela pode armazenar elementos heterogêneos, ter seu tamanho variável e crescer à medida que itens são adicionados.
Sintaxe:

fruits = ["laranja", "maçã", "uva", "abacaxi"]  # elementos são definidos separados por vírgula, envolvidos por colchetes

fruits[0]  # o acesso é feito por indices iniciados em 0

fruits[-1]  # o acesso também pode ser negativo

fruits.append("banana")  # adicionando uma nova fruta

fruits.remove("abacaxi")  # removendo uma fruta

fruits.extend(["pera", "melão", "kiwi"])  # acrescenta uma lista de frutas a lista original

fruits.index("maçã")  # retorna o índice onde a fruta está localizada, neste caso 1
 em seu programa
fruits.sort()  # ordena a lista de frutas
Vamos continuar com os exercícios! 💪
Copie a lista abaixo para realizarmos os exercícios de fixação 5 e 6:

trybe_course = ["Introdução", "Front-end", "Back-end"]
De olho na dica👀: Funções e variáveis devem ser nomeadas com letras minúsculas e, caso tenham mais de uma palavra, com underscore: minha_variavel.
Exercício 5: Adicione o elemento "Ciência da Computação" à lista.
Exercício 6: Acesse e altere o primeiro elemento da lista para "Fundamentos".
Tuplas (tuple)
São similares a listas, porém não podem ser modificados durante a execução do programa.
Sintaxe:

user = ("Cássio", "Botaro", 42)  # elementos são definidos separados por vírgula, envolvidos por parenteses

user[0]  # acesso também por índices
Conjuntos (set)
Um conjunto é uma coleção de elementos únicos e não ordenados. Conjuntos implementam operações de união, intersecção e outras.
Sintaxe:

permissions = {"member", "group"}  # elementos separados por vírgula, envolvidos por chaves

permissions.add("root")  # adiciona um novo elemento ao conjunto

permissions.add("member")  # como o elemento já existe, nenhum novo item é adicionado ao conjunto

permissions.union({"user"})  # retorna um conjunto resultado da união

permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
Hora da prática ⏰
Exercício 7: Um conjunto ou set pode ser inicializado utilizando-se também o método set(). Inicialize uma variável com essa função var = set() e adicione seu nome ao conjunto utilizando um dos métodos vistos acima. Depois, imprima a variável e confira se o retorno é: {'seu_nome'}.
Conjuntos imutáveis (frozenset)
É uma variação do set, porém imutável, ou seja, seus elementos não podem ser modificados durante a execução do programa.
Sintaxe:

permissions = frozenset(["member", "group"])  # assim como o set, qualquer estrutura iterável pode ser utilizada para criar um frozenset

permissions.union({"user"})  # novos conjuntos imutáveis podem ser criados à partir do original, mas o mesmo não pode ser modificado

permissions.intersection({"user", "member"})  # retorna um conjunto resultante da intersecção dos conjuntos

permissions.difference({"user"})  # retorna a diferença entre os dois conjuntos
Dicionários (dict)
Estrutura que associa uma chave a um determinado valor. É a representação do tão famoso objeto que utilizamos em JavaScript.
Sintaxe:

people_by_id = {1: "Cássio", 2: "Cristina", 3: "Felipe"}  # elementos no formato "chave: valor" separados por vírgula, envolvidos por chaves

people_by_name = {"Cássio": 1, "Cristina": 2, "Felipe": 3}  # outro exemplo, dessa vez usando strings como chaves. As aspas são necessárias para que o Python não ache que `Cássio`, `Cristina` e `Felipe` sejam variáveis.

# elementos são acessados por suas chaves
people_by_id[1]  # saída: Cássio

# elementos podem ser removidos com a palavra chave del
del people_by_id[1]
people_by_id.items()  # dict_items([(1, "Cássio"), (2, "Cristina"), (3, "Felipe")])
# um conjunto é retornado com tuplas contendo chaves e valores
Bora fixar os aprendizados sobre dicts?💪
Utilizando o código abaixo, faça os exercícios 8 e 9:

info = {
  "personagem": "Margarida",
  "origem": "Pato Donald",
  "nota": "Namorada do personagem principal nos quadrinhos do Pato Donald",
}

De olho na dica👀: Em Python, precisamos colocar a chave do objeto entre aspas.

Exercício 8: Insira no objeto uma nova propriedade com o nome de chave "recorrente" e o valor "Sim". Em seguida, imprima o objeto no console.

Exercício 9: Remova a propriedade cuja chave é "origem" e imprima o objeto no console.
Range (range)
Estrutura capaz de gerar uma sequência numérica de um valor inicial até um valor final, modificando seu valor de acordo com o passo (step) definido. Pode ser declarado como range( [start], stop[, step] ), em que start e step podem ser omitidos, possuindo valores iniciais iguais a 0 e 1 respectivamente.
Anota aí ✏️: O stop não é incluído na sequência, portanto caso queira uma sequência de 1 até 10 a chamada deverá ser range(1, 11)
Seus valores são criados à medida que esta sequência é percorrida.
Sintaxe:

# vamos converter o range em uma lista para ajudar na visualização

# definimos somente o valor de parada
list(range(5))  # saída: [0, 1, 2, 3, 4]

# definimos o valor inicial e o de parada
list(range(1, 6))  # saída: [1, 2, 3, 4, 5]

# definimos valor inicial, de parada e modificamos o passo para 2
list(range(1, 11, 2))  # saída: [1, 3, 5 ,7 , 9]

# podemos utilizar valores negativos para as entradas também
list(range(10, 0, -1))  # saída: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
Além dos tipos básicos, temos outros como datas, tuplas nomeadas, arrays, enumerações e outros, mas estes tem de ser importados de seus respectivos módulos.
Vamos seguir praticando com mais dois exercícios:
Exercício 10: Após uma consulta do banco de dados, temos linhas que contém nome, sobrenome e idade como: "Thiago", "Nobre", 29. Que estrutura vista anteriormente seria recomendada dado que após esta consulta somente exibimos estes valores?
Exercício 11: Realizar a contagem de quantas vezes cada elemento aparece em uma sequência é uma técnica muito útil na solução de alguns problemas. Qual é a estrutura mais recomendada para o armazenamento desta contagem?

