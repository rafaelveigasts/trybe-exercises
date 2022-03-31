## Alterando um único documento
Nos próximos exemplos utilizaremos a dataset inventory . Caso queira fazer testes em sua máquina, você pode copiar o dataset para seu computador a partir desse link https://s3.us-east-2.amazonaws.com/assets.app.betrybe.com/back-end/mongodb/inventory-9fac7175bfbcd385cc3374ec3f560f41.js .

use conteudo_trybe;
db.inventory.insertMany([
{ "item": "journal", "qty": 25, "size": { "h": 14, "w": 21, "uom": "cm" }, "status": "A" },
{ "item": "notebook", "qty": 50, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "A" },
{ "item": "paper", "qty": 100, "size": { "h": 8.5, "w": 11, "uom": "in" }, "status": "D" },
{ "item": "planner", "qty": 75, "size": { "h": 22.85, "w": 30, "uom": "cm" }, "status": "D" },
{ "item": "postcard", "qty": 45, "size": { "h": 10, "w": 15.25, "uom": "cm" }, "status": "A" }
]);


Para alterar um único documento, você pode utilizar o método updateOne() . Como o nome do método diz, ele altera apenas o primeiro documento que satisfaça o critério de filtro.
No exemplo abaixo, o método db.colecao.updateOne() é utilizado para alterar o primeiro documento na coleção inventory em que o campo item seja igual a "paper" :

db.inventory.updateOne(
  { item: "paper" },
  { $set: { "size.uom": "cm", status: "P" } }
);

Note que dois parâmetros foram passados no método:
O primeiro deles é o filtro. Nesse caso, um filtro simples de igualdade, mas outros operadores podem ser utilizados aqui;
O segundo é a operação de update em si. Nesse caso, foi utilizado o operador de atualização $set para alterar o valor do campo size.uom para cm e o valor do campo status para P .
⚠️ Chamando o método db.colecao.updateOne() com o parâmetro de filtro vazio { } , o resultado é a atualização do primeiro documento presente em colecao . ⚠️
