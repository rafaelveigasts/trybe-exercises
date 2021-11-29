## O que vamos aprender? ##

Dando continuidade ao nosso bloco sobre Docker , aprenderemos como gerenciar todo nosso ambiente de containers utilizando a ferramenta Docker Compose . Além disso, aprenderemos como e por que utilizar volumes e conheceremos o recurso de networks no Docker .

## Você será capaz de ##

Gerenciar redes Docker , utilizando-as para a comunicação e isolamento de containers ;
Persistir dados dos containers utilizando volumes ;
Criar arquivos Compose para gerenciar todo seu ambiente com Docker ;
Gerenciar Services , Network e Volumes a partir do Compose .

## Por que isso é importante? ##

Já vimos anteriormente o que são imagens, containers e como usar o Dockerfile para passar todas as instruções para montar nosso sistema convidado.
Hoje, aprenderemos sobre o Docker Compose , arquivo pelo qual conseguimos configurar todo um ambiente de containers de maneira muito mais simples.
Em um ecossistema de aplicações com várias linguagens de programação e tecnologias distintas rodando em seus respectivos containers , o Docker Compose entra como uma solução que consegue organizar o funcionamento e a configuração de todas essas partes que compõem um sistema.

<img src="giphy .gif" />


Usando o Compose , definimos em um arquivo de configuração YAML todos os detalhes para executar nosso ambiente de desenvolvimento local, aproveitando todas as vantagens do Docker , sem se preocupar em subir cada um dos containers que envolvem um app com seus parâmetros específicos no run .

Muitas vezes, ele é comparado a uma receita, pois indica tanto os componentes ques serão utilizados quanto em que ordem cada comando deve ser executado.
Além disso, nossos ambientes geralmente possuem vários serviços que precisam se comunicar entre si, por exemplo, um back-end com um front-end ou um serviço com um banco de dados. Nesse contexto, saber como trabalhar com networks pode ser muito vantajoso por nos permitir lidar com essa comunicação entre containers mais facilmente.

Outros recursos importantes que também precisamos entender são os Volumes . Eles são componentes do Docker responsáveis por prover a preservação de informações. Isso é muito útil, pois é comum precisarmos de soluções para que de dados ou arquivos, como banco de dados, persistam.

Esses componentes mais o Compose irão nos permitir criar todo nosso ambiente de maneira simples, utilizando todos os recursos e vantagens do Docker . Isso garantirá que mesmo que nosso ambiente tenha diversos serviços como APIs, front-ends, banco de dados, entre outros, conseguiremos integrá-los, permitindo que tudo isso rode em qualquer ambiente com Docker e sua publicação seja feita de forma descomplicada e eficiente.
