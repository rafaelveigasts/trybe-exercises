const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'rafael',
  password: 11463250,
  database: 'model_example'}
);

module.exports = connection;