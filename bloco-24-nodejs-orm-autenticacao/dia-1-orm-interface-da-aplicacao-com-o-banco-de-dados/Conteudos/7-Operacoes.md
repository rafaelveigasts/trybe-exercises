## Operações

Com o model implementado, caso precisemos gravar/ler algum dado do banco de dados, conseguimos faze-lo também. Caso precisemos buscar todas as pessoas usuárias, por exemplo, basta fazermos algo parecido com o exemplo de código abaixo:

  controllers/userController.js

const express = require('express');
const { User } = require('../models');
const router = express.Router();

// Este endpoint usa o método findAll do Sequelize para retorno todos os users.
router.get('/', async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  };
});

// ...

module.exports = router;

Note que não precisamos escrever uma query SQL para buscar os dados, pois o Sequelize abstrai isso para nós. Ele oculta essa complexidade e nos provê uma forma menos trabalhosa de escrever esse código.

Reparem que estamos importando o modelo que criamos do arquivo index.js da pasta models, e não diretamente do arquivo User.js . Quando executamos o comando npx sequelize init , o arquivo index.js é gerado dentro da pasta models.

O código desse arquivo index.js é responsável por, basicamente, realizar a conexão com o banco de dados, através do arquivo config.json , coletar todos os modelos definidos dentro da pasta models e, caso necessário, associar um modelo a algum outro. O caso que mostramos acima foi para buscar todas as pessoas usuárias, mas conseguimos realizar todas as outras operações de consulta, inserção e deleção também.

  controllers/userController.js

const express = require('express');
const { User } = require('../models');
const router = express.Router();

// ...

// Este endpoint usa o método findByPk do Sequelize para buscar um usuário pelo id.
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método findOne do Sequelize para buscar um usuário pelo id e email.
// URL a ser utilizada para o exemplo http://localhost:3000/user/search/1?email=aqui-o-email
router.get('/search/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    const user = await User.findOne({ where: { id, email }});

    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json(user);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método create do Sequelize para salvar um usuário no banco.
router.post('/', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const newUser = await User.create({ fullName, email });

    return res.status(201).json(newUser);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método update do Sequelize para alterar um usuário no banco.
router.put('/:id', async (req, res) => {
  try {
    const { fullName, email } = req.body;
    const { id } = req.params;

    const [updateUser] = await User.update(
      { fullName, email },
      { where: { id } },
    );

    console.log(updateUser); // confira o que é retornado quando o user com o id é ou não encontrado;

    if(!updateUser) return res.status(404).json({ message: 'Usuário não encontrado' });

    return res.status(200).json({ message: 'Usuário atualizado com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

// Este endpoint usa o método destroy do Sequelize para remover um usuário no banco.
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.destroy(
      { where: { id } },
    );

    console.log(deleteUser) // confira o que é retornado quando o user com o id é ou não encontrado;

    return res.status(200).json({ message: 'Usuário excluído com sucesso!' });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Algo deu errado' });
  }
});

module.exports = router;

Por último, crie um arquivo index.js (código logo abaixo) na raiz do seu projeto. Teste e veja o comportamento de uma aplicação utilizando o Sequelize. Caso tenha alguma dúvida até aqui, na seção "Sequelize do 0" terá um vídeo demonstrando a criação de uma aplicação em Sequelize.

  index.js

const express = require('express');
const bodyParser = require("body-parser");

const userController = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/user', userController);

app.listen(PORT, () => console.log(`Ouvindo na porta ${PORT}!`));

O intuito do conteúdo de hoje é apresentar para vocês o Sequelize e suas funcionalidades. O importante é que vocês entendam as diferenças da forma que vocês faziam, antes do Sequelize, para essa nova forma, e onde devem usar.
