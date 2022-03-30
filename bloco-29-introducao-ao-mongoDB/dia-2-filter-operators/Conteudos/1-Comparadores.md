## Operadores de Comparação

Os operadores de comparação servem para que você execute consultas comparando os valores de atributos dos documentos de uma coleção.

Esses operadores são utilizados como parte do filtro de alguns métodos para leitura de documentos do MongoDB . Por exemplo, o find() e o countDocuments() , que você já viu neste bloco , ou o update() , que você verá em breve, aceitam filtros de comparação.

Vale lembrar que, para comparações de BSON types diferentes, você deve entender a ordem de comparação .

Os operadores seguem uma sintaxe padrão que é composta por um subdocumento, como no exemplo abaixo.

*{ <campo>: { <operador>: <valor> } }*

Além disso, os operadores são identificados pelo prefixo $ .

### Operador $lt

O operador $lt seleciona os documentos em que o valor do atributo filtrado é menor do que (<) o valor especificado.
Veja o exemplo abaixo:

*db.inventory.find({ qty: { $lt: 20 } })*

Essa consulta selecionará todos os documentos na coleção inventory cujo valor do atributo qty é menor do que 20 .

### Operador $lte
O operador $lte seleciona os documentos em que o valor do atributo filtrado é menor ou igual (<=) ao valor especificado.
Veja o exemplo abaixo:

*db.inventory.find({ qty: { $lte: 20 } })*

Essa query selecionará todos os documentos na coleção inventory cujo valor do atributo qty é menor ou igual a 20 .

### Operador $gt
O operador $gt seleciona os documentos em que o valor do atributo filtrado é maior do que (>) o valor especificado.
Veja o exemplo abaixo:

*db.inventory.find({ qty: { $gt: 20 } })*

Essa query selecionará todos os documentos na coleção inventory cujo valor do atributo qty é maior do que 20 .

### Operador $gte
O operador $gte seleciona os documentos em que o valor do atributo filtrado é maior ou igual (>=) ao valor especificado.
Veja o exemplo abaixo:

*db.inventory.find({ qty: { $gte: 20 } })*

Essa query selecionará todos os documentos na coleção inventory cujo valor do atributo qty é maior ou igual a 20 .

### Operador $eq
O operador $eq seleciona os documentos em que o valor do atributo filtrado é igual ao valor especificado. Esse operador é equivalente ao filtro { campo: <valor> } e não tem nenhuma diferença de performance.
Veja o exemplo abaixo:

*db.inventory.find({ qty: { $eq: 20 } })*

A operação acima é exatamente equivalente a:

*db.inventory.find({ qty: 20 })*

Durante a aula você verá mais exemplos que mostrarão que o $eq é apenas uma maneira de explicitar o operador.

### Operador $ne
Esse operador é o contrário do anterior. Ao utilizar o $ne , o MongoDB seleciona os documentos em que o valor do atributo filtrado não é igual ao valor especificado.

*db.inventory.find({ qty: { $ne: 20 } })*

A query acima retorna os documentos da coleção inventory cujo valor do atributo qty é diferente de 20, incluindo os documentos em que o atributo qty não existe.

### Operador $in
A consulta abaixo retorna todos os documentos da coleção inventory em que o valor do atributo qty é 5 ou 15 . E embora você também possa executar essa consulta utilizando o operador $or , que você verá mais à frente no conteúdo, escolha o operador $in para executar comparações de igualdade com mais de um valor no mesmo atributo.

*db.inventory.find({ qty: { $in: [ 5, 15 ] } })*

### Operador $nin
O operador $nin seleciona os documentos em que o valor do atributo filtrado não é igual ao especificado no array, ou o campo não existe.

*db.inventory.find( { qty: { $nin: [ 5, 15 ] } } )*

Essa consulta seleciona todos os documentos da coleção inventory em que o valor do atributo qty é diferente de 5 e 15 . Esse resultado também inclui os documentos em que o atributo qty não existe.

## Vamos praticar !
Agora que aprendemos sobre os operadores de comparação, vamos sedimentar esses conhecimentos com alguns exercícios de fixação. Para isso, vamos criar um novo banco de dados chamado business com uma coleção chamada restaurants :

Clique neste link https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/exercise-filter-operators-e8e55183a5af1418a8f0d355ad895d13.js ;
Copie todo o conteúdo do link e depois abra o MongoDB Shell ;
Utilize o comando use business para criar e utilizar este banco de dados;
Cole todo o conteúdo no terminal do MongoDB Shell e confirme com ENTER ou baixe o arquivo e o execute usando o comando mongo exercise-filter-operators.js .
Para confirmar que está tudo funcionando, rode o seguinte comando:

*db.restaurants.countDocuments()*

O valor retornado deve ser 60, que é a quantidade de documentos nesta coleção. Agora utilize os operadores de comparação para resolver os desafios de 1 a 5.


Selecione e faça a contagem dos restaurantes presentes nos bairros Queens, Staten Island e Bronx . (utilizando o atributo borough )
R: db.restaurants.countDocuments({ borough: { $in: [ "Queens", "Staten Island", "Bronx" ] } })

Selecione e faça a contagem dos restaurantes que não possuem culinária do tipo American . (utilizando o atributo cuisine )
R: db.restaurants.countDocuments({ cuisine: { $nin: [ "American" ] } })

Selecione e faça a contagem dos restaurantes que possuem avaliação maior ou igual a 8 . (utilizando o atributo rating )
R: db.restaurants.countDocuments({ rating: { $gte: 8 } })

Selecione e faça a contagem dos restaurantes que possuem avaliação menor que 4 .
R: db.restaurants.countDocuments({ rating: { $lt: 4 } })

Selecione e faça a contagem dos restaurantes que não possuem as avaliações 5, 6 e 7 .
R: db.restaurants.countDocuments({ rating: { $nin: [ 5, 6, 7 ] } })