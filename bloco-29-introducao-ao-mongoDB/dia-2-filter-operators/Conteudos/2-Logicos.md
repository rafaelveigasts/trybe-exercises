## Operadores Lógicos

Assim como os operadores de comparação, os operadores lógicos também podem ser utilizados nos mesmos métodos para leitura e atualização de documentos do MongoDB . Eles também ajudam a elaborar consultas mais complexas, juntando cláusulas para retornar documentos que satisfaçam os filtros.

### Operador $not
Sintaxe:

*{ campo: { $not: { <operador ou expressão> } } }*

O operador $not executa uma operação lógica de NEGAÇÃO no < operador ou expressão > especificado e seleciona os documentos que não correspondam ao < operador ou expressão > . Isso também inclui os documentos que não contêm o atributo .
Veja o exemplo abaixo:

*db.inventory.find({ price: { $not: { $gt: 1.99 } } })*

Essa consulta seleciona todos os documentos na coleção inventory em que o valor do atributo price é menor ou igual a 1.99 (em outras palavras, não é maior que 1.99 ), ou em que o atributo price não exista.

É importante destacar que a expressão { $not: { $gt: 1.99 } } retorna um resultado diferente do operador $lte . Ao utilizar { $lte: 1.99 } , os documentos retornados serão somente aqueles em que o campo price existe e cujo valor é menor ou igual a 1.99 .

### Operador $or
O operador $or executa a operação lógica OU em um array de uma ou mais expressões e seleciona os documentos que satisfaçam ao menos uma das expressões.
Sintaxe:

*{ $or: [{ <expression1> }, { <expression2> }, ... , { <expressionN> }] }*

Considere o exemplo a seguir:

*db.inventory.find({ $or: [{ qty: { $lt: 20 } }, { price: 10 }] })*

Essa consulta seleciona todos os documentos da coleção inventory em que o valor do atributo qty é menor do que 20 ou o valor do atributo price é igual a 10 .

### Operador $nor
O operador $nor também executa uma operação lógica de NEGAÇÃO, porém, em um array de uma ou mais expressões, e seleciona os documentos em que todas essas expressões falhem, ou seja, seleciona os documentos em que todas as expressões desse array sejam falsas.
Sintaxe:

*{ $nor: [ { <expressão1> }, { <expressão2> }, ...  { <expressãoN> } ] }*

Veja o exemplo abaixo:

*db.inventory.find({ $nor: [{ price: 1.99 }, { sale: true }] })*

Essa query retorna todos os documentos da coleção inventory que:
Contêm o atributo price com o valor diferente de 1.99 e o atributo sale com o valor diferente de true ;

Ou contêm o atributo price com valor diferente de 1.99 e não contêm o atributo sale ;
Ou não contêm o atributo price e contêm o atributo sale com valor diferente de true ;
Ou não contêm o atributo price e nem o atributo sale .
Pode parecer complexo, mas você fará mais exercícios para praticar esse operador.

### Operador $and

O operador $and executa a operação lógica E num array de uma ou mais expressões e seleciona os documentos que satisfaçam todas as expressões no array. O operador $and usa o que chamamos de avaliação em curto-circuito ( short-circuit evaluation ). Se alguma expressão for avaliada como falsa, o MongoDB não avaliará as expressões restantes, pois o resultado final sempre será falso independentemente do resultado delas.
Sintaxe:

*{ $and: [{ <expressão1> }, { <expressão2> } , ... , { <expressãoN> }] }*

Múltiplas expressões especificando o mesmo atributo
Considere o exemplo abaixo:

*db.inventory.find({*

    $and: [
        { price: { $ne: 1.99 } },
        { price: { $exists: true } }
    ]
})

Essa consulta seleciona todos os documentos da coleção inventory em que o valor do atributo price é diferente de 1.99 e o atributo price existe.
Múltiplas expressões especificando o mesmo operador
Considere o exemplo abaixo:

*db.inventory.find({*

    $and: [
        { price: { $gt: 0.99, $lt: 1.99 } },
        {
            $or: [
                { sale : true },
                { qty : { $lt : 20 } }
            ]
        }
    ]
})

Essa consulta seleciona todos os documentos da coleção inventory em que o valor do campo price é maior que 0.99 e menor que 1.99, E o valor do atributo sale é igual a true, OU o valor do atributo qty é menor do que 20 . Ou seja, essa expressão é equivalente a (price > 0.99 E price < 1.99) (onde o E está implícito na vírgula aqui { $gt: 0.99, $lt: 1.99 } ) E (sale = true OU qty < 20) .

## Vamos praticar !

Faça os desafios de 1 a 5 abaixo, sobre os operadores lógicos utilizando a coleção restaurants criada no tópico anterior.

Selecione e faça a contagem dos restaurantes que não possuem avaliação menor ou igual a 5, essa consulta também deve retornar restaurantes que não possuem o campo avaliação.
R: db.restaurants.find({ "grades.score": { $not: { $gt: 5 } } }).count()

Selecione e faça a contagem dos restaurantes em que a avaliação seja maior ou igual a 6, ou restaurantes localizados no bairro Brooklyn .
R: db.restaurants.find({ "grades.score": { $gte: 6 }, "address.zipcode": "11216" }).count()

Selecione e faça a contagem dos restaurantes localizados nos bairros Queens, Staten Island e Brooklyn e possuem avaliação maior que 4 .
R: db.restaurants.find({ "address.zipcode": { $in: ["11106", "10001", "11216"] }, "grades.score": { $gt: 4 } }).count()

Selecione e faça a contagem dos restaurantes onde nem o campo avaliação seja igual a 1, nem o campo culinária seja do tipo American .
R: db.restaurants.find({ "grades.score": { $ne: 1 }, "cuisine": { $ne: "American" } }).count()

Selecione e faça a contagem dos resturantes em que a avaliação seja maior que 6 ou menor que 10, E esteja localizado no bairro Brooklyn OU não possuem culinária do tipo Delicatessen .
R: db.restaurants.find({ "address.zipcode": "11216", "cuisine": { $ne: "Delicatessen" }, "grades.score": { $gt: 6, $lt: 10 } }).count()
