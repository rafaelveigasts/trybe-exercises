const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_num: DataTypes.STRING,
  }, {
    //freezeTableName: true, // faz o sequelize entenda e busque no DB o mesmo nome do models e do migrations
    tableName: "users", // nome da tabela padrão no DB, faz todas as requisições na tabela definida aqui
  });

  return User;
};

module.exports = User;
