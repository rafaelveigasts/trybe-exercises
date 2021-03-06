## Pensando testes para outros contextos

**Como e qual teste preciso fazer?** Pode não parecer em um primeiro momento, mas como dito anteriormente, testar sistemas complexos fica muito mais simples se pensarmos nos **contratos** que as situações exigem.

Uma outra forma de medir o nível entre **escopo e interação** na idealização de um teste, é buscar uma especificidade para que possamos transforma-lo em requisito. Nesse sentido, considere a seguinte pergunta:

  Se precisasse fazer o teste manualmente, qual seria o meu processo/ "teste de mesa" https://pt.stackoverflow.com/questions/220474/o-que-%C3%A9-um-teste-de-mesa-como-aplic%C3%A1-lo ?

Antes de continuar , experimente fazer esse exercício individualmente, pensando o uso do JWT em uma API, em um contrato onde caso se tenha um login válido, deva ser possível trazer dados de posts (com status 200 - OK ).

Dependendo da resposta, podemos identificar os tipos de teste que precisaremos fazer:

## Exemplo de resposta nesse cenário

Utilizaria o postman , onde:

  Faria um login válido na rota POST /api/login pra conseguir um token ;

  Aguardaria um status 200 - OK , acompanhado de um JSON com o token ;

  Testaria a rota GET /api/posts , passando esse token no header : authorization ;

  Aguardaria um status 200 - OK , acompanhado de um JSON com os posts .

Agora vamos identificar aquilo que poderia ser um teste unitário e aquilo que caracteriza um teste de integração :

**Analisando linha a linha**

1 - Utilizaria o postman , onde:
Aqui já notamos que o teste requer uma estrutura que depende de um servidor rodando.
Esse teste, por tanto, leva em consideração a integração de outros elementos, como a definição de um server, rotas e controllers ;

2 - Faria um login válido na rota POST /api/login pra conseguir um token *

[*] Se estivéssemos testando isoladamente um model que, ao receber os parâmetros de email e password, pode se comportar de uma forma ou outra, esse poderia ser um teste unitário ;

[**] Se estivéssemos testando isoladamente o service que gera nosso token , ou seja, se estamos testando a capacidade de trabalhar com uma função (ou middleware ) que utiliza internamente o método .sign() do jwt (que por sua vez, não precisa de um teste unitário por ser uma biblioteca já testada), para encriptar dados aleatórios ou 'mocks', esse poderia ser um teste unitário .

Se estamos no entanto, esperando que com base em um conjunto de dados válidos, recebamos uma informação específica (através do consumo de uma api), esse é, muito provavelmente, um teste de integração . Isso, porque esse teste precisa que vários componentes da sua api estejam funcionando corretamente: server , controller , service e model .

3 - Aguardaria um status 200 - OK , acompanhado de um JSON com o token ;

Se estivermos testando isoladamente um controller , podemos assumir que esse trará um resultado ou outro, o que poderia ser um teste unitário .

Aqui, porém, esse comportamento pressupõe uma ação anterior, ou seja, ele é disparado uma vez que a pessoa usuária aciona o login. Sendo parte de um teste de integração , pois pressupõe a etapa anterior e suas dependências.

4 - Testaria a rota GET /api/posts , passando esse token no header : authorization ;

Como no item nº2, poderíamos separar testes individuais para cada competência nessa pipeline do express, ou seja, poderíamos ter testes unitários para, por exemplo:

Middleware: auth , que validaria o token (e talvez um mock do modelo User );

Controller: getPosts , onde no nosso caso, acessaríamos um mock do modelo Posts;

E Services, caso você trate de regras de negócio mais elaboradas

Pensando o todo, esse teste depende dos demais, pois depende do token para funcionar corretamente. Aqui novamente, sendo parte de um teste de integração .

5 - Aguardaria um status 200 - OK , acompanhado de um JSON com os posts .

Caso aqui não estejamos testando apenas um controller , então esse passo só faria sentido como uma asserção/afirmação ao final de um teste de integração .