// models/BookModel.ts

import { model as createModel } from 'mongoose';
import { BookSchema, IBook } from '../schemas/BookSchema';

class BookModel {
  /*
    Criamos no construtor um model do Mongoose do tipo IBook, passando pro createModel(model do Mongoose) um nome e o schema de referência.
  */

  constructor(private bookModel = createModel<IBook>('books', BookSchema)) {} 

  public async getBooks(): Promise<IBook[]> {
    const books = await this.bookModel.find();
    return books;
  }

  public async editBook(id: string, bookData: object): Promise<IBook | null> {
    const book = await this.bookModel.findOneAndUpdate(
      { _id: id },
      { ...bookData },
      { new: true },
    );
    return book;
  }
}

export default BookModel;