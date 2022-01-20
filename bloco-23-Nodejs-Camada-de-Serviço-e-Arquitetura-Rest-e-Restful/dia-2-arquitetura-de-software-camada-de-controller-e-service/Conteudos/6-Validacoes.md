## Validações

### Inserindo validações na aplicações

Agora temos uma aplicação na qual as regras de negócio dizem respeito todas ao formato dos campos na entidade Author. Por exemplo: "Nome deve ser uma string e não pode ser vazio". No entanto, para ilustrar melhor o tipo de regra de negócio que costuma ser tratada pelo service, vamos introduzir uma nova regra: "Uma pessoa autora com mesmo nome completo não pode ser cadastrado duas vezes."

Essa é uma regra mais complexa, que exige mais lógica do que um simples if para ser validada. Sendo assim, é o tipo de regra que se encaixa perfeitamente no service que vamos criar agora!

Crie a pasta services e dentro dela o arquivo Author.js , adicione o código abaixo no arquivo:

const Author = require('../models/Author');

const create = async (firstName, middleName, lastName) =>
  Author.create(firstName, middleName, lastName);

const findById = async (id) => Author.findById(id);

const createAuthor = async (firstName, middleName, lastName) =>
  Author.createAuthor(firstName, middleName, lastName);

module.exports = {
  getAll,
  findById,
  createAuthor,
};

Até agora, nosso service realiza todas as três operações que o model também realiza, sem nenhuma lógica adicional. Repare como, em cada função, nós apenas retornamos uma chamada para aquela mesma função dentro do model. Chegou a hora de mudar isso!

Vamos começar a refatoração pelo método Create . Antes de tudo, vamos precisar de uma função no nosso model que nos permita buscar autores pelos três nomes. Isso vai permitir a implementação da regra "Uma pessoa autora com mesmo nome completo não pode ser cadastrado duas vezes."

Altere o arquivo hello-msc/models/Author.js da seguinte maneira:

// hello-msc/models/Author.js

/* ... */

//  const createAuthor = async (firstName, middleName, lastName) => {
//    const [author] = await connection.execute(
//      'INSERT INTO model_example.authors (first_name, middle_name, last_name) VALUES (?, ?, ?)',
//      [firstName, middleName, lastName]
//    );
//    return getNewAuthor({ id: author.insertId, firstName, middleName, lastName });
//  }

const findByName = async (firstName, middleName, lastName) => {
  // Determinamos se devemos buscar com ou sem o nome do meio
  let query = 'SELECT id, first_name, middle_name, last_name ' +
              'FROM model_example.authors ';
    if (middleName) {
      query += 'WHERE first_name = ? AND middle_name = ? AND last_name = ?';
    } else {
      query += 'WHERE first_name = ? AND last_name = ?';
    }

  const params = middleName ? [firstName, middleName, lastName] : [firstName, lastName];

  // Executamos a consulta e retornamos o resultado
  const [authorData] = await connection.execute(query, params);

  // Caso nenhum author seja encontrado, devolvemos null
  if (authorData.length === 0) return null;

  // Caso contrário, retornamos o author encontrado
  return serialize(authorData);
};

// module.exports = {
//   getAll,
//   findById,
//   isValid,
//   create,
    findByName
// };

Com essa função pronta, precisamos modificar o service para que ele a utilize e aplique nossa regra de negócio. Modifique o arquivo services/Author.js da seguinte forma:

// const Author = require('../models/Author');

// const getAll = async () => Author.getAll();

// const findById = async (id) => Author.findById(id);

const createAuthor = async (firstName, middleName, lastName) => {
  // Buscamos um autor com o mesmo nome completo que desejamos criar
  const existingAuthor = await Author.findByName(firstName, middleName, lastName);

  // Caso essa pessoa autora já exista, retornamos um objeto de erro informando
  // que não é possível criar a pessoa autora pois ele já existe
  if (existingAuthor) {
    return {
      error: {
        code: 'alreadyExists',
        message: 'Uma pessoa autora já existe com esse nome completo',
      },
    };
  }

  // Caso a pessoa autora não exista e, portanto, possa ser criado
  // chamamos o model e retornamos o resultado
  return Author.createAuthor(firstName, middleName, lastName);
};

// const findById = async (id) => Author.findById(id);

// const getAll = async () => Author.getAll();

// module.exports = {
//   getAll,
//   findById,
//   createAuthor,
// };


Agora, nosso service implementa a regra de negócio mais complexa que temos. Isso até poderia acontecer no model mas, com o tempo, o model começaria a acumular várias funções, indo desde validar dados e regras de negócio até montar queries complexas e comunicar com o banco. Deixando as duas coisas em camadas separadas é como se tanto model quanto service tivessem "espaço para crescer" sem ficarem "apertados".

Existe ainda uma outra regra que é responsabilidade do service e que, até o momento, tem ficado no middleware: identificar e gerar erros.

Mas pera lá ... Gerar erros ? A ideia não é evitá-los?

Bom, de um certo ponto de vista, sim. 😅

Devemos codificar nossas aplicações de forma que erros não previstos sejam evitados ou contornados. No entanto, existem erros que derivam de regras de negócio que não foram atendidas. Vamos chamar esses erros de Erros de domínio . Numa aplicação em camadas, eles servem principalmente para que camadas inferiores possam informar camadas superiores sobre erros ou falhas que, por sua vez, devem ser retornadas a quem fez a chamada.

No nosso caso, temos um exemplo de erro de domínio, com o código alreadyExists . O service retorna esse objeto de erro para que o controller saiba que ocorreu um erro e que a pessoa autora *não foi criada com sucesso*. Com esse objeto de erro, o controller saberá também que não deve enviar código 200 na resposta da requisição. Outro tipo de situação conhecida que deve ser notificada pelo service é quando um item buscado não é encontrado. Note, na linha 23 do index.js , que quem faz esse tratamento até agora é o middleware . Vamos mudar isso!

