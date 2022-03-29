## Utilizando o find()

### Exemplos

Para esses exemplos você vai utilizar os documentos de uma coleção chamada bios . Caso você queira executar os exemplos localmente, copie o trecho de código que representa a coleção, e execute no seu cliente do MongoDB para inserí-la em sua instância local.

Os documentos dessa coleção, de maneira geral, têm esse formato:

{
    "_id" : <value>,
    "name" : { "first" : <string>, "last" : <string> },       // documento embedado ou subdocumento
    "birth" : <ISODate>,
    "death" : <ISODate>,
    "contribs" : [ <string>, ... ],                           // Array de Strings
    "awards" : [
        { "award" : <string>, year: <number>, by: <string> }  // Array de subdocumentos
        ...
    ]
}


## Selecionando todos os documentos da coleção
O método find() , quando utilizado sem parâmetros, retorna todos os documentos da coleção juntamente com todos os seus campos. Por exemplo, a operação abaixo retorna todos os documentos da coleção bios :

db.bios.find()

## Selecionando documentos com critérios de busca

### Query por igualdade

A operação abaixo retorna os documentos da coleção bios em que o atributo _id é igual a 5 :

*db.bios.find( { _id: 5 } )*

Agora, a operação abaixo retorna todos os documentos da coleção bios em que o campo last do subdocumento name é igual a "Hopper" :

*db.bios.find( { "name.last": "Hopper" } )*

Note que, para acessar campos em subdocumentos, utilizamos dot notation (por exemplo, "subdocumento.atributo" ).

## Projetando somente os atributos requeridos:

Através do segundo parâmetro do método find() , podemos especificar quais atributos serão retornados. O exemplo abaixo retorna todos os documentos da coleção bios, trazendo apenas o atributo name de cada documento:

*db.bios.find({}, { name: 1 })*

Lembrando que o atributo name é um subdocumento, pois armazena um objeto com outros atributos.

Procure utilizar a projeção para diminuir a quantidade de campos retornados pelo cursor. Isso ajuda muito no que se refere ao tráfego desses dados na rede!

## Limitando o número de documentos retornados

### limit()

Você pode limitar o número de documentos retornados por uma consulta utilizando o método limit() . Esse método é semelhante à declaração LIMIT em um banco de dados que utiliza SQL .

Uma utilização comum do limit() é para maximizar a performance e evitar que o MongoDB retorne mais resultados do que o necessário para o processamento.
O método limit() é utilizado da seguinte forma:

*db.collection.find(<query>).limit(<número>)*

Note que você deve especificar um valor numérico no limit() .
Um exemplo utilizando a coleção bios :

*db.bios.find().limit(5)*

A operação acima retornará os cinco primeiros documentos da coleção bios .

### pretty()

Com o método pretty() você pode deixar os resultados exibidos no MongoDB Shell um pouco mais legíveis. Esse método aplica uma indentação na exibição dos resultados no console, de forma que fica bem melhor de ler.
Exemplo de utilização do método pretty() , usando a coleção bios :

*db.bios.find().limit(5).pretty()*

Utilize o método pretty() à vontade!

## "Pulando" documentos com skip()

### skip(<número>)

Acione o método skip() para controlar a partir de que ponto o MongoDB começará a retornar os resultados. Essa abordagem pode ser bastante útil para realizar paginação dos resultados.
O método skip() precisa de um parâmetro numérico que determinará quantos documentos serão "pulados" antes de começar a retornar.

O exemplo abaixo na coleção bios pulará os dois primeiros documentos e retornará o cursor a partir daí:

*db.bios.find().skip(2)*

Você pode combinar os métodos limit() e skip() criando, assim, uma paginação:

*db.bios.find().limit(10).skip(5)*
