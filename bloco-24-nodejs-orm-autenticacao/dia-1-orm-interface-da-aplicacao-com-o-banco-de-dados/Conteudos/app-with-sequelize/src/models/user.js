const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    fullName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_num: DataTypes.STRING,
  }, {
    freezeTableName: true, // faz o sequelize entenda e busque no DB o mesmo nome do models e do migrations
  });

  return User;
};

module.exports = User;
