## Agora, a prática!
O MongoDB possui diversas ferramentas como, por exemplo, mongo , mongosh , Compass e outras ferramentas de terceiros. Você pode utilizar o que achar melhor para executar as queries , o importante é realizá-las.
Utilizando a coleção bios https://docs.mongodb.com/manual/reference/bios-example-collection/ , construa queries para retornar os seguintes itens:

Exercício 1 : Retorne o documento com o _id igual a 8.
R: > db.bios.find({"_id":8}).pretty()


Exercício 2 : Retorne o documento com o _id igual a 8, mas só exiba os atributos: _id e name .
R: > db.bios.find({"_id":8}, {"_id":1, "name":1}).pretty()


Exercício 3 : Retorne apenas os atributos name e birth do documento com o _id igual a 8.
R: > db.bios.find({"_id":8}, {"name":1, "birth":1}).pretty()


Exercício 4 : Retorne todos os documentos em que o atributo name.first seja igual a John, utilizando o método pretty() .
R: > db.bios.find({"name.first":{$eq: "John"} }).pretty();


Exercício 5 : Retorne os 3 primeiros documentos da coleção bios utilizando o método pretty() .
R: > db.bios.find().limit(3).pretty();

Exercício 6 : Retorne 2 documentos da coleção bios pulando os 5 primeiros documentos.
R: > db.bios.find().skip(5).limit(2).pretty();

Utilizando o mongoimport https://docs.mongodb.com/database-tools/mongoimport/#examples , importe o arquivo books.json https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/books-48d15e4d8924badc2308cc4a62eb3ea4.json para a sua instância local do MongoDB e utilize a coleção books para construir as seguintes consultas:

mongoimport --db books --collection books --file books.json

**direto no terminal, e não no mongo**
R: ➜  ~ mongoimport --db class --collection books /home/rafael-cpu/Documentos/trybe/trybe-exercises/bloco-29-introducao-ao-mongoDB/dia-1-introducao/Conteudos/Exercicios/books.json



Exercício 7 : Retorne a quantidade de documentos da coleção books .
R: > db.books.count()

Exercício 8 : Conte quantos livros existem com o status = "PUBLISH" .
R: > db.books.find({"status": "PUBLISH"}).count()

Exercício 9 : Exiba os atributos title , isbn e pageCount dos 3 primeiros livros. NÃO retorne o atributo _id .
R: > db.books.find().limit(3).pretty()

Exercício 10: Pule 5 documentos e exiba os atributos _id , title , authors e status dos livros com o status = "MEAP" , limitando-se a 10 documentos.
R: > db.books.find({"status": "MEAP"}).skip(5).limit(10).pretty()
