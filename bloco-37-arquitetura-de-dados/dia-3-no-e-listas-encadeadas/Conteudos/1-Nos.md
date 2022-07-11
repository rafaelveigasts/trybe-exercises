## Nó

O Nó (Node) é um TAD responsável por conter pelo menos duas coisas:

> Um valor (qualquer tipo)

> Um ponteiro (para o espaço de memória de outro Nó)

Para simplificar: imagine que uma variável é uma gaveta, onde cabe um valor de um determinado tipo. O Nó, é como uma gaveta com duas partes: em uma delas cabe um valor, e na outra cabe a localização de outra gaveta.

Esta segunda parte da gaveta que o Nó possui é chamada de ponteiro, pois ele aponta para outro elemento (outro nó). Este ponteiro aponta para o endereço de memória onde o próximo Nó se encontra. Mais especificamente, nesta parte da gaveta há o byte exato onde o próximo nó está alocado na memória RAM. Note que este segundo nó também terá um ponteiro de outro Nó, e assim sucessivamente, quantas vezes quisermos, até que o último Nó tenha um ponteiro nulo (null), que não aponta para nada.

Sozinho, um nó não parece ter muito valor, porém quando encadeamos ou ligamos vários nós em sequência, eles se tornam.... uma lista encadeada!
