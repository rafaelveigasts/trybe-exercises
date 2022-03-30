## Método sort()

Sintaxe :

*db.colecao.find().sort({ "campo": "1 ou -1"})*

Quando existe a necessidade de ordenar os documentos por algum atributo, o método sort() se mostra muito útil. Usando um valor positivo ( 1 ) como valor do atributo, os documentos da consultas são ordenados de forma crescente ou alfabética (também ordena por campos com strings ). Em complemento, usando um valor negativo ( -1 ), os documentos de saída estarão em ordem decrescente ou contra alfabética.
Ele pode ser combinado com o método find() :

*db.example.find({}, { value, name }).sort({ value: -1 }, { name: 1 })*

O sort() só pode ser usado se tiver algum resultado de busca antes:

*db.colecao.find().sort({ nomeDoAtributo: 1 }) // certo*

db.colecao.sort({ nomeDoAtributo: 1 }) // errado
Vamos ver um exemplo?

*db.example.insertMany([*

    { "name": "Mandioquinha Frita", "price": 14 },
    { "name": "Litrão", "price": 8 },
    { "name": "Torresmo", "price": 16 }
])

*db.example.find().sort({ "price": 1 }).pretty()*


*// Resultado esperado:*

{
        "_id" : ObjectId("5f7dd0582e2738debae74d6c"),
        "name" : "Litrão",
        "price" : 8
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6b"),
        "name" : "Mandioquinha Frita",
        "price" : 14
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6d"),
        "name" : "Torresmo",
        "price" : 16
}

*db.example.find().sort({ "price": -1 }, { "name" : 1 }).pretty()*


*// Resultado esperado:*

{
        "_id" : ObjectId("5f7dd0582e2738debae74d6d"),
        "name" : "Torresmo",
        "price" : 16
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6b"),
        "name" : "Mandioquinha Frita",
        "price" : 14
}
{
        "_id" : ObjectId("5f7dd0582e2738debae74d6c"),
        "name" : "Litrão",
        "price" : 8
}

Vamos praticar !
Faça os desafios 1 e 2 abaixo sobre o sort() utilizando a coleção restaurants criada anteriormente.
Ordene alfabeticamente os restaurantes pelo nome (atributo name ).
R: db.restaurants.find().sort({ "name": 1 }).pretty()

Ordene os restaurantes de forma descrescente baseado nas avaliações.
R: db.restaurants.find().sort({ "grades.score": -1 }).pretty()