Altere o arquivo services/Author.js

Agora sim, nosso service está comunicando ao controller toda vez que algum erro de domínio acontece. A seguir, vamos ver como esse erro é recebido e tratado pelo controller.

Crie a pasta controllers e, dentro dela, o arquivo Author.js . Nesse arquivo, vamos implementar lógica para realizar todas as operações que nossa aplicação realiza até agora, começando por buscar todos os autores:

Repare que o código aqui é precisamente o mesmo que passamos ao registrar o endpoint GET /authors no index.js , e essa é a grande jogada!

A camada de controllers é responsável por receber e tratar as requests, e, no express, é composta majoritariamente de middlewares. Sendo assim, para construir nosso controller, só precisamos trazer os middlewares do index.js para o controller, alterando-os para que utilizem o service ao invés do model. Parece bastante coisa? Não se preocupe, vamos fazer middleware a middleware.

Já trouxemos o endpoint GET /authors , então vamos para o próximo: GET /authors/:id :

// hello-msc/controllers/Author.js

// const Author = require('../services/Author');

// const getAll = async (req, res) => {
//   const authors = await Author.getAll();

//   return res.status(200).json(authors);
// });

const findById = async (req, res, next) => {
  // Extraímos o id da request
  const { id } = req.params;

  // Pedimos para o service buscar o autor
  const author = await Author.findById(id);

  // Caso o service retorne um erro, interrompemos o processamento
  // e inicializamos o fluxo de erro
  if (author.error) return next(author.error);

  // Caso não haja nenhum erro, retornamos o author encontrado
  return res.status(200).json(author);
};

// module.exports = {
//   getAll,
    findById,
// };

Repare que o controller verifica se existe um erro e, se existir, chama next(author.error) . Isso faz com que esse objeto de erro vá parar no próximo middleware de erro registrado. Isso quer dizer que podemos utilizar um middleware de erro centralizado também para nossos erros de domínio. Vamos ver como fazer isso logo mais. Por hora, vamos trazer a terceira e última função: a criação de uma nova pessoa autora. Aqui veremos mais uma funcionalidade do controller em ação: a validação dos dados da request.

Você pode estar se perguntando "Ué, mas por que não validar no model?". O fato é que a validação no model pode trazer algumas dificuldades à medida que nossa aplicação escala, por exemplo:

Nem sempre queremos validar os mesmos campos (uma request de edição pode pedir dados diferentes de uma request de criação, por exemplo);

Estamos delegando mais uma responsabilidade para o model: além de se comunicar com o banco, ele também faz validação de requests

Ao validar no model, estamos validando os dados no final da request, ou seja, na saída . Ao validar no controller, estamos validando esses dados na entrada , garantindo que não vamos realizar nenhum processamento desnecessário utilizando dados que não são válidos, e que os dados vão trafegar limpinhos por todas as camadas da aplicação.

Um ponto que talvez você tenha notado é que nosso service possui um método getAll que não faz nenhuma validação ou geração de erro, apenas realiza a chamada do model e envia essa resposta para a controller . Provavelmente você deve estar se perguntando "Por que fazer isso, sendo que podemos chamar o método da getAll da camada model na camada controller e resolver o problema com um passo a menos?". Isso é verdade, porém, além de estarmos violando o modelo de arquitetura, imagine que agora, somente é possível buscar todas as pessoas autoras se o request for feito por uma pessoa administradora. Nesse caso, precisaríamos criar o método getAll na service , criar a regra lá dentro assim como aprendemos. Se nosso método já está implementado, igual em nossos exemplos acima, apenas precisamos inserir as verificações, poupando o passo de criação 😀.

Voltando um pouco a falar sobre geração de erros e validações, existe uma biblioteca muito legal que irá facilitar nossas vidas: o Joi. Dá uma olhada:

Primeiro, vamos instalar o joi . Execute no terminal:

npm i joi

Agora, vamos adicioná-lo ao controller:

// hello-mvc/controllers/Author.js

const Joi = require('joi');

/* ... */

// const findById = async (req, res, next) => { /* ... */ }

const createAuthor = async (req, res, next) => {
  const { firstName, middleName, lastName } = req.body;
  // Utilizamos o Joi para descrever o objeto que esperamos
  // receber na requisição. Para isso, chamamos Joi.object()
  // passando um objeto com os campos da requisição e suas descrições
  const { error } = Joi.object({
    // Deve ser uma string (.string()) não vazia (.not().empty()) e é obrigatório (.required())
    firstName: Joi.string().not().empty().required(),
    // Deve ser uma string não vazia e é obrigatório
    lastName: Joi.string().not().empty().required(),
  })
    // Por fim, pedimos que o Joi verifique se o corpo da requisição se adequa a essas regras
    .validate({ firstName, lastName });

  // Caso exista algum problema com a validação, iniciamos o fluxo de erro e interrompemos o middleware.
  if (error) {
    return next(error);
  }

  // Caso não haja erro de validação, prosseguimos com a criação do usuário
  const newAuthor = await Author.createAuthor(firstName, middleName, lastName);

  // Caso haja erro na criação da pessoa autora, iniciamos o fluxo de erro
  if (newAuthor.error) return next(newAuthor.error);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // da nova pessoa autora
  return res.status(201).json(newAuthor);
};

// const findById = rescue(async (req, res, next) => { /* ... */ }

/* ... */

// module.exports = {
//   getAll,
//   findById,
    createAuthor,
// };

