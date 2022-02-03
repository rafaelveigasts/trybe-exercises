Exercícios
Exercício 1
Crie um endpoint POST /login
O endpoint deve receber os seguintes dados no corpo da requisição:

{
  "username": "someUsername",
  "password": "somePassword"
}
Caso username e password sejam válidos, retorne um token que atenda às seguintes especificações:
Expira em uma hora;
Contém, no payload, o nome de usuário informado na request;
Contém, no payload, uma propriedade admin , com o valor false .
Para retornar o token, utilize o seguinte formato no corpo da resposta:

{
  "token": "<JWT aqui>"
}
Para que username seja válido, seu valor precisa ser uma string alfanumérica de, pelo menos, 5 caracteres.
Para que password seja válido, seu valor precisa ser uma string de, pelo menos, 5 caracteres.
Resolução
Primeiro, precisamos criar um novo controller na pasta controllers . Crie o arquivo controllers/login.js :

// controllers/login.js
module.exports = async (req, res, next) => {
  //
}
O próximo passo é utilizamos o Joi para validar a requisição:

// controllers/login.js
const Joi = require('joi');

const validateBody = (body) =>
  /* Utilizamos o Joi para validar o schema do body */
  Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(body);

module.exports = async (req, res, next) => {
  /* Construímos um schema do Joi */
  const { error } = validateBody(req.body);

  /* Caso ocorra erro na validação do Joi, passamos esse */
  /* erro para o express, que chamará nosso middleware de erro */
  if (error) return next(error);
};
Antes de prosseguir, precisamos instalar a biblioteca de JWT que vamos utilizar:

npm i jsonwebtoken
Agora, precisamos criar o token JWT:

// controllers/login.js
// const Joi = require('joi');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

//const validateBody = (body) =>
//  /* Utilizamos o Joi para validar o schema do body */
//  Joi.object({
//    username: Joi.string().min(5).alphanum().required(),
//    password: Joi.string().min(5).required(),
//  }).validate(body);

