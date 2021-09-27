O que vamos aprender?

Testes automatizados são parte fundamental de qualquer software de qualidade, e com React não é diferente. Sendo React uma biblioteca recente, a melhor forma de se escrever testes automatizados para ele não é um assunto dado como encerrado, ainda que o runner mais usado e recomendado seja o Jest. A biblioteca de testes para React com maior adoção é a enzyme , desenvolvida pela Airbnb. A biblioteca recomendada pela documentação , por outro lado, é a react-testing-library , desenvolvida por Kent C. Dodds. Por razões que ficarão claras ao longo do dia de hoje, nós aprenderemos a usar a react-testing-library , mas desde já mantenha a enzyme no seu radar, pois você pode trombar com ela no futuro!
Assim sendo, hoje você vai aprender a escrever testes automatizados em React ! Vai aprender a usar as ferramentas que a react-testing-library oferece para testar componentes e comportamentos inteiros, simulando a ocorrência de eventos e lidando com lógica assíncrona.
Tudo isso, naturalmente, virá acompanhado de uma discussão acerca do que são boas práticas de teste e quais são os tradeoffs de diferentes abordagens de teste.
Bora?!

Você será capaz de:

Utilizar os seletores (queries) da React-Testing-Library em testes automatizados;
Simular eventos com a React-Testing-Library em testes automatizados;
Testar fluxos lógicos assíncronos com a React-Testing-Library;
Escrever testes que permitam a refatoração da estrutura dos componentes da aplicação sem necessidade de serem alterados.

Por que isso é importante?

A vantagem de testes automatizados é evidente. Em React não é diferente, então é muito importante ser capaz de escrever bons testes automatizados para ele. A biblioteca react-testing-library tem as seguintes vantagens quando comparada com a enzyme , a opção de maior adoção no mercado:

É muito mais simples de usar;
Tem muitos menos caveats , ou seja, situações que podem causar probleminhas e dores de cabeça inesperadas;
Reforça o bom uso das melhores práticas de testes ao incentivar e facilitar o teste de comportamentos e não de implementação ;
Permitir a refatoração da sua arquitetura de componentes - com Enzyme qualquer mudança nela quebra parte dos testes.

Conteúdos

Antes de mais nada, vamos ler um artigo provocativo. O convite é não pensar nos testes em termos de quais funções testar , mas em termos de quais casos de uso testar.

E o que são casos de uso , você pergunta? Citando o dicionário de Oxford (tradução livre):

Uma situação específica em que um produto ou serviço pode, potencialmente, ser usado.
Pense nos projetos anteriores do curso. Por exemplo:
No e-commerce, uma pessoa pode filtrar por uma categoria, adicionar um produto ao carrinho e finalizar a compra. Isso é um caso de uso;
A pessoa pode, por outro lado, não filtrar por categoria alguma, adicionar vários produtos ao carrinho de uma vez e não finalizar a compra. Isso é outro caso de uso.
Numa todo list, adicionar uma tarefa nova é um caso de uso.
Deletar uma tarefa é um caso de uso.
Marcar uma tarefa é um caso de uso.
Desmarcar uma tarefa é um caso de uso.

Está ficando mais evidente? Vamos entender se há ferramentas que podem nos auxiliar.

Cobertura de Código e Cobertura com Testes Automatizados
O principal objetivo da Cobertura de Código ( code coverage ) ou Cobertura de Testes , é evidenciar quais linhas do código foram testadas e quais não estão sendo exploradas nos testes. É importante salientar que um projeto com cobertura de código alta não significa necessariamente que os testes não podem melhorar: cobertura alta é somente o primeiro passo!
Existem diversos softwares que checam para nós a cobertura de código. Em linhas gerais, os resultados podem evidenciar:

a proporção de linhas do seu código que são executadas;
se há linhas que “nunca” serão executadas - problemas com if else , por exemplo;
a quantidade de funções externas que são chamadas;
blocos de código repetitivos e/ou códigos inalcançáveis.
Se o resultado nos mostra que há uma cobertura alta, podemos dizer que o código foi bastante testado e tem uma chance menor de conter erros, mas não diz nada sobre a qualidade do código, o que só pode ser medido pela Cobertura dos Casos de Uso .

Casos de uso x Cobertura de código

Casos de uso são possibilidades de usos do sistema. Exemplo: quais passos a pessoa usuária precisa seguir para fazer um login no sistema e o que é esperado ao final do login tanto no sucesso quanto na falha? E se a pessoa não digitar o user? Ou a senha? E se a senha estiver incorreta? Cada uma dessas situações é um caso de uso diferente . Mais importante do que garantir a cobertura do código, algo que já é crucial, é garantir que seus testes abordam todos os casos de uso da sua aplicacão. Para isto é preciso criar testes automatizados que simulam uma pessoa acessando a página fazendo uma sequência de ações que resulta naquele caso de uso.

A seguir, vamos conhecer a react-testing-library , ferramenta de testes automatizados recomendada pela documentação do React. Nela, faremos testes sempre pensando em casos de uso !