## Dockerfile - Comandos básicos ##

Aprendemos até aqui, que para criarmos containers precisamos de uma imagem, que é uma base para a criação da nossa aplicação!

Então, para criarmos containers para nossas aplicações, precisamos iniciar criando a imagem deles! E temos a alternativa de fazê-los a partir dos arquivos Dockerfile *.
* Não será abordado aqui, mas também podemos "commitar" (como no git ) alterações que fazemos em nossos containers, salvando eles em novas imagens.
Para isso podemos usar o comando docker commit https://pt.wikipedia.org/wiki/PHP , que serve literalmente para pegarmos as alterações (que são etapas adicionais) que fizemos no nosso container e salvar elas em uma imagem (nova ou já existente).
O Dockerfile nada mais é do que um arquivo de configuração usado pelo Docker com a descrição passo a passo do que você deseja que aconteça.
A seguir, aprenderemos como utilizar os principais comandos do Dockerfile , permitindo assim que tenhamos todos os recursos necessários para que nossos apps funcionem corretamente dentro de containers .
⚠️ Atenção, essa seção do conteúdo possui exemplos com comandos de linguagens de programação que talvez você não conheça ainda. Não se preocupe! É importante ter em mente que são exemplos meramente didáticos, com a finalidade de explicar os comandos do Dockerfile .


### Criando e rodando uma aplicação React com Dockerfile 

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


### FROM 

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


### WORKDIR 

Com o comando WORKDIR , podemos definir um "diretório de trabalho", que será utilizado como base para a execução dos comandos. Sua estrutura é a seguinte:

  WORKDIR /diretorio/que/sera/utilizado

Na nossa aplicação, vamos definir o diretório /app como nosso WORKDIR no Dockerfile :

  ...
  WORKDIR /app # Definimos o workdir


### COPY 

Vimos que conseguimos preparar nossa imagem para executar por exemplo, uma aplicação dentro do container, porém, precisamos do código fonte para rodá-lo.
Para isso utilizamos o COPY (Copiar em português) , com ele conseguimos copiar diretórios e arquivos para dentro da nossa imagem:

  COPY ["<ARQUIVO_1>","<ARQUIVO_2>",...,"<ARQUIVO_X>", "<PASTA-DESTINO>"]

Imagine que estamos em um diretório que possui uma pasta app com o código fonte de uma aplicação, para copiá-la para dentro da imagem e conseguirmos executá-la, basta aplicar:

  COPY ["./app", "/usr/src/app"]

Com o comando COPY conseguimos montar nossa estrutura do código fonte dentro da imagem, porém, para executá-la precisaríamos apontar para o diretório que definimos anteriormente como nosso diretório de trabalho ( WORKDIR ).

Vale ressaltar que no COPY tanto a sintaxe na forma exec ( COPY ["arquivo1", "arquivo2", "./destino"] ) como na shell ( COPY arquivo1 arquivo2 ./destino ) são aceitas*.
* O modo shell é como se você rodasse o comando em um terminal.

No Dockerfile do nosso mini-projeto, vamos copiar todos os arquivos que começam com "package" ( package.json e package-lock.json ), para nosso diretório atual, a pasta /app , usando a forma exec :
   FROM node:14-alpine AS build
   WORKDIR /app  
  COPY package*.json ./


### RUN 

O RUN (Nesse contexto, rodar, em português - como em rodar um comando ) irá executar uma lista de comandos durante a criação da imagem.

  RUN ["<COMANDO>", "<SUBCOMANDO>", "<PARAMETRO-1>", ... , "<PARAMETRO-N>"]

O RUN é comum para prepararmos a imagem para rodar nossos apps, instalando as dependências de uma aplicação. Note que o RUN também aceita as formas shell e exec , assim como o COPY .

  No Dockerfile do nosso mini-projeto, vamos rodar o comando de instalação da nossa aplicação, passando um parâmetro para suprimir mensagens de aviso e facilitar a visualização do processo, quando ele ocorrer :

 FROM node:14-alpine AS build
 WORKDIR /app
 COPY package*.json ./
