## Relacionamentos N:N

Nos relacionamentos N:N, existem algumas diferenças significativas ao se criar as associações. Esse tipo de relacionamento pode ser visto também como dois relacionamentos um para muitos (1:N) ligados por uma tabela intermediária, chamada de tabela de junção , ela guarda as informações de como as tabelas se relacionam entre si.

O diagrama abaixo será usado como exemplo:

<img src='diagrama2.png'/>

Esse banco possui 3 tabelas: Users , Books e UserBooks . A tabela UserBooks possui um relacionamento N:N com as demais tabelas. Desta maneira, podemos inferir que:

  A tabela Users guarda as informações de cada usuário.

  A tabela Books guarda as informações de cada livro.
  
  A tabela UserBooks irá agir como uma tabela de junção , guardando a relação de quais pessoas usuárias possuem quais livros. Nessa tabela uma pessoa usuária pode possuir vários livros, enquanto um livro pode pertencer a várias pessoas usuárias. Assim cadastramos o livro uma única vez na tabela Books , assim como a pessoa usuária na tabela Users , e este livro vai poder ser associado de forma livre a várias pessoas usuárias, assim como uma única pessoa usuária poderá ser associado a vários livros, graças a essa tabela.

Como criamos uma associação que passa por 3 tabelas?

Primeiro, vamos criar o model de Users :

// models/User.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: { type: DataTypes.INTEGER, primaryKey: true },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'Users',
    underscored: true,
  });

  return User;
};