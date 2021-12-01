## Gerenciando Services ##


Antes de seguirmos para os próximos comandos do Compose , vamos aprender alguns comandos de execução do arquivo docker-compose.yaml para ver na prática algumas implicações do que já aprendemos até aqui.

Up

Ao rodar o comando docker-compose up , o Compose irá executar todos os containers especificados, baixando as imagens do repositório ou buildando localmente a partir do Dockerfile , de acordo com o que foi especificado no arquivo. Outro detalhe importante é que, nesse momento, além de executar os containers , o Compose irá criar os demais objetos especificados, como redes e volumes.

Da mesma forma como rodamos os containers no modo daemon , podemos fazê-lo no docker-compose up utilizando o parâmetro -d .

O parâmetro -f também pode ser utilizado, caso você tenha dado um nome diferente do padrão para o seu arquivo Compose . Se seu arquivo possuir o nome padrão docker-compose.yaml , não é necessário passar a essa flag , apenas lembre-se de estar no mesmo diretório que o arquivo.

Caso você utilize a opção -f , lembre-se que ela pertence ao comando docker-compose , sendo assim, ela precisa ser passada logo após ele. Por exemplo: docker-compose -f meu-arquivo-compose.yaml up ou docker-compose -f meu-arquivo-compose.yml stop . A sintaxe docker-compose <COMMAND> -f não funcionará .

Se você está construiu localmente um arquivo docker-compose.yaml como o do exemplo que desenvolvemos até aqui, tente entrar no diretório em que está o arquivo e executar os services utilizando o o comando:

docker-compose up

Podemos também usar este comando especificando um service .

docker-compose up <SERVICE NAME>

Se fizermos isso, o Compose irá incluir também suas dependências. Por exemplo, seguindo com nosso arquivo docker-compose.yaml de, se rodarmos o comando:

docker-compose backend

O Compose também irá criar e startar o database , que definimos no docker-compose.yaml como dependência do service backend , por meio do parâmetro depends_on .

Caso você use o parâmetro build (que recebe o caminho do _Dockerfile da sua aplicação) ao invés de image , o _Compose irá buildar a imagem se isso não tiver sido feito anteriormente.

Nesse sentido, outro parâmetro importante para conhecermos e muito usual é o --build . Perceba que, uma vez que a imagem seja buildada pelo Compose , na próxima vez que executarmos o up , ele utilizará essa imagem já criada, sem atualizá-la.

Para forçamos um novo build , podemos utilizar a tag --build especificando um service ou não (dessa maneira ele irá tentar buildar todas as imagens possíveis novamente).

docker-compose up --build <SERVICE NAME>

É muito comum utilizarmos o --build durante o desenvolvimento, pois quando fazemos alguma alteração e queremos refleti-la em nosso ambiente Compose , precisamos rebuildar a imagem do service alterado para que as atualizações sejam aplicadas ao ambiente.

⚠️ Lembre-se que para os comandos Compose , quando não especificado um arquivo com -f , a ferramenta irá buscar pelo arquivo docker-compose.yaml no diretório atual.


## Down ##

Se quisermos parar nossos services , podemos utilizar o comando down . Com ele, todos os containers irão ser parados e os objetos criados pelo up , como as redes, por exemplo, serão removidos.

docker-compose down

Não precisa se preocupar com remoção das redes e dos apontamentos que o comando causará, pois ao rodar o up novamente, tudo será recriado.


## Ps ##


Semelhante ao comando com containers , podemos utilizar o parâmetro ps para listar os containers ativos. Porém, a grande diferença é que só serão listados os containers pertencentes ao arquivo do Compose referenciado (seja utilizando a flag -f ou utilizando o nome de arquivo padrão).

docker-compose ps

## Stop ##

Com o comando stop , conseguimos parar os services e, consequentemente, todos os containers relacionados. Diferentemente do down , ele não irá remover as redes e outros objetos criados pelo up .

docker-compose stop

Lembre-se que podemos especificar um service a ser parado, para isso basta utilizarmos o nome que definimos no arquivo Compose .

docker-compose stop <SERVICE NAME>

De maneira semelhante ao que ocorre com o docker-compose up quando especificamos um service , ao especificarmos um service no o docker-compose stop , ele irá parar os serviços respeitando as dependências.

Em nosso exemplo, o backend será parado antes do database , ao executarmos o comando:

docker-compose stop backend


## Start ##

O start funciona de maneira análoga ao stop . Com ele, podemos startar os services parados referentes àquele arquivo Compose .

docker-compose start

Também de maneira semelhante ao stop , podemos especificar um service para ser startado utilizando o nome dele.


## Logs ##

Outro comando bem interessante é o logs . Com ele, podemos ver os logs de nossos services de maneira semelhante como fazemos unitariamente com os containers . 

Aqui podemos especificar um service para visualizar os logs de todos os seus containers , ou ver todos os logs daquele ambiente, conforme arquivo do Compose .

De maneira similar também ao comando para containers , podemos utilizar a flag -f ou --follow para acompanhar em tempo real as saídas dos containers e o --tail , em que podemos definir o número de linhas para ser exibidos a partir do final dos logs .

docker-compose logs -f --tail=100 <SERVICE NAME>