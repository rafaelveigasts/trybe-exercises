## O que vamos aprender?

Neste bloco iremos aprender a criar estruturas de dados utilizando pilhas (stack, em inglês) e como essa estrutura é organizada. Também iremos aprender como utilizar a pilha, adicionando algumas tarefas para uma classe de pilha.

Vamos aprender como podemos utilizar pilhas para entender o funcionamento da chamada de funções do Python e também para a resolução de expressões matemáticas utilizando a Notação Polonesa Reversa (RPN). Esses pontos são importantes para entender melhor o funcionamento da linguagem Python e também são perguntas comuns em processos seletivos de diversas empresas.

## Você será capaz de

<ul>
<li>Entender o funcionamento da estrutura de dados pilha (stack);

<li>Adicionar, remover, saber a quantidade e limpar itens de uma pilha;
<li>Identificar e escolher o uso de pilhas em diferentes casos.
</ul>

## Por que isso é importante?

Quase todas as linguagens utilizam a estrutura de pilhas para a gerência da execução de aplicações. Durante a execução do programa, quando o interpretador do Python encontra uma chamada a uma função, ele salva o estado da função atual e então a adiciona na pilha de execução (call stack). Quando a função chamada termina a execução, o interpretador volta na pilha e lê a função que esta no topo para continuar a execução da aplicação.

Outro caso importante é para entender como que linguagem Python resolve as expressões matemáticas, respeitando a ordem dos operadores. Ao ler uma expressão, o interpretador do Python monta uma estrutura chamada de pós fixa e com base nessa estrutura ele vai calculando os valores da expressão, respeitando a ordem dos operadores.

Ambos os casos são resolvidos utilizando pilhas. Entender as características, citadas anteriormente, nos ajuda a escrever aplicações melhores.
