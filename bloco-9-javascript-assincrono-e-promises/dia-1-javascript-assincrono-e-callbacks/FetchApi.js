/*
Fetch API

No contexto do Front-end, a maioria dos casos em que precisamos utilizar funções assíncronas são em requisições. Um bom exemplo é a função fetch() da Fetch API !

A Fetch API contém uma série de recursos desenvolvidos para lidar com requisições http no JavaScript. A função primária é a fetch() , utilizada para fazer chamadas às URL's das APIs . Trata-se de uma função assíncrona, baseada em uma promise.

Uma API, por sua vez, é uma forma de trafegar dados entre aplicações. Por exemplo: existe uma API que todos os dias possui uma piada diferente. A URL da API é https://api.jokes.one . Portanto, se quisermos ter acesso a essa piada, precisamos fazer uma requisição para a URL da API, solicitando os dados. A API, por sua vez, vai analisar a requisição e responder os dados pedidos. Note que há um tempo entre a requisição ser enviada e a resposta ser devolvida. Por isso, precisamos que a requisição seja assíncrona.

A função fetch recebe dois parâmetros:

1 - URL do serviço alvo da requisição;
2 - Um objeto contendo algumas informações sobre requisição de API. Esse objeto contém chaves com informações específicas para aquela chamada. Essas especificações estão sempre presentes na documentação de uso daquela API específica. Não se preocupe muito em como obter essas informações por agora ; nesse início, daremos essas informações para que vocês se acostumem a usar o .fetch() .

O retorno da chamada varia conforme a API utilizada, não só em conteúdo, mas também formato. Como nosso maior foco é JavaScript, lidaremos principalmente com respostas em formato JSON, ou respostas que possam ser reformatadas para tal.

O nome JSON pode soar infamiliar para você até o momento, mas na aula de amanhã terá uma seção dedicada inteiramente para o assunto de API, JSON e fetch .

JSON significa "JavaScript Object Notation". Ele é um padrão utilizado para troca e armazenamento de dados. Apesar do nome, ele não é um objeto JavaScript, apenas é estruturado de forma que faz uso de chaves e valores. Por não ser um objeto nativo do JavaScript, precisamos traduzir ele para que fique a par da linguagem que estamos usando, para isso existe a função JSON.parse() , assim como existe a função JSON.stringify() para transformar alguma estrutura do JavaScript em string. Um uso muito comum para o JSON é o consumo de serviços web e exibição das informações recebidas.

Vamos ver um breve exemplo a respeito disso. Para simplificar, no nosso arquivo script.js , vamos forçar por meio das crases para que nosso JSON inicie-se como do tipo string.
No seu arquivo index.html , adicione o seguinte código:

Nesse script, utilizamos o JSON.parse() (linha 24) para analisar nosso json (nesse caso, uma string) e converter em um formato compatível com o JavaScript. Assim, temos mais poder sobre as informações e podemos manipular elas para, por exemplo, adicionar elas ao DOM.

Lembre-se que o JSON.parse() analisa uma string JSON, monta o valor final dele e o retorna.
Lembre que até o momento, não é necessário que você saiba utilizar a função fetch . No próximo conteúdo você irá aprofundar no assunto!
*/