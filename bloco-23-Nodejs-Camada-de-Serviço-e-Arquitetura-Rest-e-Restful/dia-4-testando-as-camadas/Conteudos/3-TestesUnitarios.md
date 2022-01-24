## Testes Unitários (Unit Tests)

Conforme definido por Martin Fowler , importante nome na arquitetura de software, testes unitários são de baixo nível, com foco em pequenas partes do software e tendem a ser mais rapidamente executados quando comparados com outros testes, pois testam partes isoladas.

O conceito de unidade porém, pode variar de projeto, linguagem, time ou arquitetura. Linguagens orientadas a objetos tendem a ter classes como uma unidade, já linguagens procedurais ou funcionais consideram normalmente funções como sendo uma unidade.

Dessa forma, esse conceito é algo muito relativo e depende muito do contexto e do objetivo em questão. O que podemos ter nítido é que uma unidade é uma parte que pode ter seu comportamento isolado de suas dependências.

Lembrando da aula anterior sobre MSC e sobre o padrão em sí, podemos dizer que cada função da camada de Model , por exemplo, é uma unidade. Dessa forma, conseguimos isolar essa função e testar seu comportamento de maneira unitária.

Vamos colocar a mão na massa e aplicar os conceitos que vimos até aqui. Dessa forma criaremos testes unitários para cada camada da arquitetura MSC, entendendo os objetivos de cada um desses testes e os pontos de atenção que deveremos ter.
