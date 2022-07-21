## Começando uma solução

Este problema pode não ser tão simples de resolver quanto ele é de ser explicado. Basta fazer a contagem de parênteses abrindo, e comparar com a quantidade de parênteses fechando, e fazer o mesmo com as chaves?

Não! Pois a ordem em que eles abrem e fecham também importa, como podemos ver no exemplo errado ({)}. Aqui, a chave abre dentro do parêntese e fecha fora dele, o que não faz sentido. Precisamos fazer uma estrutura que faz essa contagem mas também entende a posição em que estes elementos existem.

Imagine que estamos analizando a string nesse caractere específico: " ... { ... "

Ao ver este caractere, temos 100% de certeza que para a string ser válida, deve existir um "}" em algum lugar na frente; porém, o caractere imediatamente à frente pode ser tanto o } quanto também { ou (, e podemos ter quantos outros quisermos antes de fechar aquela chave do início; porém, quando acabarmos devemos fechá-la.

Para tudo! Para resolver este problema, vamos aprender o Tipo Abstrato de Dados(TAD) de hoje: Pilha, que por acaso é exatamente o que precisamos aqui! Não por acaso, este tipo de problema foi o que levou à invenção da Pilha!

Siga adiante, e vamos nos aprofundar nos conceitos!
