## Filas

Assim como temos a mentalidade First In, Last Out para problemas que são pilhas, precisamos de outra mentalidade para problemas que são filas: First In, First Out (FIFO). Quem chega primeiro recebe atendimento primeiro, nada mais justo. Assim, todos serão atendidos com uma demora mais parecida.

Na computação também temos problemas que requerem a mentalidade FIFO. Por exemplo, já parou para pensar como é que um processador com um único núcleo consegue rodar um sistema operacional inteiro, e mais 17 programas ao mesmo tempo? Cada programa demanda uma série de operações, e um núcleo só pode executar uma de cada vez; ele coloca as operações em uma fila, e resolve estas operações uma por uma, garantindo assim que todos os programas consigam rodar e prosseguir em suas tarefas.

Assim como a pilha, o TAD Fila (queue, em inglês) também pode ser implementada tanto em um array como em uma lista; o importante não é a forma que ela é implementada em código, mas sim a forma que ela se comporta; que métodos ela expõe. No caso da fila, as operações devem ser as seguintes:

<li>Push: Adiciona um elemento no final da fila
<li>Pop: Remove e retorna o primeiro elemento da fila
<li>Peek: Retorna o primeiro elemento da fila
<li>IsEmpty: Retorna True se a fila estiver vazia
<li>IsFull: Retorna True se a fila estiver cheia
<li>Size: Retorna o número de elementos na fila
<li>Clear: Remove todos os elementos da fila
<li>Copy: Retorna uma cópia da fila

Notou como a única diferença da fila é que a remoção (Pop) ocorre no começo, em vez de no final? Apenas essa diferença causa um funcionamento totalmente diferente, que soluciona problemas diferentes! Fica para você o desafio de implementar a operação Pop() da fila, que é o que a diferencia da Pilha.
