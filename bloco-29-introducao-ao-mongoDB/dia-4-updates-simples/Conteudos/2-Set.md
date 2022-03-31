## Operador $set

Como você viu nos exemplos acima, o $set altera o valor de um campo específico.
Se o campo não existir, o operador $set adiciona um novo campo com o valor especificado. Se você especificar campos com dot notation , os documentos embedados necessários serão criados para suprir o caminho do campo.
Você pode especificar múltiplos pares de campos-valores que o operador $set alterará ou criará cada um desses campos.
Veja alguns exemplos considerando a coleção products com o seguinte documento:

use conteudo_trybe;
db.products.insertOne({
  _id: 100,
  sku: "abc123",
  quantity: 250,
  instock: true,
  reorder: false,
  details: { model: "14Q2", make: "xyz" },
  tags: [ "apparel", "clothing" ],
  ratings: [ { by: "ijk", rating: 4 } ]
})

Exemplo 1: Alterando campos no primeiro nível (top-level)
Para o documento que corresponder ao critério de filtro em que o campo _id seja igual a 100 , a operação a seguir altera o valor dos campos quantity , details e tags :

db.products.update(
  { _id: 100 },
  { $set: {
      quantity: 500,
      details: { model: "14Q3", make: "xyz" },
      tags: [ "coats", "outerwear", "clothing" ]
    }
  }
);

A operação acima altera o valor de quantity para 500 , details para um novo documento embedado e tags para um novo array .
No exemplo acima, vários campos foram agrupados e, com isso, são alterados em um mesmo comando! Assim, você pode alterar vários campos de uma única vez.

Exemplo 2: Alterando campos em documentos embedados
Para alterar campos dentro de subdocumentos, você deve utilizar o mesmo conceito de dot notation visto durante as operações de find() .
A operação abaixo altera o valor do campo make dentro do subdocumento details em que o campo _id seja igual a 100 :

db.products.update(
  { _id: 100 },
  { $set: { "details.make": "zzz" } }
);

Exemplo 3: Alterando valores em arrays
Como visto, arrays são uma estrutura muito importante na modelagem de dados do MongoDB, e em algum momento você precisará fazer updates nessas estruturas.
A query abaixo tem como critério de seleção o campo _id igual a 100 . Ela altera o segundo elemento (índice 1 ) do array tags e o campo rating no primeiro elemento (índice 0 ) do array ratings :

db.products.update(
  { _id: 100 },
  { $set: {
      "tags.1": "rain gear",
      "ratings.0.rating": 2
    }
  }
);

Na operação acima, a posição no array está especificada explicitamente. Mais à frente, você verá como fazer para que esse valor seja dinâmico, dependendo de um critério de seleção. Verá também a utilização de outros operadores mais específicos para operações em arrays .
