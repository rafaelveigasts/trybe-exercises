## Recebendo dados no body da requisição.

Toda requisição HTTP, possui um cabeçalho e um corpo, como foi mencionado anteriormente. Mas o que isso significa na prática?

Acabamos de ver que é possível receber dados da URL, via query string, porém vamos imaginar que precisamos salvar dados sensíveis como uma senha, número de algum documento importante. Se enviarmos isso na URL qualquer pessoa que conseguir espiar o tráfego de rede entre o cliente e o servidor vai ter acesso a essas informações. Uma forma que o protocolo HTTP encontrou para resolver isso foi criando o tráfego através do corpo da requisição, praticamente o que acontece é uma compressão dos dados enviados que só serão descomprimidos do lado do back-end. Isso além de não deixar as informações trafegadas tão expostas acaba deixando a requisição um pouco mais rápida já que ocorre um processo de serialização dos dados enviados. Porém aqui cabe um detalhe, geralmente para enviar dados no body da requisição você precisa usar algum tipo específico de requisição, como por exemplo, utilizando o verbo HTTP POST . Até então só vimos exemplos de rotas mapeadas para o verbo GET , Vamos ver como fica agora para esse novo verbo.

Antes disso, precisamos fazer uma pequena etapa que é instalar o pacote bodyParser . Como explicamos, os dados enviados pelo front-end são comprimidos, e para que conseguimos remontar os dados enviados precisamos parsear as informações para um formato compreensível para o back-end, esse formato no caso vai ser JSON. Para instalar esse pacote execute o comando:

npm i body-parser

Agora no arquivo index.js , faça a modificação abaixo:

// const express = require('express');
const bodyParser = require('body-parser');

// const app = express();
app.use(bodyParser.json());

// ...

Agora vamos implementar nossa rota que vai receber dados no body da requisição.

// ...
app.post('/recipes', function (req, res) {
  const { id, name, price } = req.body;
  recipes.push({ id, name, price});
  res.status(201).json({ message: 'Recipe created successfully!'});
});

Perceba, que repetimos a rota /recipes , só que agora usando o método .post . No Express, é possível ter rotas com o mesmo caminho desde que o método (ou verbo) HTTP utilizado seja diferente, na outra rota definimos o que acontece para o método GET . Por falar nisso, fica a pergunta, como vamos conseguir fazer requisições já que por padrão as requisições que fazemos ou no navegador ou no fetch api são do tipo GET ?

Vamos começar pelo fetch-api , usando o código abaixo.

fetch('http://localhost:3001/drinks', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    id: drinks.length + 1,
    name: 'Caipirinha',
    price: 50,
  }),
})

Diferente do que fizemos para fazer uma requisição do tipo GET , dessa vez passamos um segundo parâmetro que é um objeto formado pelos atributos method , headers , body . Vamos entender o que é cada um.

method : Método HTTP utilizado, como vimos no primeiro bloco temos 4 que são mais utilizados (GET, POST, PUT e DELETE).

headers : Define algumas informações sobre a requisição como o atributo Accept que diz qual o tipo de dado esperado como resposta dessa requisição e o Content-Type que sinaliza que no corpo da requisição está sendo enviado um JSON.

body : É o corpo da requisição. Como no HTTP só é possível trafegar texto, é necessário transformar o objeto JavaScript que quermos enviar para uma string JSON. Por isso que do lado do nosso back-end precisamos utilizar o bodyParser para transformar as informações que foram trafegadas como string JSON, de volta para um objeto JavaScript.

Nos campos id e preco usamos := enquanto em nome colocamos apensas = . Fazemos isso, pois o operador = envia os dados como string, enquanto com := o dado é enviado como número.

⚠️ Observação: Como estamos trabalhando com a lista de receitas através de uma array, sempre que nossa aplicação é reiniciada, a array volta ao formato original, com os 3 objetos que definimos direto no código. Portanto, caso as receitas que você cadastrou sumam repentinamente da listagem, provavelmente foi por essa causa, os dados estão apenas armazenados em memória.
Vamos voltar para nosso código para entender a implementação.

// ...

app.post('/recipes', function (req, res) {
    const { id, name, price } = req.body;
    recipes.push({ id, name, price});
    res.status(201).json({ message: 'Recipe created successfully!'});
});

// ...

Na primeira linha desestruturamos os atributos id , price e preco do objeto req.body para na segunda linha usarmos esses valores para inserir um novo objeto dentro da array receitas . Na terceira e última linha retornamos uma resposta com o status 201, que serve para sinalizar que ocorreu uma operação de persistência de uma informação e um json com o atributo message . Pronto, temos uma rota que permite cadastrar novos receitas na nossa array.

### E o headers?

Assim como podemos enviar informações no body da requisição, também é possível enviar informações no header da mesma. Vamos imaginar que precisamos ter uma rota que recebe um token para ser validado, a regra da validação é checar se o token possui 16 caracteres.

// ...

app.get('/validateToken', function (req, res) {
  const token = req.headers.authorization;
  if (token.length !== 16) return res.status(401).json({message: 'Invalid Token!'})';

  res.status(200).json({message: 'Valid Token!'})'
});

// ...

Para fazer uma request enviando informações no headers, utilizando o HTTPie podemos usar o seguinte comando:

http :3001/validateToken Authorization:abc # vai devolver token inválido

http :3001/validateToken Authorization:S6xEzQUTypw4aj5A # vai devolver token válido

Diferente de informações enviadas no corpo da requisição que usavam = ou := para determinar o valor de um atributo, definimos atributos do headers usando : , passamos a chave Authorization que é uma chave bem comum de se utilizar nesse tipo de autenticação. No conteúdo de amanhã teremos exemplos mais práticos sobre o uso de headers. Por enquanto é mais uma forma de enviar dados para nossa API.

Veja o vídeo abaixo que consolida parte do nosso aprendizado até aqui ou se preferir avançe para a próxima seção.

### Para Fixar

1- Crie uma rota POST /drinks que permita adicionar novas bebidas através da nossa API.

2- Modifique o código acima da rota POST /recipes para que receba e salve a receita com o atributo waitTime .

Com isso, já temos metade de um CRUD implementado. 

Já conseguimos Criar (Create) e Ler (Read) dados através da nossa API, por mais que seja de uma forma mais simples, lendo e salvando em uma array, isso já é o suficiente para termos uma primeira noção de como funciona algumas coisas do Express e para que serve alguns verbos HTTP, além de revisar algumas funções que aprendemos lá no bloco sobre HOFs.

Para finalizar o dia vamos entender como Atualizar (Update) e Remover(Delete) dados através da nossa API, além de lidar com rotas não mapeadas.

