const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const BookModel = require("../../models/Books");

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

describe('O model de Book', () => {
  const Book = BookModel(sequelize, dataTypes);
  const book = new Book();

  describe('possui o nome "Book"', () => {
    checkModelName(Book)('Book');
  });

  describe('possui as propriedades "fullName" e "email"', () => {
    ['title', 'author', 'pageQuantity'].forEach(checkPropertyExists(book));
  });
});