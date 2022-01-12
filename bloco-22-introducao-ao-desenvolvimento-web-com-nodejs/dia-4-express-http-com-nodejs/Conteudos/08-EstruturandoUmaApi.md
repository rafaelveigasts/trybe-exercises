## Estruturando uma API

Para entendermos na prática como utilizar o Express e o seu sistema de rotas para criar uma API funcional, vamos partir do seguinte cenário: Temos uma aplicação que permite gerenciar uma lista de receitas disponíveis, com seus respectivos nomes, preço e tempo médio de preparo. Essa aplicação é uma API que implementa CRUD, ou seja, um conjunto de endpoints que permite listar, pesquisar, cadastrar, editar e remover os itens dessa lista de receitas. Até o final do dia, vamos implementar uma API que permite fazer todas essas operações.

Vamos começar implementando o endpoint que retorna a lista de receitas na rota /recipes quando a requisição for do tipo GET . A lista de receitas virá de uma array que vamos definir no código. Siga o exemplo abaixo:

/* index.js */
const express = require('express');
const app = express();

const recipes = [
  { id: 1, name: 'Lasanha', price: 40.0, waitTime: 30 },
  { id: 2, name: 'Macarrão a Bolonhesa', price: 35.0, waitTime: 25 },
  { id: 3, name: 'Macarrão com molho branco', price: 35.0, waitTime: 25 },
];

app.get('/recipes', function (req, res) {
  res.json(recipes);
});

app.listen(3001, () => {
  console.log('Aplicação ouvindo na porta 3001');
});

Agora, deixamos de usar o método .send para usar o método .json . O método .send é um método que consegue retornar a resposta de uma requisição de uma forma genérica, adaptando o tipo do retorno ao que vai ser retornado. Mas para deixar mais evidente que o que vamos devolver é um JSON usamos o método .json .

Para testar nossa aplicação, podemos fazer uma requisição usando o próprio navegador, colocando a URL http://localhost:3001/recipes . Porém como nem todo tipo de requisição HTTP pode ser feita diretamente pelo navegador, é recomendado utilizar algum cliente HTTP. Os mais famosos são o Postman https://www.postman.com/ e o Insomnia https://insomnia.rest/.

Existe uma terceira possibilidade: usar um comando chamado httpie https://httpie.io/ que permite fazer uma requisição direto pelo terminal. Para instalar esse comando siga as instruções da documentação https://httpie.io/docs#installation .

Uma vez instalado, execute o comando abaixo:

http :3001/recipes

Observe que não é preciso colocar a URL completa, já que o HTTPie assume que as requisições são feitas para localhost por padrão. Após rodar o comando você deve conferir que ele vai retornar uma resposta como mostrado abaixo.

HTTP/1.1 200 OK
Connection: keep-alive
Content-Length: 205
Content-Type: application/json; charset=utf-8
Date: Fri, 20 Aug 2021 22:06:58 GMT
ETag: W/"cd-wMzyMLQRx8RrJ9Bl5KB9X7VuhcA"
Keep-Alive: timeout=5
X-Powered-By: Express

[
    {
        "id": 1,
        "name": "Lasanha",
        "price": 40,
        "waitTime": 30
    },
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

Ok! Mas o que isso significa de fato? Esse JSON que foi retornado pode ser utilizado por uma aplicação front-end para renderizar essa lista no navegador utilizando o método fetch, que foi utilizado bastante nos nossos exercícios e projetos desde o módulo de fundamentos e principalmente nos projetos de front-end. A diferença é que agora a requisição vai ser feita para uma API que você mesmo desenvolveu e que roda na sua máquina. A estrutura básica de uma requisição utilizando o fetch pode ser escrita da seguinte forma:

fetch('http://localhost:3001/recipes')
    .then(resp => resp.json())

Para dar mais visibilidade, imagine um componente React que precisa exibir essa lista. Ele ficaria mais ou menos assim:

class receitasList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    fetch('http://localhost:3001/recipes')
      .then(response => response.json())
      .then((recipes) => this.setState(
        {
          recipes,
          isLoading: false,
        },
      ));
  }

  render() {
    const { recipes, isLoading } = this.state;

    return (
      <div>
        <div>
          {isLoading && <Loading />}
          <div className='card-group'>
            {recipes.map((recipe) => (
              <div key={recipe.id}>
                <h1>{recipe.name}</h1>
                <span>Preço: {recipe.price}</span>
                <span>Tempo de preparo: {recipe.waitTime}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

⚠️ Observação: Para uma aplicação back-end receber requisições de uma aplicação front-end, ou qualquer outra aplicação, é preciso instalar um módulo que libera o acesso da nossa API para outras aplicações. *Para isso basta instalar um módulo chamado cors usando npm i cors e adicionar as seguintes linhas no seu arquivo index.js* .

// const express = require('express');
// const app = express();
const cors = require('cors');

app.use(cors());

Vamos falar um pouco mais sobre esse módulo no conteúdo de amanhã, mas caso deseje testar integração entre front-end e back-end é necessário fazer esse ajuste no código da API.


### Para Fixar

1) Crie uma array drinks com os seguintes objetos dentro dela e uma rota GET /drinks que retorna a lista de bebidas.

 const drinks = [
    { id: 1, name: 'Refrigerante Lata', price: 5.0 },
    { id: 2, name: 'Refrigerante 600ml', price: 8.0 },
    { id: 3, name: 'Suco 300ml', price: 4.0 },
    { id: 4, name: 'Suco 1l', price: 10.0 },
    { id: 5, name: 'Cerveja Lata', price: 4.5 },
    { id: 6, name: 'Água Mineral 500 ml', price: 5.0 },
];

2) Modifique tanto a rota de bebidas como de receitas para retornar a lista ordenada pelo nome em ordem alfabética.

Pronto, já temos uma rota da nossa API que devolve a lista dos receitas disponíveis, mas não precisamos parar por aqui. E se quiséssemos conseguir acessar uma receita específica pelo seu id ? ou mesmo procurar por todas os receitas que tem a palavra Macarrão no nome? Além disso, como fazemos para permitir adicionar, editar ou remover receitas da lista através da nossa API?

Tudo isso é o que vamos ver daqui em diante.
