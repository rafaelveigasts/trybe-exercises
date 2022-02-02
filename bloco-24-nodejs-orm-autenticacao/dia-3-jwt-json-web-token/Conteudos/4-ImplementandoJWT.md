## Implementando JWT

Para começar, vamos instalar o pacote jsonwebtoken . Ele é quem será responsável por gerar e validar os tokens para nós:

**npm install jsonwebtoken**

Agora, vamos editar o arquivo controllers/login.js . Lá, vamos trabalhar na geração do nosso JWT e adicionar os seguintes trechos de código:

// const { User } = require('../models');
const jwt = require('jsonwebtoken');

/* Sua chave secreta. É com ela que os dados do seu usuário serão encriptados.
   Em projetos reais, armazene-a numa variável de ambiente e tenha cuidado com ela, pois só quem tem acesso
   a ela poderá criar ou alterar tokens JWT. */
const secret = 'seusecretdetoken';

// module.exports = async (req, res) => {
//   try {
//     const { username, password } = req.body;

//     if (!username || !password)
//       return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

//     const user = await User.findOne({ where: { username } });

//     if (!user || user.password !== password)
//       return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

    /* Criamos uma config básica para o nosso JWT, onde:
        expiresIn -> significa o tempo pelo qual esse token será válido;
        algorithm -> algoritmo que você usará para assinar sua mensagem
                    (lembra que falamos do HMAC-SHA256 lá no começo?). */

    /* A propriedade expiresIn aceita o tempo de forma bem descritiva. Por exemplo: '7d' = 7 dias. '8h' = 8 horas. */
    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    /* Aqui é quando assinamos de fato nossa mensagem com a nossa "chave secreta".
      Mensagem essa que contém dados do seu usuário e/ou demais dados que você
      quiser colocar dentro de "data".
      O resultado dessa função será equivalente a algo como: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6Iml0YWxzc29kaiIsInBhc3N3b3JkIjoic2VuaGExMjMifSwiaWF0IjoxNjM4OTc1MTMyLCJleHAiOjE2Mzk1Nzk5MzJ9.hnpmu2p61Il8wdQfmUiJ7wiWXgw8UuioOU_D2RnB9kY */
    const token = jwt.sign({ data: user }, secret, jwtConfig);

    /* Por fim, nós devolvemos essa informação ao usuário. */
    res.status(200).json({ token });

//   } catch (err) {
//     return res.status(500).json({ message: 'Erro interno', error: err.message });
//   }
// };

Feito isso, nós já podemos nos autenticar de verdade, não é mesmo? Ao fazer uma nova requisição POST para /api/login , passando nome de usuário e senha corretos, obtemos um resultado semelhante ao seguinte:

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJ1c2VybmFtZSI6Iml0YWxzc29kaiIsInBhc3N3b3JkIjoic2VuaGExMjMifSwiaWF0IjoxNjM4OTc1MTMyLCJleHAiOjE2Mzk1Nzk5MzJ9.hnpmu2p61Il8wdQfmUiJ7wiWXgw8UuioOU_D2RnB9kY"
}

Eis o nosso token! É ele que vamos ficar transitando pra lá e pra cá, então ele precisa ser guardado! Mas caso ele seja perdido, não se preocupe; é só gerar outro token. 🙂

Agora temos que usar esse token de alguma forma, não é mesmo? 

Para isso, vamos criar uma pasta chamada auth dentro do diretório api ; e, dentro dela, um arquivo chamado validateJWT.js .

Esse arquivo conterá uma função que será usada como middleware para as nossas requisições, validando todas as rotas em que nós solicitarmos autenticação.

// ./auth/validateJWT.js
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

/* Mesma chave privada que usamos para criptografar o token.
   Agora, vamos usá-la para descriptografá-lo.
   Numa aplicação real, essa chave jamais ficaria hardcoded no código assim,
   e muitos menos de forma duplicada, mas aqui só estamos interessados em
   ilustrar seu uso ;) */
const segredo = 'seusecretdetoken';

module.exports = async (req, res, next) => {
  /* Aquele token gerado anteriormente virá na requisição através do
     header Authorization em todas as rotas que queremos que
     sejam autenticadas. */
  const token = req.headers['authorization'];

  /* Caso o token não seja informado, simplesmente retornamos
     o código de status 401 - não autorizado. */
  if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
  }

  try {
    /* Através o método verify, podemos validar e decodificar o nosso JWT. */
    const decoded = jwt.verify(token, segredo);
    /*
      A variável decoded será um objeto equivalente ao seguinte:
      {
        data: {
          id: '3',
          username: 'italssodj',
          password: 'senha123'
        },
        iat: 1582587327,
        exp: 1584774714908
      }
    */

    /* Caso o token esteja expirado, a própria biblioteca irá retornar um erro,
       por isso não é necessário fazer validação do tempo.
       Caso esteja tudo certo, nós então buscamos o usuário na base para obter seus dados atualizados */

    const user = await User.findOne({ where: { username: decoded.data.username } });

    /* Não existe um usuário na nossa base com o id informado no token. */
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Erro ao procurar usuário do token.' });
    }

    /* O usuário existe! Colocamos ele em um campo no objeto req.
       Dessa forma, o usuário estará disponível para outros middlewares que
       executem em sequência */
    req.user = user;

    /* Por fim, chamamos o próximo middleware que, no nosso caso,
       é a própria callback da rota. */
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

No arquivo api/server.js , onde definimos as rotas, usamos esse middleware para adicionar autenticação na nossa rota de listagem de posts.


// const express = require('express');
// const bodyParser = require('body-parser');
// const routes = require('./routes');

/* Aqui, importamos nossa função que valida se o usuário está ou não autenticado */
const validateJWT = require('./auth/validateJWT');

// const PORT = process.env.PORT || 8080;

// const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// const apiRoutes = express.Router();

apiRoutes.get('/api/posts', validateJWT, routes.getPosts);
// apiRoutes.post('/api/users', routes.createUsers);
// apiRoutes.get('/api/users', routes.getUsers);
// apiRoutes.post('/api/login', routes.login);

// app.use(apiRoutes);

// app.listen(PORT, () => console.log(`Conectado na porta ${PORT}`));