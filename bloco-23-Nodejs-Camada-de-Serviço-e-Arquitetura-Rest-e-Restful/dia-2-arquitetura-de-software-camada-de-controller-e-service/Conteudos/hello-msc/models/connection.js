// hello-msc/models/connection.js

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: 'rafael',
  password: '11463250',
  database: process.env.MYSQL_model_example
});

module.exports = connection;