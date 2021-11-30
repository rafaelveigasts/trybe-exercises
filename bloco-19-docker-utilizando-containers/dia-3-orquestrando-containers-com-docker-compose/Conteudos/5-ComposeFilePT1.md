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

