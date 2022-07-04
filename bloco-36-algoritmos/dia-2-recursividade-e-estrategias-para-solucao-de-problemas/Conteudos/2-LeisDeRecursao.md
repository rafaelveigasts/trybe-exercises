## Leis da recursão

Podemos perceber que a recursividade é um excelente método para usarmos no dia a dia, entretanto, nada é perfeito! Quando formos escrever um código, temos que ter o cuidado para que não haja um loop infinito.

Exemplo:

A função countdown abaixo tem como objetivo fazer uma contagem regressiva partindo de n até zero.

```
def countdown(n):
print(n)
countdown(n - 1) # chamada recursiva

countdown(5)
```

Observe que dentro da implementação desta solução, a função chama ela mesma.
Você pode estar se perguntando: "O que é isso!? " 🤔
Resposta: Isso é uma chamada recursiva! Lembre-se que a recursão é quando uma função chama ela mesma. Se você executar esse código, ele ficará em loop infinito!

⚠️ Aviso: Caso tenha executado o código anterior, aperte Ctrl+C para parar a execução.
Quando estamos escrevendo uma função recursiva, precisamos informar nossa condição de parada ou caso base da recursão. Nesse sentido, podemos separar uma função recursiva em:

### Caso base e Caso recursivo

O caso recursivo é a chamada da própria função novamente.
Então, como seria a correção desse código para que ele funcione de acordo com esperado?🤔 Observe a resposta abaixo:

```
def countdown(n):
if n == 0: # caso base
print("FIM!")
else:
print(n)
countdown(n - 1) # caso recursivo

countdown(5)
```

Pronto! Agora a função funciona corretamente!
Anota aí 🖊:

Se n é igual a 0, escreva "FIM!"

Se n não for igual a 0, escreva n e chame a função novamente com n - 1

Como vimos acima, não podemos construir um código recursivo sem validar algumas condições. Sendo assim, vamos a três leis importantes:

1. Um algoritmo recursivo deve ter um caso base: quando falamos de recursão, devemos sempre lembrar do caso base, pois sem ele nosso algoritmo ficará executando infinitamente.

O caso base é a condição de parada do algoritmo recursivo, ele é o menor subproblema do problema, tornando-o possível de resolver de forma direta/trivial;

2. Um algoritmo recursivo deve mudar o seu estado e se aproximar do caso base: após o início da execução de um algoritmo recursivo, a cada nova chamada a ele mesmo, o seu estado deve se aproximar progressivamente do caso base.

Vamos imaginar a seguinte situação: queremos criar um código que irá printar números a partir de 0 e terminar em 10. O caso base do algoritmo é 10, pois é onde nossa função recursiva deve parar a execução. A primeira chamada a função terá o número 0 passado de parâmetro. A cada nova chamada à função, nosso estado deve incrementar o valor 1 ao valor do estado anterior, até chegar ao número 10. Logo, o valor do estado na primeira chamada será 0, na segunda chamada será 1, na terceira chamada será 2, e assim por diante até chegar ao valor do caso base;

3. Um algoritmo recursivo deve chamar a si mesmo, recursivamente: Essa lei é a própria definição de recursão.
   Observe o gif abaixo que representa a recursividade muito bem! 🐶 ➿

⚠️ Aviso: Para evitar vertigem, não olhe muito para ele. 🤢

### Entendendo recursividade e colocando em prática

Antes de vermos como acontece a "mágica" da recursividade, vamos ver como costuma ser uma estrutura básica de uma função recursiva:

Nome da função e parâmetro:
Condição de parada

    Chamada de si mesma

Declaramos uma função com um parâmetro.

Dentro da função criada, definimos qual é a condição de parada da função.

A condição de parada faz uma comparação entre o valor da condição com o parâmetro que a função está recebendo. Caso a condição não se satisfaça, a função é chamada novamente com um novo parâmetro. Caso contrário a execução para na condição de parada.

Vamos ver como isso acontece na prática ? Mas antes, você se lembra das suas aulas de matemática em que aprendeu sobre fatorial?

Você sabia que a fatorial é uma função recursiva? Vamos relembrar:

Fatorial de n é o produto dos números positivos consecutivos menores ou iguais a n.

Sua notação é: n!

Sua definição:

0! = 1
n! = n x (n - 1) x (n - 2) ... 2 x 1
Exemplo:
5! = 5 x 4 x 3 x 2 x 1 = 120
Certo! Agora que relembramos fatorial, vamos observar sua estrutura:
Se
5! = 5 x 4 x 3 x 2 x 1
e
4! = 4 x 3 x 2 x 1

Podemos reescrever 5! como 5! = 5 x 4!
Observando esse caso, vemos que a função 5! possui uma chamada de outra função fatorial dentro dela. Logo, temos uma recursão!
Vamos escrever um código para resolvê-lo?

```
def factorial(n):
  if n == 1: # caso base
    return 1
  else:
    return n \* factorial(n - 1) # caso recursivo
```

O código acima funciona da seguinte maneira:

A função se chama recursivamente até chegar no caso base onde n é igual a 1.

Você pode estar se perguntando: " Mas por quê?" 🤔

Resposta: lembra da definição de fatorial? 0! é 1, certo? 1! também será 1. Então o tornaremos como caso base. Quando a função chegar no caso base, ela retornará 1 para a chamada anterior e fará a multiplicação com o n daquele contexto, que nesse caso será o 2. Em outras palavras, quando a chamada retornar da recursão acontecerá return 2 \* 1. Esse valor também será retornado para a função que o chamou e assim acontecerá até que todos os casos sejam satisfeitos.

⚠️Aviso: No nosso próximo tópico, vamos falar à respeito da pilha de chamadas. Nele, entenderemos melhor como isso acontece!
