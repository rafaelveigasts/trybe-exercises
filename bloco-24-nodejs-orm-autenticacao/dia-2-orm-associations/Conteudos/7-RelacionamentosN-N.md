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

Agora vamos ao model de Books :

// models/Book.js
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookId: { type: DataTypes.INTEGER, primaryKey: true },
    name: DataTypes.STRING,
    releaseYear: DataTypes.INTEGER,
    numberPages: DataTypes.INTEGER,
  },
  {
    timestamps: false,
    tableName: 'Books',
    underscored: true,
  });

  return Book;
};

Certo, nada demais até o momento.
Vamos agora criar o model de UserBooks :

// models/UserBook.js
module.exports = (sequelize, _DataTypes) => {
  const UserBook = sequelize.define('UserBook',
    {},
    { timestamps: false },
  );

  UserBook.associate = (models) => {
    models.Book.belongsToMany(models.User, {
      as: 'users',
      through: UserBook,
      foreignKey: 'book_id',
      otherKey: 'user_id',
    });
    models.User.belongsToMany(models.Book, {
      as: 'books',
      through: UserBook,
      foreignKey: 'user_id',
      otherKey: 'book_id',
    });
  };

  return UserBook;
};

Primeiro de tudo, note que não temos nenhum atributo nesse model. Isso é possível porque quando estabelecemos os relacionamentos usando UserBooks como tabela de associação, o Sequelize já entende que esse model precisa ter os IDs das duas tabelas sendo associadas.

Depois, temos um novo tipo de relacionamento: o belongsToMany . Esse relacionamento cria um relacionamento do tipo N:N, utilizando o model especificado na opção through como tabela de associação. Temos também o alias daquela associação, na chave as e, por último, temos os parâmetros foreignKey e otherKey . Esses dois parâmetros dizem ao Sequelize qual campo utilizar na tabela de associação para identificar cada uma das entidades.

  Lembre-se: foreignKey sempre se refere ao model em que chamamos belongsToMany , enquanto otherKey se refere ao model com o qual estamos criando a associação.

Para testar a aplicação, você deve fazer as devidas alterações nos controllers , criar as migrations e os seeders .

Para criar as migrations, utilize os seguintes comandos:

npx sequelize migration:generate --name create-books
npx sequelize migration:generate --name create-users
npx sequelize migration:generate --name create-user-books

