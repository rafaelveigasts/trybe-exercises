## Relacionamentos 1:N

No caso dos relacionamentos 1:N , não há grande diferença na maneira como criamos as associações. Caso cada employee possuísse vários address , bastaria declarar seu model da seguinte forma:

// models/Employee.js
// module.exports = (sequelize, DataTypes) => {
//   const Employee = sequelize.define('Employee', {
//     id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
//     firstName: DataTypes.STRING,
//     lastName: DataTypes.STRING,
//     age: DataTypes.INTEGER,
//   },
//   {
//     timestamps: false,
//     tableName: 'Employees',
//     underscored: true,
//   });

//   Employee.associate = (models) => {
     Employee.hasMany(models.Address,
       { foreignKey: 'employee_id', as: 'addresses' });
//   };

//   return Employee;
// };

Mudamos apenas o método de declaração da associação para hasMany , indicando que cada employee pode possuir muitos addresses . Observe o id 4 no resultado e veja a diferença que ocorre quando é usado hasOne e/ou hasMany .

No model addresses , por sua vez, não há necessidade de alterarmos nada, pois cada address continua pertencendo a apenas um employee , o que justifica o uso do método belongsTo .

Acompanhe na prática como fazer relacionamentos 1:1 (Um para um) e 1:N (Um para muitos).