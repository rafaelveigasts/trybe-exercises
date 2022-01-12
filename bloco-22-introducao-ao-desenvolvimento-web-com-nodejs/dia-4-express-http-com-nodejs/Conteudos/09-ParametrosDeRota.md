## Parâmetros de rota

No caso em que precisamos acessar objetos específicos, o express tem alguns recursos para que conseguimos passar informações além da rota que desejamos buscar. Vamos começar falando de parâmetro de rotas.

Você provavelmente já se deparou com URLs no seguinte formato http://<site>/noticias/489 ou http://<site>/pedidos/713 . Esses valores que são passados nas rotas que geralmente devolvem uma página seguindo o mesmo template mas com um conteúdo diferente é implementado graças ao parâmetro de rota. Imagina se para cada nova notícia ou pedido você tivesse que criar uma rota específica exatamente com /noticias/489 ou /pedidos/713 ? o trabalho das pessoas desenvolvedoras seria passar o dia inteiro escrevendo rotas. Para facilitar esse processo, utilizamos parâmetros de rota, que no Express, podem ser definidos da seguinte forma: /<rota>/<:parametro> onde :parametro vai servir para qualquer valor que vier na URL com aquele prefixo específico.

No caso da nossa API de receitas podemos montar uma rota que recebe o id como um parâmetro de rota da seguinte forma:

// const express = require('express');
// const app = express();
//
// const recipes = [
//   { id: 1, name: 'Lasanha', price: 40.0, waitTime: 30 },
//   { id: 2, name: 'Macarrão a Bolonhesa', price: 35.0, waitTime: 25 },
//   { id: 3, name: 'Macarrão com molho branco', price: 35.0, waitTime: 25 },
// ];
//
// app.get('/recipes', function (req, res) {
//  res.json(recipes);
// });

app.get('/recipes/:id', function (req, res) {
  const { id } = req.params;
  const recipe = recipes.find((r) => r.id === parseInt(id));

  if (!recipe) return res.status(404).json({ message: 'Recipe not found!'});

  res.status(200).json(recipe);
});

// app.listen(3001, () => {
//   console.log('Aplicação ouvindo na porta 3001');
// });

No código acima, o que fizemos foi adicionar uma rota /recipes/:id , ou seja qualquer rota que chegar nesse formato, independente do id ser um número ou string vai cair nessa segunda rota, em vez de cair na rota /recipes que definimos no tópico anterior. Para acessar o valor do parâmetro enviado na URL fizemos a desestruturação do atributo id do objeto req.params . Começamos a entender que o objeto req traz informações a respeito da requisição. É importante que o nome do parâmetro nomeado na rota seja igual ao atributo que você está desestruturando. Por exemplo, se na definição da rota estivesse escrito /recipes/:nome teríamos que usar const { nome } = req.params .

Na sequência usamos uma função que conhecemos lá no nosso bloco 8 sobre HOF, que é o find. Vamos usar bastante daqui em diante várias HOF, então caso você tenha esquecido ou ainda tenha dúvidas sobre o uso delas, recomendamos fortemente que você revisite o conteúdo do bloco 8 para dar uma revisada sobre o uso dessas funções.
Implementamos uma busca na array receitas para encontrar a receita onde o id é igual ao valor que recebemos como parâmetro, tendo o cuidado de converter o valor para inteiro, já que por padrão todo parâmetro de rota é uma string. No final, apenas retornamos o objeto receita que corresponde a receita encontrada.

Esse código não está tratando possíveis cenários de erro como por exemplo se o id que chegar na rota for formado por letras. Como nosso foco por enquanto é entendermos como montar a API, vamos falar desses possíveis tratamentos de erros em um momento mais a frente.

⚠️ Atenção: Perceba que na linha com o if colocamos um return . Isso serve para indicar para o express que ele deve quebrar o fluxo e não executar a linha res.status(200).json(recipe); . Caso você não coloque o return , sua requisição vai funcionar mas você vai ver um erro como este abaixo no log do seu terminal:

Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client

Esse erro significa que o Express entendeu que você está tentando retornar duas respostas para o cliente. Por isso é preciso ter cuidado para sempre que existir uma condição que pode quebrar o fluxo principal colocar um return antes do res.json para não ter esse problema. Este é um erro bem comum para quem está começando a utilizar Express, então caso tenha esse problema, você já sabe o que fazer a partir de agora.

Faça uma requisição para esse endpoint passando um id qualquer.

http :3001/recipes/1

O retorno da nossa requisição será algo parecido com o seguinte conteúdo:

{
    "id": 1,
    "name": "Lasanha",
    "price": 40,
    "waitTime": 30
}

Se passarmos um id que não existe nosso retorno vai ser diferente.

http :3001/recipes/777
> { message: 'Recipe not found!'}

### Para Fixar

Crie uma rota GET /drink/:id para retornar uma bebida pelo id .
Entendemos como utilizar parâmetro de rota, mas imagine o cenário em que você quer pesquisar as receitas pelo nome, e eventualmente além de pesquisar pelo nome, ao mesmo tempo para pegar os receitas que sejam no máximo 30 reais. Poderíamos até utilizar o parâmetro de rotas para isso, mas teríamos rotas um pouco mais difíceis de usar pois precisaríamos nos preocupar com a ordem que os parâmetros são organizados e isso diminui a legibilidade das rotas da nossa API. Para isso, existe uma segunda forma de enviar parâmetros através de uma URL, essa forma é conhecida como query string .