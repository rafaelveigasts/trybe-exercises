const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  user: 'rafael',
  password: '11463250',
  host: 'localhost',
  database: 'model_example',
});

module.exports = connection;