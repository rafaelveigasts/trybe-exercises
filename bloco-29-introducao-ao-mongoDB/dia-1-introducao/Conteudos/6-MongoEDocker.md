## Utilizando MongoDB com Docker

Agora vamos aprender a utilizar o Mongo via Docker, dispensando a necessidade de um serviço sempre em execução na sua máquina de desenvolvimento.

Antes de iniciar os trabalhos, certifique-se de que o Docker está instalado em sua máquina e em execução.

Com o Docker rodando, agora nós precisamos obter a imagem do Mongo que será o molde para criarmos nossos containers. Para isto, executamos o comando abaixo.

*docker pull mongo*

Note que a primeira mensagem será Using default tag: latest o que significa que estamos obtendo a última versão desta imagem, provavelmente com a última versão estável do Mongo.

Caso queira baixar alguma versão específica, verifique as tags disponíveis aqui . https://hub.docker.com/_/mongo?tab=tags

Iniciando uma instância do Mongo Server

Para executar esta imagem você pode usar a linha abaixo. Caso seja necessário usar uma determinada porta, você pode passar o alias -p porta:porta

*docker run --name <nome-do-container> -d mongo*

Ao executar o comando acima utilizando apenas mongo , você estará baixando sempre a última versão da imagem.

Já no comando abaixo, com o comando mongo:tag , você baixará uma versão específica do mongo, como por exemplo mongo:5.0 .

*docker run --name <nome-do-container> -d mongo:tag*

Tag é a versão do MongoDB que você deseja.

Executando o shell do Mongo no Docker

O comando docker exec permite que você execute comandos dentro de um contêiner do Docker. O comando a seguir executará o Mongo dentro do contêiner Docker que criamos anteriormente.

*docker exec -it <nome-do-container-ou-id> mongo*

Obs: você pode usar o comando mongosh no lugar de <code>mongo</code> para ter acesso ao shell com novos recursos . https://www.mongodb.com/blog/post/introducing-the-new-shell

## Importanto arquivos locais para dentro do contêiner utilizando mongoimport

A ferramenta mongoimport https://docs.mongodb.com/database-tools/mongoimport/ importa conteúdo de um arquivo JSON , CSV ou TSV criada por mongoexport ou, potencialmente, outra ferramenta de exportação de terceiros. Utilizamos esse recurso num contêiner da seguinte forma:

No primeiro passo copiamos o arquivo que será importado para dentro do nosso contêiner.

*docker cp nome-do-arquivo.json <nome-do-contêiner-ou-id>:/tmp/nome-do-arquivo.*json.json

No segundo passo realizamos a importação do arquivo JSON para o MongoDB.

*docker exec <nome-do-contêiner-ou-id> mongoimport -d <nome-do-banco> -c <nome-da-coleção> --file /tmp/nome-do-arquivo.json*