RUN npm install
Aqui é importante frisar, que só é possível fazer esse comando de instalação pois a imagem Node , já possui esses aplicativos internamente.


### PASSOS INTERMEDIÁRIOS 

Antes de passar para os próximos comandos, alguns passos intermediários são necessários, como por exemplo, fazer a cópia dos demais arquivos para dentro do container, porém, como já rodamos um npm install , é interessante criarmos um arquivo chamado dockerignore para adicionarmos lá a node_modules, de modo que ela não seja copiada.

touch .dockerignore
node_modules
Agora, no Dockerfile do nosso mini-projeto, podemos definir a cópia de todos os arquivos apenas com o comando:


 FROM node:14-alpine AS build
 WORKDIR /app
 COPY package*.json ./
 RUN npm install
  COPY . .


Também devemos adicionar um comando para executar o processo de build * da nossa aplicação, no Dockerfile :
* Esses comandos podem variar dependendo da aplicação que você for rodar.
No nosso exemplo, uma aplicação em React possui um script para gerar uma versão otimizada da página criada, por faremos esse processo aqui.

FROM node:14-alpine AS build
 WORKDIR /app
 COPY package*.json ./
 RUN npm install
 COPY . .
RUN npm run build

Para entender esse comando, podemos ir no terminal e dentro do diretório de nossa aplicação, rodar o comando para gerar uma build :

Você pode notar que na raiz do projeto, foi criada uma pasta chamada build . Essa pasta contém uma versão otimizada da sua aplicação React .
Essa versão, geralmente, é utilizada para disponibilização da sua aplicação em processos de deploy (processo automatizado de disponibilização) e publicação na internet.
Para o nosso exemplo, utilizaremos essa build em associação com um servidor http , logo a seguir.


### NGINX

Aqui faremos um negócio chamado multi-stage build *, que nada mais é que dividir o script do Dockerfile e mais de uma parte.

* Para saber mais sobre o multi-stage build , acesse o link oficial da documentação https://docs-docker-com.translate.goog/develop/develop-images/multistage-build/?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt-BR&_x_tr_pto=nui

Então nessa segunda parte, passaremos a definir no Dockerfile do nosso mini-projeto os comandos do ambiente de produção, no qual utilizaremos um servidor HTTP NGINX .

Como foi dito anteriormente, há uma diversidade de servidores http no mercado. Utilizamos o Apache no exemplo passado e agora utilizaremos o Servidor Nginx (pronunciado "engine-ex"). O Nginx é um software de código aberto para servidores web, originalmente utilizado para navegação HTTP, mas que atualmente também tem outras funcionalidades mais avançadas.

Agora, vamos definir a imagem de origem do Nginx , com o alias "prod". Em seguida, iremos copiar as informações da imagem que apelidamos de "build" e sua respectiva pasta para o diretório do servidor, como a seguir:

 FROM node:14-alpine AS build
 WORKDIR /app
 COPY package*.json ./
 RUN npm install
 COPY . .
 RUN npm run build

FROM nginx:1.16.0-alpine AS prod
COPY --from=build /app/build /usr/share/nginx/html

### EXPOSE 

Outra característica que é necessária nos atentarmos, é a porta que será utilizada por nossa aplicação dentro do container .
Aqui não será diferente, o container possui toda uma rede interna para o container que veremos mais adiante.
Aqui é necessário sabermos que grande parte dos serviços (sobretudo os da web) disponibilizam uma porta de acesso externo, portanto, precisamos especificá-la com o comando EXPOSE :

  EXPOSE <PORTA-DO-APP-NO-CONTAINER>

Por exemplo, se nossa aplicação executa na porta 3000 , precisamos evidenciar no nosso Dockerfile :

  EXPOSE 3000

Uma vez "exposta", configuramos nossa imagem para utilizar esta porta.
Por padrão, o Nginx usa a porta 80 para executar as aplicações, então, podemos expor esta porta no nosso Dockerfile :

 FROM node:14-alpine AS build
 WORKDIR /app
 COPY package*.json ./
 RUN npm install
 COPY . .
 RUN npm run build

 FROM nginx:1.16.0-alpine AS prod
 COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80

