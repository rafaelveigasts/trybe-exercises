## O que são Padrões de Projeto

Um padrão de projeto é uma forma já pensada e organizada para solucionar determinados desafios no desenvolvimento. Desde a década de 70, cientistas da computação perceberam que, ainda que em contextos diferentes, algumas soluções de problemas se repetiam em vários softwares. Visando facilitar a reutilização do desenho da solução e a comunicação, assim como melhorar a documentação e compreensão de um sistema, essa comunidade de cientistas começou a catalogar estes padrões.

Antes de prosseguir, reflita sobre a seguinte questão:

Quantas aplicações no mundo precisam iterar sobre uma coleção de elementos?

Certamente milhares, correto? Eventualmente foi proposta e adotada uma forma padronizada de implementar a solução para este problema. Esse padrão é conhecido como Iterator. Ao receber uma coleção de entidades, uma classe que implementa o padrão de projeto Iterator deve ter uma interface específica — por exemplo, uma função next que retorna o próximo elemento da dita coleção.

Não interessa se a sua coleção está em formato de array, de árvore, se é uma lista de inteiros, objetos ou o que for. Ao garantir que sua classe possui um iterador, você garante que ela tem uma função next que vai acessar o próximo elemento da sua coleção. Ao seguir o padrão de projeto, você organiza o seu código e o seu raciocínio de uma forma pensada, estudada e comprovadamente eficaz.

<img src='lista-padroes-de-projeto.png'/>

O iterator representa o exemplo mais básico a respeito dos padrões de projeto, mas ilustra bem o seu propósito:
organizar seu código e raciocínio de forma boa, eficaz, comprovada e universalmente aceita.

Quando falamos de padrões de projeto, é impossível não falar sobre o livro da 'gangue dos quatro'https://en.wikipedia.org/wiki/Design_Patterns . Hoje em dia, porém, muitos outros padrões estão documentados em diversas outras literaturas. É importante conhecer diferentes padrões, bem como onde cada um deles se aplica, ainda que seja comum que as equipes de desenvolvimento criem seus próprios padrões.
