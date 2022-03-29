## Insert
Você vai fazer algumas inserções no MongoDB utilizando duas funções específicas e também com schemas diferentes e mais "ricos"!

Os métodos insertOne() e insertMany() têm suas particularidades e limitações. Enquanto um faz a inserção de um único documento por vez, o outro pode inserir milhares de documentos em uma única operação. Portanto, saber quando e onde aplicar fará toda a diferença quando você estiver codificando.

Os documentos mais "ricos" são aqueles de estruturas bem complexas que você pode armazenar em suas coleções, deixando os seus dados aninhados e com muitas informações, e sem a necessidade de joins para acessá-los em outras coleções.

Você já viu como os dados são armazenados no MongoDB, viu o conceito de bancos de dados, coleções e documentos. Agora você vai aprender como, efetivamente, criar todos esses elementos.

### insertOne()


Agora, crie um documento na coleção products , no banco de dados sample , com os seguintes atributos e valores:

{
    "productName": "Caixa",
    "price": 20
}

Agora, assuma o controle do campo _id , passando um valor qualquer para ele e crie um novo documento com os mesmos atributos e valores do documento anterior.



### insertMany()

Insira mais três documentos na coleção products em uma única operação:

[
    { "productName": "Lapis", "stock": 10, "price": 20,"status":"A"},
    { "productName": "Tesoura", "price": 5, "status": "B" },
    { "productName": "Borracha", "price": 15, "status": "A" }
]
