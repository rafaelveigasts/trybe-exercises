const { User } = require('../models');
const jwt = require('jsonwebtoken');

const secret = 'meusupersegredo';

module.exports = async (req, res) => {
  try {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(401).json({ message: 'É necessário usuário e senha para fazer login' });

  const user = await User.findOne({ where: { username } });

  if (!user || user.password !== password)
    return res.status(401).json({ message: 'Usuário não existe ou senha inválida' });

    const jwtConfig = {
      expiresIn: '7d',
      algorithm: 'HS256',
    };

    const token = jwt.sign({ data: user }, secret, jwtConfig);

  return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};
