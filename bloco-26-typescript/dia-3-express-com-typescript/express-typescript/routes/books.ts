// ./routes/books.ts

import { Router, Request, Response } from "express";
import StatusCode from "../enums/StatusCode";
import Book from "../interfaces/Book";
import { read, write } from "../functions";
import validationBook from "../middlewares/validationBook";

const router = Router();

const NotFoundMessage = "Livro não encontrado."

router.get("/books", async (req: Request, res: Response) => {
    const books = await read();
    return res.status(StatusCode.OK).json(books);
});

router.get("/books/:isbn", async (req: Request, res: Response) => {
    const { isbn } = req.params;

    const books = await read();

    const book = books.find(book => book.isbn === isbn);

    if (!book) return res.status(StatusCode.NOT_FOUND).send(NotFoundMessage);

    return res.status(StatusCode.OK).json(book);
});

router.post("/books", validationBook, async (req: Request, res: Response) => {

  const book: Book = req.body;

  const books = await read();

  books.push(book);

  await write(books);

  return res.status(StatusCode.CREATED).json(book);
});

router.put("/books/:isbn", (req: Request, res: Response) => {

});

router.delete("/books/:isbn", (req: Request, res: Response) => {

});

export default router;