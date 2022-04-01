## Operador $push
O operador $push adiciona um valor a um array . Se o campo não existir no documento, um novo array com o valor em um elemento será adicionado.

Sintaxe:

*{ $push: { <campo1>: <valor1>, ... } }*

Em conjunto com o $push , você pode utilizar o que chamamos de modificadores . Cada um desses modificadores tem funções específicas que você verá melhor com exemplos. São eles:

*$each :* Adiciona múltiplos valores a um array ;
*$slice :* Limita o número de elementos do array . Requer o uso do modificador $each ;
*$sort :* Ordena os elementos do array . Requer o uso do modificador $each ;
*$position :* Especifica a posição do elemento que está sendo inserido no array . Também requer o modificador $each . Sem o modificador $position , o operador $push adiciona o elemento no final do array .

Quando você utiliza um modificador, o processo de push ocorre na seguinte ordem, independentemente da ordem em que os modificadores aparecem:

Altera o array para adicionar os elementos na posição correta;
Aplica a ordenação ( $sort ), se especificada;
Limita o array ( $slice ), se especificado;
Armazena o array .

Veja alguns exemplos. Utilizaremos um banco de dados chamado sales .

### Adicionando um valor a um array
Considere a coleção supplies , uma coleção vazia. A operação abaixo adiciona um objeto que tem as informações da compra de um produto ao array items do documento em que o _id seja igual a 1 na coleção supplies :

Para não precisarmos escrever uma query só para fazer o insert do documento, vamos usar a opção upsert: true para já adicionar o elemento ao mesmo tempo que usamos o operador $push . É importante ficar nítido que a condição upsert não influencia a forma como o $push funciona.

use sales;
db.supplies.updateOne(
  { _id: 1 },
  {
    $push: {
      items: {
        "name": "notepad",
        "price":  35.29,
        "quantity": 2,
      },
    },
  },
  { upsert: true },
);


Veja, o método updateOne() é o mesmo que você já utilizou nos exemplos anteriores. A única diferença é a inclusão do operador $push . O resultado dessa operação é um documento com o seguinte formato:

{
    _id : 1,
    items : [
        {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
        },
    ],
}

### Adicionando múltiplos valores a um array

Se você quiser adicionar múltiplos valores a um array , isso também é possível utilizando o operador $push , mas dessa vez será necessário adicionar o modificador $each .
A operação abaixo adicionará mais dois produtos ao array items do primeiro documento na coleção supplies :

db.supplies.updateOne(
  {},
  {
    $push: {
      items: {
        $each: [
          {
            "name": "pens",
            "price": 56.12,
            "quantity": 5,
          },
          {
            "name": "envelopes",
            "price": 19.95,
            "quantity": 8,
          },
        ],
      },
    },
  },
  { upsert: true },
);

O documento ficará assim:

{
    _id : 1,
    items : [
        {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
        },
        {
            "name" : "pens",
            "price" : 56.12,
            "quantity" : 5,
        },
        {
            "name" : "envelopes",
            "price" : 19.95,
            "quantity" : 8,
        },
    ],
}

### Múltiplos modificadores

O $push pode ser utilizado com múltiplos modificadores, fazendo várias operações ao mesmo tempo em um array .

Desconsidere as últimas alterações com $push (se quiser acompanhar, você pode utilizar db.dropDatabase() para remover as alterações anteriores) e veja a realização dele abaixo, com ainda mais opções!

db.supplies.updateOne(
  { _id: 1 },
  {
    $push: {
      items: {
        $each: [
          {
            "name" : "notepad",
            "price" : 35.29,
            "quantity" : 2,
          },
          {
            "name": "envelopes",
            "price": 19.95,
            "quantity": 8,
          },
          {
            "name": "pens",
            "price": 56.12,
            "quantity": 5,
          },
        ],
        $sort: { quantity: -1 },
        $slice: 2,
      },
    },
  },
  { upsert: true },
);

Essa operação utiliza os seguintes modificadores:

O modificador $each para adicionar múltiplos documentos ao array items ;
O modificador $sort para ordenar todos os elementos alterados no array items pelo campo quantity em ordem decrescente;

E o modificador $slice para manter apenas os dois primeiros elementos ordenados no array items .

Em resumo, essa operação mantém no array items apenas os dois documentos com a quantidade (campo quantity ) mais alto. Veja o resultado logo abaixo:

{
  _id : 1,
  items : [
    {
      "name" : "envelopes",
      "price" : 19.95,
      "quantity" : 8,
    },
    {
      "name" : "pens",
      "price" : 56.12,
      "quantity" : 5,
    },
  ],
}