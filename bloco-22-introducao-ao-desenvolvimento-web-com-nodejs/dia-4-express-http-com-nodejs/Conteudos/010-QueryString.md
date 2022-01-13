## Query String

Provavelmente você também já deve ter se deparado com URLs nesse formato /produtos?q=Geladeira&precoMaximo=2000 . Para pessoas comuns é bem difícil interpretar o que são todas essas letrinhas no final da URL depois do sinal de interrogação. Essa string depois do ? é uma query string. Nesse caso está sendo passado dois parâmetros: q com o valor Geladeira e precoMaximo com o valor 2000 .

Geralmente o recurso de query string é usado em funcionalidades de pesquisas como quando você utiliza além da barra de pesquisa, filtros avançados para definir o preço máximo, marca e outras classificações em e-commerces.

Para nosso exemplo, vamos definir uma rota /pratos/pesquisar?nome=Macarrão que permita, inicialmente, buscar uma lista de receitas filtrando pelo nome. Vamos usar o código abaixo.

// ...

app.get('/recipes/search', function (req, res) {
  const { name } = req.query;
  const filteredRecipes = recipes.filter((r) => r.name.includes(name));
  res.status(200).json(filteredRecipes);
});


// app.get('/recipes/:id', function (req, res) {
//  const { id } = req.params;
//  const recipe = recipes.find((r) => r.id === parseInt(id));
//  if (!recipe) return res.status(404).json({ message: 'Recipe not found!'});
//
//  res.status(200).send(recipe);
// });

// ...

Perceba, que nessa rota, utilizamos req.query e desestruturamos o atributo nome, para na sequência usar como parâmetro de busca. Dessa vez usamos uma outra HOF, a função filter , para filtrar os receitas que contenham ( .includes ) o nome recebido através da query string e no final devolvemos a lista de receitas obtidas por esse filtro.

Note que nossa rota ficou apenas com o prefixo /recipes/search já que os parâmetros enviados query string, não dependem desse prefixo e sim das informações que vem após o uso da ? na URL. É importante entender que na URL podemos colocar quantos parâmetros desde que eles sigam o formato <chave>=<valor> e que entre cada parâmetro, exista o & para definir que ali está sendo passado um novo parâmetro.

⚠️ Observação: Quando houver rotas com um mesmo radical e uma destas utilizar parâmetro de rota, as rotas mais específicas devem ser definidas sempre antes. Isso porque o Express ao resolver uma rota vai olhando rota por rota qual corresponde a URL que chegou. Se colocamos a rota /recipes/search depois da rota /recipes/:id , o Express vai entender que a palavra search como um id e vai chamar a callback da rota /recipes/:id . Tenha atenção a esse detalhe ao utilizar rotas similares na definição da sua API.

Faça a requisição para testar esse nosso novo endpoint.

http :3001/recipes/search name==Macarrão # Para testar pelo navegador use a URL completa http://localhost:3001/recipes/search?name=Macarrão

A resposta da nossa API vai ser essa:

[
    {
        "id": 2,
        "name": "Macarrão a Bolonhesa",
        "price": 35,
        "waitTime": 25
    },
    {
        "id": 3,
        "name": "Macarrão com molho branco",
        "price": 35,
        "waitTime": 25
    }
]

Vamos agora refatorar nosso código para que ele também seja capaz de filtrar pelo preço máximo passando um segundo parâmetro através da query string.

// ...

app.get('/recipes/search', function (req, res) {
    const { name, maxPrice } = req.query;
    const filteredRecipes = recipes.filter((r) => r.name.includes(name) && r.price <= maxPrice);
    res.status(200).json(filteredRecipes);
})

// ...

Não foi preciso alterar a definição da rota, apenas no código do callback foi feita uma alteração para desestruturar também o atributo maxPrice do objeto req.query e foi adicionada uma condição na chamada da função filter para filtrar os objetos pelo nome e pelo valor do atributo maxPrice enviado na requisição. Vamos testar nosso endpoint depois da modificação. Você pode testar usando no navegador a URL http://localhost:3001/recipes/search?name=Macarrão &maxPrice=40 ou usando o HTTPie como no exemplo abaixo.

http :3001/recipes/search name==Macarrão maxPrice==40 # nesse caso do HTTPie não é necessário usar o &

O retorno da nossa requisição vai devolver a seguinte resposta:

[
    {
        "id": 2,
        "name": "Macarrão a Bolonhesa",
        "price": 35,
        "waitTime": 25
    },
    {
        "id": 3,
        "name": "Macarrão com molho branco",
        "price": 35,
        "waitTime": 25
    }
]

### Para Fixar

1- Modifique o código da nossa rota para que ela receba um terceiro parâmetro através de query string com o atributo minPrice e modifique o filter para trazer apenas os receitas onde o valor da receita seja maior ou igual ao o valor enviado como parâmetro, mantendo os filtros anteriores.

2- Implemente uma rota /drinks/search que permita pesquisar pelo atributo name usando query string.
Nosso próximo passo é entender como conseguir receber informações uma forma segura quando precisamos persistir informações, ou seja, quando precisarmos salvar dados do lado do back-end. Não será usado query string e sim o body da requisição.