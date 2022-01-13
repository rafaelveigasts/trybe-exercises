## Atualizando e deletando objetos através da API

Além dos métodos GET E POST , o HTTP também possui os métodos PUT e DELETE que são convencionalmente utilizados para rotas que, respectivamente, editam e removem objetos. O Express tem métodos específicos para definir rotas para esses dois verbos. Vamos começar dando um exemplo do uso do PUT .

// ...

app.put('/recipes/:id', function (req, res) {
  const { id } = req.params;
  const { name, price } = req.body;
  const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipeIndex === -1) return res.status(404).json({ message: 'Recipe not found!' });

  recipes[recipeIndex] = { ...recipes[recipeIndex], name, price };

  res.status(204).end();
});
// ...

Observe que definimos uma rota que recebe o id como parâmetro de rota, e os campos nome e preço através do body da requisição. É um padrão sempre mandar o id como parâmetro de rota e os atributos que vão ser alterados, no body, pois é uma boa prática do RESTful, conteúdo que vamos ver mais a frente. Depois apenas usamos o método find para encontrar a receita correspondente ao id, e atualizamos os atributos para os valores recebidos. Por fim, devolvemos uma resposta HTTP com o status 204, que serve para indicar que algo foi atualizado e utilizamos o método .end() que indica que a resposta vai ser retornada sem retornar nenhuma informação

Vamos fazer essa requisição usando o HTTPie.

http PUT :3001/recipes/2 name='Macarrão ao alho e óleo' price:=40 # execute apenas essa linha!
> HTTP/1.1 204 No Content
> Connection: keep-alive
> Date: Fri, 20 Aug 2021 22:19:35 GMT
> ETag: W/"25-ySvLeHwVHESCh2r//vitH6caTaI"
> Keep-Alive: timeout=5
> X-Powered-By: Express

Como utilizamos o .end() no nosso callback da rota PUT /recipes/:id não retornamos nada, apenas o status 204, que indica que a requisição foi completada com sucesso.
Agora é a vez de implementarmos uma rota que permita remover receitas da nossa lista. Para isso vamos criar uma rota para requisições do tipo DELETE no caminho /recipes/:id .

//...

app.delete('/recipes/:id', function (req, res) {
  const { id } = req.params;
  const recipeIndex = recipes.findIndex((r) => r.id === parseInt(id));

  if (recipeIndex === -1) return res.status(404).json({ message: 'Recipe not found!' });

  recipes.splice(recipeIndex, 1);

  res.status(204).end();
});

//...

Note que novamente utilizamos o id como parâmetro de rota. Essa é uma convenção que como vimos, serve para sempre que precisamos trabalhar com id seja para pesquisar, editar e remover objetos através da nossa API. É possível fazer a mesma coisa enviando o id como query string ou no body da requisição, mas usar parâmetro de rota acaba sendo a forma mais simples de mandar esse tipo de dado entre todas as opções disponíveis.

Vamos fazer uma requisição usando o HTTPie novamente.

http DELETE :3001/recipes/3 # execute apenas essa linha!
> HTTP/1.1 204 No Content
> Connection: keep-alive
> Date: Fri, 20 Aug 2021 22:25:44 GMT
> ETag: W/"23-nD7qnlOhswfi0qOrye68khRdynU"
> Keep-Alive: timeout=5
> X-Powered-By: Express

// Requisição do tipo PUT
fetch(`http://localhost:3001/recipes/2`, {
  method: 'PUT',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'Macarrão ao alho e óleo',
    price: 40
  })
});

// Requisição do tipo DELETE
fetch(`http://localhost:3001/recipes/4`, {
  method: 'DELETE',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
});

### Para Fixar

1) Crie uma rota PUT /drinks/:id que permita editar os atributos de uma bebida.
2) Crie uma rota DELETE /drinks/:id que permita remover uma bebida.


### O que acontece se fizermos uma requisição para uma rota que não existe?

Se tentarmos fazer uma requisição para uma rota que não mapeamos na noss API, você vai observar que o Express retorna a seguinte resposta.

http GET :3001/xablau
> <!DOCTYPE html>
> <html lang="en">
> <head>
> <meta charset="utf-8">
> <title>Error</title>
> </head>
> <body>
> <pre>Cannot GET /xablau</pre>
> </body>
> </html>

Porém essa não é uma forma muito compreensível de entender que essa rota /xablau não foi mapeada. Para retornar uma resposta mais amigável podemos usar o método app.all da seguinte forma:

//...
app.all('*', function (req, res) {
    return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
});

app.listen(3001);

Agora se tentarmos acessar uma requisição para uma rota não mapeada vamos ter a seguinte resposta.

{
    "message": "Rota '/xablau' não existe!"
}

O método app.all serve para mapear uma rota que pode ser de qualquer verbo HTTP e o valor * é um wildcard , ou seja um expressão coringa que indica que indepedente da rota que chegar aqui ele vai capturar e executar a callback que por sua vez retorna uma resposta com status 404 .

⚠️ Cuidado: Essa definição de rota generalista com app.all('*') deve ser sempre a última definição de rota da nossa API. Caso o contrário algumas requisições podem cair antes neste callback e não executar o callback para a rota específica. Para exemplificar vamos definir um callback para responder a rota /xablau .

//...
app.all('*', function (req, res) {
    return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
});

// nunca vai chegar nessa rota!
app.get('/xablau', function (req, res) {
    return res.status(404).json({ message: `Xablau!`});
});

app.listen(3001);

Se você fizer a requisição com o código acima vai ver que o Express vai continuar a trazer a mesma resposta "Rota '/xablau' não existe!" . Agora inverta as duas definições de rotas de lugar e observe que a resposta retornada passa a ser a correta.

//...

// agora vai chegar nessa rota!
app.get('/xablau', function (req, res) {
    return res.status(404).json({ message: `Xablau!`});
});

app.all('*', function (req, res) {
    return res.status(404).json({ message: `Rota '${req.path}' não existe!`});
});

app.listen(3001);

http :3001/xablau
> {
>     "message": "Rota '/rota' não existe!"
> }