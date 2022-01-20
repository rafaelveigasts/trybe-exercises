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