Aqui, vale ressaltar que quando formos rodar um container utilizando uma imagem que expõe uma porta, precisamos atribuir uma porta do nosso sistema hospedeiro ( host ) que direcionará para a porta do sistema convidado ( guest ) .
Fazemos isso com o parâmetro -p :

docker container run \
   -p <PORTA-HOST>:<PORTA-GUEST> \
   <IMAGEM>:<TAG>

Por exemplo, se temos uma aplicação que serve na porta 80 que está exposta no Dockerfile e queremos acessá-la a partir da porta 3000 do host , basta executarmos:

docker container run \
   -p 3000:80 \
   --rm \
   -dit \
   yeasy/simple-web:latest

Após rodar o container , basta acessar localhost:3000 para visualizar nosso <s>belíssimo</s> "Real Visit Results".
Ao listar os containers em execução com docker container ps , podemos ver as portas expostas e seus respectivos binds , através do campo PORTS .

### CMD 

O comando CMD (Que vem de C o m man d Prompt, ou Prompt de comando em português) , sempre é executado quando o container é iniciado .
É interessante ressaltar que pode acontecer de mais de um CMD ser definido em um mesmo Dockerfile e, neste caso, apenas o último terá efeito.
O CMD possui 2 formas: a que vimos até aqui para a execução de comandos shell e as para executáveis. Vamos ver um exemplo:

CMD ["/bin/echo", "Hello World"]

Nesse forma, o primeiro argumento é o executável e os demais são seus parâmetros.

Normalmente utilizamos o CMD para executar o comando que irá rodar com o container, poderíamos usar como exemplo o start de um app , por exemplo:

CMD npm start


**Aqui temos mais um ponto de atenção, caso o container seja executado passando um comando no run , o comando passado sobrescreverá o comando definido no CMD** .
Podemos utilizar o CMD no Dockerfile do nosso mini-projeto, da seguinte forma:

 FROM node:14-alpine AS build
 WORKDIR /app
 COPY package*.json ./
 RUN npm install
 COPY . .
 RUN npm run build

 FROM nginx:1.16.0-alpine AS prod
 COPY --from=build /app/build /usr/share/nginx/html
 EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


### ENTRYPOINT

Vimos que podemos utilizar o CMD para iniciarmos um comando ao executarmos nossos containers , como por exemplo para iniciarmos um app .
Porém, para esse fim recomendamos utilizar ENTRYPOINT (Ponto de entrada em português) , pois, diferentemente do CMD , o comando não será sobrescrito pelo passado no run ao executarmos o container .
Por exemplo:
  ENTRYPOINT ["/bin/echo", "Hello World"]

**Um ponto de atenção é que ao definirmos um entrypoint , alteramos o comportamento do CMD , que ao ser utilizado irá rodar como base para o comando definido pelo entrypoint , apenas como "parâmetros adicionais" à ele, por exemplo:**


  ENTRYPOINT [ "/bin/echo" ]
  CMD [ "Hello World" ]

Nesse exemplo, será executado no iniciar do container echo Hello World .
Para ilustrar melhor a diferença entre os dois comandos, vamos a um exemplo em que poderíamos explorar a diferença entre eles:

  ENTRYPOINT ["/bin/echo", "Hello"]
  CMD ["World"]

Nesse caso, ao executarmos o container , seria executado echo Hello World , porém poderíamos passar um parâmetro para o comando docker container run , de modo a substituir o CMD :

  docker container run nossa-hello-world-image John

Nesse caso, teríamos a seguinte saída no console: Hello John . Pois o CMD seria substituído pelo comando passado no container run .
No Dockerfile do nosso mini-projeto, vamos substituir a linha que estava com CMD, agora passando no nosso ENTRYPOINT :

 FROM node:14-alpine AS build
 WORKDIR /app
 COPY package*.json ./
 RUN npm install
 COPY . .
 RUN npm run build

 FROM nginx:1.16.0-alpine AS prod
 COPY --from=build /app/build /usr/share/nginx/html
 EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
