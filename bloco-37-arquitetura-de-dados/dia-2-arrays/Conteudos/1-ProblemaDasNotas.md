## O problema das notas

Em uma escola, o sistema precisa armazenar todas as notas das provas, de cada estudante, de uma turma para uma determinada matéria. Quando selecionado um estudante, o sistema deve calcular a soma das notas para verificar se o/a estudante foi aprovado ou não. Este estudante possui quatro notas referentes à provas e trabalhos e caso não seja aprovado, tem direito a uma prova de recuperação.

Normalmente quando confrontados com este tipo de problema, já pensamos logo em escrever uma lista com estes valores. Mas por que não um conjunto (set) ou talvez um dicionário (dict)? Estes dados têm de ser armazenados de forma ordenada? Como será feito o seu acesso?

Poderíamos resolver este problema criando variáveis de tipos primitivos, como uma série de variáveis contendo as notas, mas não parece ser uma boa escolha. O que faremos se não soubermos o tamanho da turma? Não dá para mudar o código para escrever novas variáveis para cada estudante que entrar.

```
estudante1_matematica_prova1 = 10
estudante1_matematica_prova2 = 8
estudante1_matematica_prova3 = 9
estudante2_matematica_prova1 = 9
estudante2_matematica_prova2 = 6
estudante2_matematica_prova3 = 10
```

> 💡 Em python não existem tipos primitivos, tudo é objeto. Por exemplo, experimente em um terminal interativo (5).bit_length(). Viu que conseguimos chamar um método até mesmo de um número? Podemos fazer isso, pois, assim como todo objeto, um número possui atributo e comportamento.

Precisamos de uma forma dinâmica para armazenar de forma organizada dados, como as notas por exemplo. Vamos tentar usar uma lista:

```
turma_A_matematica = [
    ["Estudante1", 10, 8, 9],
    ["Estudante2", 9, 6, 10],
    # ...
]
```

Neste caso, a Estrutura De Dados utilizada é a lista, e ela armazena dados do tipo "int" e dados do tipo "string". Note que a lista é uma estrutura de dados, mas também é um dado do tipo "list". Nesse exemplo, temos uma lista de listas. (Vamos ver isso mais a fundo! Esta prática é o que chamamos de listas multi-dimensionais)

Estruturas de dados (ED) são implementações de ideias de como organizar os dados. Existem muitas formas de organizar dados, e cada uma tem diferentes métodos de acesso e inserção, que podem levar mais ou menos tempo, e ocupam uma quantidade de memória diferente. Estas particularidades determinam qual estrutura devemos utilizar para resolver cada problema.

A Estrutura de Dados pode ser implementada de várias maneiras e sua implementação pode variar de linguagem para linguagem. Para mantermos um padrão do que deve ser esperado do comportamento de cada ED quando implementada em linguagens diferentes, temos uma forma abstrata de definir estes comportamentos; o Tipo Abstrato de Dado. Lembra de classes abstratas e interfaces? É tipo isso!

Esta definição de TAD, lembra muito a definição de classes abstratas e interface da orientação a objetos e não é coincidência. Historicamente esta metodologia de abstração foi incorporada à própria linguagem de programação para um protótipo do que hoje conhecemos como orientação a objetos.

Tipos Abstratos de Dados (TAD) é um documento que serve para definir estruturas de dados com base em como são usadas e os comportamentos que fornecem. Eles não especificam como a estrutura de dados deve ser implementada, mas simplesmente fornecem uma interface mínima esperada e um conjunto de comportamentos. Pense assim, para você poder chamar um objeto de "carro", ele deve ter pelo menos as seguintes características:

Quatro rodas

Volante, acelerador, freio

Ser movido a motor

Espaço para pelo menos 1 motorista, e talvez passageiros

Da mesma forma, um TAD define o que uma implementação precisa ter para que possa ser chamada de Array, Tree, Set, etc.

Por isso, quando estivermos estudando as estruturas de dados, vamos estudar sua definição, seu TAD; assim entenderemos como elas funcionam em todas as linguagens, mesmo que usemos de exemplo a sua implementação em Python. Poderemos usar um array em python, javascript, ou qualquer outra linguagem, quase da mesma forma.

Vamos fazer uma pausinha para reforçar os conceitos vistos até agora, através de exercícios.

### Exercício de Fixação

1 Tipos abstratos de dados possuem uma única implementação bem documentada?

2 Listas(list), dicionários(dict) e conjuntos(set), que já vêm no Python, são considerados tipos de dados? Caso negativo, justifique sua resposta.

Voltando ao nosso problema de notas, precisamos de uma estrutura onde os elementos (dados) sejam de fácil acesso, facilmente percorrível e que mantenha as notas ordenadas.

Acho que array pode ser uma boa escolha, mas por quê?
