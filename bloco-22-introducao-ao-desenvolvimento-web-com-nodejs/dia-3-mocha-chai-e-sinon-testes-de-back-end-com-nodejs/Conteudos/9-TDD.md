## TDD - Transformando requisitos em testes

Agora que já vimos como utilizar ferramentas para nos ajudar na escrita de testes, vamos novamente refletir sobre o que fizemos até aqui.

No exemplo acima, começamos pela implementação do código, depois escrevemos os testes para validá-lo e, então, descobrimos que havia um cenário que não estava funcionando como esperado e que precisava de ajustes.

Perceba que tivemos uma espécie de "retrabalho" com a implementação, pois primeiro escrevemos uma primeira versão do código para depois identificar o erro e então corrigí-lo.

E se formos pelo caminho contrário? Se antes de tentarmos implementar o código já começarmos traduzindo as especificações em testes e então já desenvolver pensando neles?

Pensando dessa forma que surgiu o conceito de TDD (Test Driven Development), em tradução livre, Desenvolvimento Orientado a Testes . Esse metodologia é bastante difundida e pode trazer muitos benefícios para o desenvolvimento.

A prática do TDD em começar a escrever os testes que traduzem e validam os comportamentos esperados para aquele código antes de começar a implementação.

A ideia principal é começarmos escrever o código já pensando no que está sendo testado, ou seja, já teremos em mente quais os cenários que precisamos cobrir e também como nosso código precisa estar estruturado para que possamos testá-lo, já que códigos menos estruturados normalmente são mais difíceis de serem testados.

Dessa forma, pensando em passos para o TDD, podemos pensar da seguinte maneira:

- Antes de qualquer coisa, precisamos interpretar os requisitos, pensando nos comportamentos que iremos implementar e a na estrutura do código: se será uma função, um módulo, quais os inputs, os outputs, etc..

- Tendo isso em mente, começamos a escrever os testes, ou seja, criamos a estrutura de describes e its que vimos.

- Depois, escrevemos as asserções. Perceba que antes mesmo de ter qualquer código, já iremos criar chamadas a esse código, o que significa que nossos testes irão falhar. Não se preocupe, pois essa é exatamente a ideia nesse momento.

- Agora que já temos os testes criados, vamos a implementação do nosso código. A ideia é escrever os códigos pensando nos testes e, conforme vamos cobrindo os cenários, nossos testes que antes quebravam começam a passar.

Se precisar fazer algum ajuste nos testes em algum momento, não se preocupe! Isso é perfeitamente normal, visto que estamos escrevendo testes para código que ainda não existe, e um detalhe ou outro pode escapulir à mente.
