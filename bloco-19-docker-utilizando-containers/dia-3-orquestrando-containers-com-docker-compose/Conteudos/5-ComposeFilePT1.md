## Compose File - Parte I ##

Resumidamente, o arquivo Docker Compose é onde conseguimos especificar todos os parâmetros que antes rodávamos unitariamente utilizando docker container run , além de podermos também criar os demais objetos utilizados por eles, como redes e volumes .

Mapear todos os comandos e estruturá-los em um único arquivo tem diversas vantagens. Uma delas, especialmente vantajosa quando estamos trabalhando com muitos containers , é evitar ter que sempre digitar inúmeros parâmetros em linha de comando com o run . Além disso, utilizar o Docker Compose torna mais fácil editar configurações e automatiza a execução de comandos.

Toda a configuração do Docker Compose é feita por meio de um arquivo YAML . O nome padrão que utilizamos é docker-compose.yaml , porém, pode ser utilizado qualquer outro nome de nossa escolha.

version: "<VERSÃO-DO-COMPOSE>"
services: # Definição dos containers
  <MEU-CONTAINER-1>:
    image: <MINHA-IMAGEM:VERSÃO> # Exemplo carregando uma imagem já _buildada_
    # ... outras configurações
  <MEU-CONTAINER-2>:
    build: <CAMINHO-DO-DOCKERFILE> # Exemplo gerando uma build a partir de um `Dockerfile`
    # ... outras configurações
  <MEU-CONTAINER-N>:
    image: <MINHA-IMAGEM:VERSÃO>
    # ... outras configurações


Vamos ver agora, detalhadamente, como utilizar os principais parâmetros e rodar nossas aplicações utilizando o Compose .

## Version ##

Todo arquivo docker-compose.yaml deve iniciar com a tag version , dessa maneira definimos qual a versão que deverá ser utilizada pelo compose para interpretar o arquivo, evitando assim que o docker-compose.yaml fique incompatível com versões mais recentes do compose .

Você pode consultar as especificações de cada versão aqui https://docs.docker.com/compose/compose-file/compose-versioning/#versioning .

Utilizaremos a versão 3 do compose , sendo assim, nosso yaml iniciará da seguinte maneira:
version: '3'

## Services ##

Para o Compose , há o conceito de services , que são os "tipos" dos containers que iremos rodar. Por exemplo, se vamos executar uma API , dizemos que ela é um service . Isso porque com o Compose , podemos escalar nossos apps em vários containers.

Podemos, por exemplo, escalar nossa API em 4 containers diferentes, de forma que teremos um service que é a nossa API , porém com 4 containers em execução.

Dessa forma, ao escrevermos nosso arquivo, temos que pensar em services , pois é assim que iremos defini-los. Vamos a um exemplo! Imagine que queremos subir uma aplicação que contém um front-end, um back-end e um banco de dados. Dessa forma, não precisamos ainda pensar em quantos containers teremos, porém, podemos dizer que temos 3 services . Para definir nossos services , utilizamos o parâmetro services . Vamos ver como ficaria esse exemplo em nosso arquivo Compose :

version: '3'
services:
  frontend::

  backend:

  database:

Perceba que aqui apenas demos um nome aos nosso serviços, porém não especificamos o que deverá ser executado ainda. Lembre-se que todo container é criado a partir de uma imagem , sendo assim, precisamos especificá-las aos nossos serviços. Para isso, podemos utilizar dois comandos: image para especificar uma imagem, seja local ou a ser baixada no Docker Hub , ou build , para apontar um diretório com o Dockerfile a partir do qual o Compose irá buildar a imagem para nós.

Em nosso exemplo, construiremos as três partes da aplicação a partir dessas https://hub.docker.com/r/mjgargani/compose-example/tags imagens disponíveis no Docker Hub . Portanto, usaremos sempre o comando image para especificar cada uma delas. Nosso docker-compose.yaml ficaria assim:

version: '3'
services:
  frontend:
    image: mjgargani/compose-example:frontend-trybe1.0
  backend:
    image: mjgargani/compose-example:backend-trybe1.0
  database:
    image: mjgargani/compose-example:database-trybe1.0

Nosso arquivo irá funcionar como se estivéssemos executando três docker container run , um para cada serviço. Sendo assim, precisamos definir os demais parâmetros para os nossos containers .

## Restart ##


No Docker , existem as políticas de reinicialização, que servem para gerenciar se seus containers reiniciarão automaticamente quando o docker for reiniciado ou quando ocorrer algum erro, por exemplo.

Este comando pode assumir quatro valores:

no - Este é o valor padrão assumido pelo Docker e define que o container não irá restartar automaticamente;
on-failure - Define que o container será reiniciado caso ocorra alguma falha, apontado pelo exit code diferente de zero;
aways - Especifica que sempre que o serviço parar, seja por um falha ou porque ele finalizou sua execução, ele irá ser reiniciado; *
unless-stopped - Define que o container sempre seja reiniciado, a menos que a menos que o Docker em si seja parado (manualmente ou não). No caso de ser interrompido, ele não reinicia nem depois que o daemon do Docker * seja reiniciado.

* Caso o container seja interrompido manualmente, ele só será reiniciado depois que o daemon do Docker for reiniciado ou que o próprio container seja reiniciado manualmente. Esse é um mecanismo pra evitar loops .

O daemon do Docker é um processo que contínuo e que roda em segundo plano, que gerencia os containers Docker em um host .

É importante utilizarmos o parâmetro, principalmente quando utilizarmos o Docker Compose em ambiente de produção, conforme é recomendado pelas especificações da própria documentação.

Com a adição dessa configuração, nosso exemplo ficará assim:

version: '3'
services:
  frontend:
    image: mjgargani/compose-example:frontend-trybe1.0
    restart: always
  backend:
    image: mjgargani/compose-example:backend-trybe1.0
    restart: always
  database:
    image: mjgargani/compose-example:database-trybe1.0
    restart: always


    