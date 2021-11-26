## Dockerfile - Comandos básicos ##

Aprendemos até aqui, que para criarmos containers precisamos de uma imagem, que é uma base para a criação da nossa aplicação!

Então, para criarmos containers para nossas aplicações, precisamos iniciar criando a imagem deles! E temos a alternativa de fazê-los a partir dos arquivos Dockerfile *.
* Não será abordado aqui, mas também podemos "commitar" (como no git ) alterações que fazemos em nossos containers, salvando eles em novas imagens.
Para isso podemos usar o comando docker commit https://pt.wikipedia.org/wiki/PHP , que serve literalmente para pegarmos as alterações (que são etapas adicionais) que fizemos no nosso container e salvar elas em uma imagem (nova ou já existente).
O Dockerfile nada mais é do que um arquivo de configuração usado pelo Docker com a descrição passo a passo do que você deseja que aconteça.
A seguir, aprenderemos como utilizar os principais comandos do Dockerfile , permitindo assim que tenhamos todos os recursos necessários para que nossos apps funcionem corretamente dentro de containers .
⚠️ Atenção, essa seção do conteúdo possui exemplos com comandos de linguagens de programação que talvez você não conheça ainda. Não se preocupe! É importante ter em mente que são exemplos meramente didáticos, com a finalidade de explicar os comandos do Dockerfile .


## Criando e rodando uma aplicação React com Dockerfile ##

Para deixar as coisas mais interessantes, vamos dockerizar uma aplicação React . Não faremos incrementos na aplicação porque nosso intuito aqui é focar no processo de dockerização dela.
Para dar contexto, vamos utilizar aqui um pequeno template em Node.js , mas você não precisa se preocupar em compreender profundamente isso agora*.

* Veremos no futuro, mas o Node.js é um software que possui a implementação do motor V8 do Google (O mesmo que usamos para codar javascript no navegador Chrome ) para utilização avançada em 
ambientes desktop.

A primeira coisa que você deverá fazer é criar um React App, aqui chamaremos de react-dockerized acessando ele posteriormente:

  npx create-react-app react-dockerized
cd react-dockerized

Em seguida. crie um arquivo Dockerfile na raiz dessa pasta:
  touch Dockerfile

A ideia do arquivo Dockerfile é que ele é autossuficiente, ou seja, é possível criar e executar uma aplicação toda só por comandos dentro dele.

Mas hoje, vamos utilizar um pequeno exemplo externo, simulando um cenário que será bastante comum para vocês, que é o cenário de desenvolvimento local (em que você terá os arquivos de projeto dentro de uma pasta no seu computador, onde estará também seu Dockerfile ) ;
Com isso, agora vamos começar a editar nosso Dockerfile !


## FROM ##

Ao criarmos uma nova imagem, sempre devemos baseá-la em uma outra, para isso utilizamos o FROM . Por exemplo, para criar uma nova imagem que rodará sob um ubuntu :
  FROM ubuntu:latest

A partir do FROM , é possível usar qualquer comando em qualquer ordem, porém, dependendo do funcionamento do seu aplicativo, etapas bem posicionadas podem otimizar o processo de build (que é a construção da imagem) , rebuild (reconstrução da imagem) ou mesmo na distribuição. Isso porque quanto menos etapas para aplicação rodar, menos camadas a imagem vai gerar, diminuindo seu peso.
Isso é importante, principalmente quando estamos trabalhando em uma imagem que recebe atualizações regulares.

É recomendado utilizar sempre uma versão específica de nossa imagem base em nossas imagens de produção, por exemplo ubuntu:8 ao invés de ubuntu:latest , isso garante que estaremos utilizando sempre a mesma imagem base quando buildarmos nossa imagem, evitando quebras de compatibilidades caso a imagem "latest" seja atualizada para a versão 9 , por exemplo.

Outra recomendação é, sempre que possível, utilizar as versões "mínimas" da imagem. Por exemplo, imagens com tag slim ou alpine , que são muito mais leves, pois utilizam versões minimalistas do SO (como é o caso do Alpine) e que possuem menos dependências e ferramentas instaladas.

Consequentemente, pode ser necessário a instalação de alguma ferramenta específica (que normalmente já viria instalada no SO) para que nossa aplicação funcione corretamente, porém, isso pode ser feito de maneira simples em nosso Dockerfile . Essa prática vale a pena pelos benefícios de se ter uma imagem muito mais leve, que pode ser 10 vezes menor.

As especificações de imagens podem ser consultadas diretamente em Docker Hub.

No Dockerfile do nosso mini-projeto, vamos basear nossa imagem no node:14-alpine (Node.js versão 14 que roda a partir da distro Alpine) e dar o alias "build" para ela :
  FROM node:14-alpine AS build


## WORKDIR ##

Com o comando WORKDIR , podemos definir um "diretório de trabalho", que será utilizado como base para a execução dos comandos. Sua estrutura é a seguinte:

  WORKDIR /diretorio/que/sera/utilizado

Na nossa aplicação, vamos definir o diretório /app como nosso WORKDIR no Dockerfile :

  ...
  WORKDIR /app # Definimos o workdir


## COPY ##

Vimos que conseguimos preparar nossa imagem para executar por exemplo, uma aplicação dentro do container, porém, precisamos do código fonte para rodá-lo.
Para isso utilizamos o COPY (Copiar em português) , com ele conseguimos copiar diretórios e arquivos para dentro da nossa imagem:

  COPY ["<ARQUIVO_1>","<ARQUIVO_2>",...,"<ARQUIVO_X>", "<PASTA-DESTINO>"]

Imagine que estamos em um diretório que possui uma pasta app com o código fonte de uma aplicação, para copiá-la para dentro da imagem e conseguirmos executá-la, basta aplicar:

  COPY ["./app", "/usr/src/app"]

Com o comando COPY conseguimos montar nossa estrutura do código fonte dentro da imagem, porém, para executá-la precisaríamos apontar para o diretório que definimos anteriormente como nosso diretório de trabalho ( WORKDIR ).

Vale ressaltar que no COPY tanto a sintaxe na forma exec ( COPY ["arquivo1", "arquivo2", "./destino"] ) como na shell ( COPY arquivo1 arquivo2 ./destino ) são aceitas*.
* O modo shell é como se você rodasse o comando em um terminal.

No Dockerfile do nosso mini-projeto, vamos copiar todos os arquivos que começam com "package" ( package.json e package-lock.json ), para nosso diretório atual, a pasta /app , usando a forma exec :
  # FROM node:14-alpine AS build
  # WORKDIR /app  
  COPY package*.json ./

