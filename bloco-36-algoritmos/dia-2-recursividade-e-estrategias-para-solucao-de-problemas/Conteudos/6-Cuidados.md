## Principais cuidados ao usar recursão

Como visto, chamadas de funções ocupam memória já que, toda vez que uma chamada é feita, o SO reserva memória para as variáveis e parâmetros.

Quando um loop recursivo é muito grande, ele fará muitas chamadas, e quando ele faz muitas chamadas podemos ter um stack overflow (que não é apenas o fórum de ajuda para devs 😂). O stack overflow, ou estouro de pilha em português, significa que ficaríamos sem memória para continuar com a execução do programa.

Para evitar um estouro de pilha, é importante que as chamadas recursivas parem. Para que consigamos fazer as chamadas recursivas pararem é importante lembrarmos sempre de implementar a condição de parada na função.

Apesar de funções recursivas serem mais harmoniosas e fáceis de implementar, elas costumam ser menos eficientes que do que as iterativas, por causa do overhead de empilhar e desempilhar chamadas de funções.
De olho na dica👀: Não é tão simples decidir quando usar uma solução recursiva para um problema, mas você vai perceber que alguns problemas são muito mais fáceis e intuitivos de serem resolvidos recursivamente. É nesses casos que a recursão vale a pena.
