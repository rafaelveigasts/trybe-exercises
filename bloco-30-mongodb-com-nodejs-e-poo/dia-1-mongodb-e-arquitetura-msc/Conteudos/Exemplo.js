import { connect } from 'mongoose';

const options = {
  user: 'rafael', //process.env.DB_USER,
  pass: '11463250', //process.env.DB_PASS,
  autoIndex: false, // Don't build indexes
  dbName: 'model_example' // process.env.DB_NAME
}
connect('mongodb://localhost:27017/', options)