// module.exports = async (req, res, next) => {
//   const { error } = validateBody(req.body);
//   /* Caso ocorra erro na validação do Joi, passamos esse */
//   /* erro para o express, que chamará nosso middleware de erro */
//   if (error) return next(error);

  const payload = {
    username: req.body.username,
    admin: false,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  res.status(200).json({ token });
// };
Adicione a variável JWT_SECRET ao arquivo .env

# PORT=3000
JWT_SECRET=meuSegredoSuperSegreto
Adicione o controller de login ao arquivo controllers/index.js :

// controllers/index.js
// const ping = require('./ping');
const login = require('./login');

// module.exports = {
//   ping,
  login,
// };
Por último, registramos o endpoint no express:

// index.js

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');

// const { PORT } = process.env;

// const controllers = require('./controllers');
// const middlewares = require('./middlewares');

// const app = express();

// app.use(
//   cors({
//     origin: `http://localhost:${PORT}`,
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Authorization'],
//   })
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/ping', controllers.ping);
app.post('/login', controllers.login);
// app.use(middlewares.error);

// app.listen(PORT, () => {
//   console.log(`App listening on port ${PORT}`);
// });
Exercício 2
Altere o endpoint POST /login :
Caso username seja admin e password seja s3nh4S3gur4??? , a chave admin no payload do token gerado deve ter o valor true
Resolução
Precisamos adicionar uma condição especial para esse caso. Para isso, altere o arquivo controllers/login.js :

const Joi = require('joi');
// const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;
//const validateBody = (body) =>
//  /* Utilizamos o Joi para validar o schema do body */
//  Joi.object({
//    username: Joi.string().min(5).alphanum().required(),
//    password: Joi.string().min(5).required(),
//  }).validate(body);

// module.exports = async (req, res, next) => {
//   const { error } = validateBody(req.body);
//   /* Caso ocorra erro na validação do Joi, passamos esse */
//   /* erro para o express, que chamará nosso middleware de erro */
//   if (error) return next(error);

  /* Se o login for admin e a senha estiver incorreta */
  if (req.body.username === 'admin' && req.body.password !== 's3nh4S3gur4???') {
    /* Criamos um novo objeto de erro */
    const err = new Error('Invalid username or password');
    /* Adicionamos o status `401 Unauthorized` ao erro */
    err.statusCode = 401;
    /* Passmos o erro para o express, para que seja tratado pelo middleware de erro */
    return next(err);
  }

  /* Definimos admin como true se username e password estiverem corretos */
  const admin = req.body.username === 'admin' && req.body.password === 's3nh4S3gur4???';

//   const payload = {
//     username: req.body.username,
    /* Passamos a utilizar o valor da variável `admin` */
    /* para determinar o valor do campo `admin` no payload do token */
    admin,
//   };

//   const token = jwt.sign(payload, JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   res.status(200).json({ token });
// };
Exercício 3
Crie o endpoint /GET /users/me
O endpoint só pode ser acessado por pessoas autenticadas
Para realizar a autenticação, a requisição deve conter o header Authorization , cujo valor deve ser um token válido
Caso o token não exista, retorne o status 401 Unauthorized , com o seguinte corpo da resposta:

{
  "error": {
    "message": "Token not found"
  }
}
Caso aconteça um erro ao validar o token, retorne o status 401 Unauthorized com o seguinte conteúdo no corpo:

{
  "error": {
    "message": "<mensagem de erro da biblioteca>"
  }
}
Caso o token seja válido, retorne o status 200 OK e, no corpo da resposta, o nome de usuário ao qual aquele token pertence e o valor da propriedade admin , no seguinte formato:

{
  "username": "nome de usuario do token",
  "admin": true || false
}
Utilize um middleware exclusivo para a autenticação. Armazene-o no arquivo middlewares/auth.js
Resolução
Vamos começar pela criação do middleware de autenticação. Crie o arquivo middlewares/auth.js

// middlewares/auth.js
module.exports = (req, res, next) => {
  //
}
Agora, importamos o JWT e verificamos se o token foi enviado

// middlewares/auth.js
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

// module.exports = (req, res, next) => {
  /* Buscamos o token no header `Authorization` */
  const token = req.headers.authorization;

  /* Caso o token não exista */
  if (!token) {
    /* Criamos um novo objeto de erro */
    const err = new Error('Token not found');
    /* Damos o status 401 ao erro */
    err.statusCode = 401;
    /* Enviamos o erro para ser tratado pelo middleware de erro */
    return next(err);
  }
// }
Caso o token exista, precisamos verificar se ele é válido. Altere o arquivo middlewares/auth.js

// middlewares/auth.js
// const jwt = require('jsonwebtoken');

// const { JWT_SECRET } = process.env;

// module.exports = (req, res, next) => {
//   /* Buscamos o token no header `Authorization` */
//   const token = req.headers.authorization;

//   /* Caso o token não exista */
//   if (!token) {
//     /* Criamos um novo objeto de erro */
//     const err = new Error('Token not found');
//     /* Damos o status 401 ao erro */
//     err.statusCode = 401;
//     /* Enviamos o erro para ser tratado pelo middleware de erro */
//     return next(err);
//   }

  /* Realizamos uma tentativa de validar o token */
  try {
    /* Pedimos para que a bilioteca de JWT valide o token */
    const payload = jwt.verify(token, JWT_SECRET);

    /* Caso não ocorra nenhum erro, significa que o token é válido e podemos continuar */

    /* Armazenamos os dados da pessoa no objeto de request */
    req.user = payload

    return next()
  } catch (err) {
    /* Caso haja algum erro ao validar o token, adicionamos o status 401 a esse erro */
    err.statusCode = 401;
    /* E enviamos o erro para ser processador pelo middleware de erro. */
    return next(err);
  }
// };
Adicione o middleware de autenticação ao arquivo middlewares/index.js :

// middlewares/index.js

const auth = require('./auth');
// const error = require('./error');

// module.exports = {
  auth,
//   error,
// };
Middleware pronto, podemos seguir para o controller. Crie o arquivo controllers/me.js :

// controllers/me.js

module.exports = (req, res) => {
  /* Se chegamos até aqui, quer dizer que o middleware de autenticação */
  /* foi executado, e adicionou as informações do token no objeto `req`. */
  /* Podemos, então, extrair as propriedades que queremos de `req.user` */
  const { username, admin } = req.user;

  /* Por fim, retornamos as informações */
  res.status(200).json({ username, admin });
};
Adicione o novo controller ao arquivo controllers/index.js :

// controllers/index.js

const me = require('./me');
// const ping = require('./ping');
// const login = require('./login');

// module.exports = {
  me,
//   ping,
//   login,
// };
Por último, registramos o endpoint no arquivo index.js :

// index.js

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/ping', controllers.ping);
// app.post('/login', controllers.login);
app.get('/users/me', middlewares.auth, controllers.me);

// app.use(middlewares.error);
Exercício 4
Crie o endpoint /GET /top-secret
O endpoint só pode ser acessado por pessoas autenticadas.
Apenas tokens contendo, no payload, a propriedade admin com o valor true têm autorização para acessar esse endpoint.
Caso o token não exista, retorne o status 401 Unauthorized , com o seguinte corpo da resposta:

{
  "error": {
    "message": "Token not found"
  }
}
Caso aconteça um erro ao validar o token, retorne o status 401 Unauthorized com o seguinte conteúdo no corpo:

{
  "error": {
    "message": "<mensagem de erro da biblioteca>"
  }
}
Caso o token seja válido, mas a propriedade admin do payload não seja true , retorne o status 403 Forbidden e o seguinte JSON:

{
  "error": {
    "message": "Restricted access"
  }
}
Caso o token seja válido e o payload contenha admin com o valor true , retorne o seguinte JSON:

{
  "secretInfo": "Peter Parker é o Homem-Arannha"
}
Para validar se a pessoa é admin, crie um novo middleware no arquivo middlewares/admin.js .
Resolução
Começamos criando um middleware que verifica se o token informado é do admin. Crie o arquivo middlewares/admin.js :

// middlewares/admin.js

module.exports = (req, res, next) => {
  //
}
O middleware de admin deve ser executado após o middleware de autenticação. Sendo assim, vamos procurar por req.user para obter o valor da propriedade admin para aquela pessoa. Modifique o arquivo middlewares/admin.js :

// middlewares/admin.js

// module.exports = (req, res, next) => {
    const { user } = req;

    /* Caso `req.user` não exista */
    if (!user) {
      /* Criamos um objeto de erro */
      const err = new Error('This endpoint requires authentication');
      /* Atribuímos o status `401 Unauthorized` ao erro */
      err.statusCode = 401;
      /* E enviamos o erro para o middleware de erro */
      return next(err);
    }

    /* Caso o usuário não seja admin */
    if (!user.admin) {
      /* Criamos um novo erro com status `403 Forbidden` */
      const err = new Error('Restricted access');
      err.statusCode = 403;
      /* Enviamos o erro para ser processado no middleware de erros */
      return next(err);
    }

    /* Se nenhuma das condições acima forem verdadeiras, */
    /* a pessoa é admin e podemos continuar com a request */
    return next();
// }
Adicione o middleware admin ao arquivo middlewares/index.js :

// middleware/index.js

// const auth = require('./auth');
const admin = require('./admin');
// const error = require('./error');

// module.exports = {
//   auth,
     admin,
//   error,
// };
Agora, vamos ao controller. Crie o arquivo controllers/topSecret.js :

module.exports = (req, res) =>
  res.status(200).json({ secretInfo: 'Peter Parker é o Homem-Arannha' });
Adicione o novo controller ao arquivo controllers/index.js :

// const me = require('./me');
// const ping = require('./ping');
// const login = require('./login');
const topSecret = require('./topSecret');

// module.exports = {
//   me,
//   ping,
//   login,
     topSecret,
// };
Por fim, registre o novo endpoint no arquivo index.js :

// index.js

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/ping', controllers.ping);
// app.post('/login', controllers.login);
// app.get('/users/me', middlewares.auth, controllers.me);
app.get(
  '/top-secret',
  /* Middleware que valida o JWT e cria `req.user` */
  middlewares.auth,
  /* Middleware que verifica se a pessoa autenticada é admin */
  middlewares.admin,
  /* Controller do endpoint */
  controllers.topSecret
);

// app.use(middlewares.error);
Bônus
Exercício 1
Crie o endpoint POST /signup
O endpoint deve aceitar o seguinte JSON no corpo da requisição:

{
  "username": "MariaCecília_Souza92",
  "password": "%9!%ec0c5w,q%%h9n3k"
}
Para validar os campos, considere os mesmos critérios do endpoint POST /login ;
Caso username já exista, retorne o status 409 Conflict e o seguinte JSON:

{
   "error": { "message": "user already exists" }
}
Caso os campos sejam válidos, armazene os dados no arquivo models/data/users.json ;
Ao armazenar os dados recebidos, adicione a propriedade admin , que terá seu valor determinado da seguinte forma:
Obtenha um número aleatório de 1 a 100 com o seguinte trecho de código: Math.floor(Math.random() * 100) ;
Caso o número aleatório seja maior que 50 , admin deve ser true ;
Caso o número aleatório seja menor ou igual a 50 , admin deve ser false .
Após armazenar os novos dados, retorne um token que expire em uma hora e contenha username e admin no payload. Utilize o seguinte formato na resposta:

  {
    "token": "<token gerado aqui>"
  }
Resolução
Vamos começar criando um model para tratar da comunicação com o sistema de arquivos. Crie o arquivo models/User.js :

// models/User.js

const path = require('path');
const fs = require('fs').promises;

/* Utilizamos o módulo `path` para calcular o caminho até o arquivo `users.json` */
const DATA_PATH = path.join(__dirname, 'data', 'users.json');

/* Para obter todos os itens, lemos o arquivo `users.json, */
/* realizamos o parsing e retornamos o resultado */
const getAll = async () => fs.readFile(DATA_PATH, 'utf-8').then(JSON.parse);

/* Para alterar o arquivo `users.json`, recevemos um array, */
/* Convertemos o array em JSON e escrevemos o resultado no disco */
const writeAll = async (content) =>
  fs.writeFile(DATA_PATH, JSON.stringify(content));

/* Para encontrar um item, lemos todos os itens e utilizamos o método `find` do array */
const findOne = (username) =>
  getAll().then((users) => users.find((user) => user.username === username));

/* Para criar um novo registro */
const create = (username, password, admin) =>
  /* Buscamos todos os itens */
  getAll()
    .then((users) => {
      /* Adicionamos o item novo */
      users.push({ username, password, admin });
      return users;
    })
    /* Armazenamos o Array no disco */
    .then(writeAll);

module.exports = {
  getAll,
  findOne,
  create,
};
Crie também o arquivo models/data/users.json contendo um array vazio:

// models/data/users.json

[]
Agora, criamos um service para implementar as regras de negócio. Crie o arquivo services/User.js :

// services/User.js

const model = require('../models/User');

const create = async (username, password) => {
  /* A primeira coisa que precisamos fazer
  é verificar se o username informado já existe */
  const userExists = await model.findOne(username);

  /* Caso o username já exista */
  if (userExists) {
    /* Retornamos um objeto de erro */
    return {
      error: {
        message: 'Username already exists',
        code: 'usernameExists',
      },
    };
  }

  /* Caso o username não exista, "rolamos o dado" para descobrir se essa pessoa será admin */
  const admin = Math.floor(Math.random() * 100) > 50;

  /* Depois, armazenamos os dados no arquivo */
  await model.create(username, password, admin);

  /* Por fim, retornamos os dados da pessoa para o controller */
  /* Por motivos de segurança, não incluiremos a senha */
  return {
    username,
    admin,
  };
};

module.exports = {
  create,
};
Note que o exercício pede que, ao final, seja retornado um token. Nós já fazemos isso em outro lugar: no controller de login! Vamos, então, mover o código responsável por gerar tokens para o service! Altere o arquivo services/User.js :

const jwt = require('jsonwebtoken');
// const model = require('../models/User');

const { JWT_SECRET } = process.env;

/* Recebemos o valor de `admin` que, por padrão, é `false` */
const login = async (username, password, admin = false) => {
  /* Não precisamos validar os campos, pois o controler já faz isso pra nós */

  /* Se o login for admin e a senha estiver incorreta */
  if (username === 'admin' && password !== 's3nh4S3gur4???') {
    /* Retornamos um objeto de erro */
    return {
      error: {
        message: 'Invalid username or password',
        code: 'invalidCredentials',
      },
    };
  }

  /* Caso a função login seja chamada com o parâmetro admin pré definido, utilizamos esse parâmetro.
     Caso contrário, verificamos o nome de usuário e senha */
  const isAdmin = admin || (username === 'admin' && password === 's3nh4S3gur4???');

  const payload = {
    username,
    /* Passamos a utilizar o valor da variável `admin` */
    /* para determinar o valor do campo `admin` no payload do token */
    admin: isAdmin,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

// const create = async (username, password) => {
//...
//   return {
//     username,
//     admin,
//   };
// };

// module.exports = {
//   create,
     login,
// };
Agora, alteramos o controller de login para que utilize o service que acabamos de criar. Altere o arquivo controllers/login.js :

// controllers/login.js

const Joi = require('joi');

const service = require('../services/User');

const validateBody = (body) =>
  /* Utilizamos o Joi para validar o schema do body */
  Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(body);

module.exports = async (req, res, next) => {
  const { error } = validateBody(req.body);

  /* Caso ocorra erro na validação do Joi, passamos esse */
  /* erro para o express, que chamará nosso middleware de erro */
  if (error) return next(error);

  const { username, password } = req.body;

  /* Pedimos para o service gerar o token */
  const { error: serviceError, token } = await service.login(username, password);

  /* Caso ocorra um erro do tipo `invalidCredentials`,
     retornamos um novo erro com status `401 unauthorized` */
  if (serviceError && serviceError.code === 'invalidCredentials') {
    return next({ statusCode: 401, message: serviceError.message });
  }

  /* Caso haja qualquer outro erro, acionamos o middleware de erro para obter uma mensagem genérica */
  if (serviceError) {
    return next(serviceError);
  }

  /* Por fim, caso nenhum erro tenha ocorrido, retornamos o token */
  res.status(200).json({ token });
};
Agora precisamos alterar nosso método create no service para que ele utilize o método login também. Altere o arquivo services/User.js :

// ...
// const create = async (username, password) => {
//   /* A primeira coisa que precisamos fazer
//   é verificar se o username informado já existe */
//   const userExists = await model.findOne(username);

//   /* Caso o username já exista */
//   if (userExists) {
//     /* Retornamos um objeto de erro */
//     return {
//       error: {
//         message: 'Username already exists',
//         code: 'usernameExists',
//       },
//     };
//   }

//   /* Caso o username não exista, "rolamos o dado" para descobrir se essa pessoa será admin */
//   const admin = Math.floor(Math.random() * 100) > 50;

//   /* Depois, armazenamos os dados no arquivo */
//   await model.save({ username, password, admin });

     /* Por fim, retornamos o token  */
     return login(username, password, admin);
// };
// ...
Já que precisamos reutilizar a lógica de validação que usamos no controller de login, vamos exportar essa lógica para outro arquivo. Crie o arquivo controllers/utils/validateCredentials.js :

// controllers/utils/validateCredentials.js

const Joi = require('joi');

const validateCredentials = (body) =>
  /* Utilizamos o Joi para validar o schema do body */
  Joi.object({
    username: Joi.string().min(5).alphanum().required(),
    password: Joi.string().min(5).required(),
  }).validate(body);

module.exports = {
  validateCredentials,
};
Agora, alteramos o login para utilizar a função validateCredentials . Modifique o arquivo controllers/login.js :

// controllers/login.js

/* Removemos o import do Joi */
// const service = require('../services/User');
const { validateCredentials } = require('./utils/validateCredentials');

// module.exports = async (req, res, next) => {
  const { error } = validateCredentials(req.body);

//  /* Caso ocorra erro na validação do Joi, passamos esse */

  // ...
O próximo passo é criar o controller para nossa nova rota. Crie o arquivo controllers/signup.js :

const { validateCredentials } = require('./utils/validateCredentials');

const service = require('../services/User');

module.exports = async (req, res, next) => {
  /* Começamos validando `username` e `password`  */
  const { error: validationError } = validateCredentials(req.body);

  /* Caso haja erro de validação */
  if (validationError) {
    /* Enviamos o erro para o middleware de erro */
    return next(validationError);
  }

  const { username, password } = req.body;

  /* Pedimos para o service armazenar os dados */
  /* Em troca, recebemos o resultado da ação */
  const result = await service.create(username, password);

  /* Validamos se o retorno tem algum erro */
  /* Se não tiver, retornamos o token*/
  if (!result.error) {
    return res.status(201).json(result);
  }

  /* Se tiver algum erro, e o código for "usernameExists" */
  /* Retornamos um 409 Conflict com a mensagem do erro */
  if (result.error.code === 'usernameExists') {
    return res.status(409).json({ message: result.error.message });
  }
};
Agora, adicione o arquivo ao index de controllers. Edite o arquivo controllers/index.js :

// const me = require('./me');
// const ping = require('./ping');
// const login = require('./login');
// const topSecret = require('./topSecret');
const signup = require('./signup');

// module.exports = {
//   me,
//   ping,
//   login,
//   topSecret,
   signup,
// };
E, por fim, adicione o endpoint ao express. Edite o arquivo index.js :

// ...
// app.get(
//   '/top-secret',
//   /* Middleware que valida o JWT e cria `req.user` */
//   middlewares.auth,
//   /* Middleware que verifica se a pessoa autenticada é admin */
//   middlewares.admin,
//   /* Controller do endpoint */
//   controllers.topSecret,
// );

app.post('/signup', controllers.signup);

// app.use(middlewares.error);
// ...
Exercício 2
Altere o endpoint de login
Antes de gerar o token, verifique se o nome de usuário e a senha informados existem no arquivo users.json ;
Não permita mais o login do usuário admin com a senha fixa.
Informe, na propriedade admin do payload do token, o mesmo valor da propriedade admin que está armazenado para aquela pessoa.
Resolução
Quem realiza a autenticação é, na verdade, o service User . Sendo assim, é ele quem precisamos alterar. Altere o arquivo services/User.js :

// const jwt = require('jsonwebtoken');
// const model = require('../models/User');

// const { JWT_SECRET } = process.env;

/* Deixamos de receber `admin`, pois agora será lido de Users.json */
 const login = async (username, password) => {
//   /* Não precisamos validar os campos, pois o controler já faz isso pra nós */

  /* Buscamos as informações no arquivo Users.json */
  const user = await model.findOne(username);

  if (!user || user.password !== password) {
    return {
      error: {
        code: 'invalidCredentials',
        message: 'Invalid username or password',
      },
    };
  }

  const payload = {
    username,
    /* Usamos a informaçào no arquivo Users.json para determinar
       se a pessoa é admin */
    admin: user.admin,
  };

//   const token = jwt.sign(payload, JWT_SECRET, {
//     expiresIn: '1h',
//   });

//   return { token };
// };

// const create = async (username, password) => {
//   /* A primeira coisa que precisamos fazer
//   é verificar se o username informado já existe */
//   const userExists = await model.findOne(username);

//   /* Caso o username já exista */
//   if (userExists) {
//     /* Retornamos um objeto de erro */
//     return {
//       error: {
//         message: 'Username already exists',
//         code: 'usernameExists',
//       },
//     };
//   }

//   /* Caso o username não exista, "rolamos o dado" para descobrir se essa pessoa será admin */
//   const admin = Math.floor(Math.random() * 100) > 50;

//   /* Depois, armazenamos os dados no arquivo */
//   await model.create({ username, password, admin });

//   /* Por fim, retornamos o token  */
  /* NÃo precisamos mais passar o valor de admin, pois será lido do arquivo */
  return login(username, password);
// };

// module.exports = {
//   create,
//   login,
// };
