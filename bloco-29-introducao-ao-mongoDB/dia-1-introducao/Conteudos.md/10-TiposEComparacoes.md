## Tipos e comparações

### Tipos e comparações

O MongoDB trata alguns tipos de dados como equivalentes para fins de comparação. Por exemplo, tipos numéricos sofrem conversão antes da comparação. No entanto, para a maioria dos tipos de dados, os operadores de comparação https://docs.mongodb.com/manual/reference/operator/query-comparison/ realizam comparações apenas em documentos em que o tipo BSON https://docs.mongodb.com/manual/reference/bson-type-comparison-order/#bson-types-comparison-order do atributo destino do documento corresponde ao tipo do operando da query.

Para compreender melhor esse conceito, veja o exemplo abaixo, considerando a seguinte coleção:

{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }
{ "_id": "oranges", "qty": { "in stock": 8, "ordered": 12 } }
{ "_id": "avocados", "qty": "fourteen" }

A operação abaixo usa o operador de comparação $gt( greater than , maior que, >) para retornar os documentos em que o valor do atributo qty seja maior do que 4 :

db.collection.find( { qty: { $gt: 4 } } )
A operação trará como retorno os seguintes documentos:

{ "_id": "apples", "qty": 5 }
{ "_id": "bananas", "qty": 7 }

O documento com o _id igual a "avocados" não foi retornado porque o valor do campo qty é do tipo string, enquanto o operador $gt é do tipo integer .

O documento com o _id igual a "oranges" também não foi retornado porque qty é do tipo object .

Nesses casos, vemos o schemaless funcionando na prática!
