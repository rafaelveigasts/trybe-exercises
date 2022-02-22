// ./routes/books.ts

import { Router, Request, Response } from "express";
import fs from 'fs/promises';
import Book from "../interfaces/Book";

const router = Router();

const notFound = 'Livro não encontrados';

router.get("/books", async (req: Request, res: Response) => {
    const data = await fs.readFile("./books.json", "utf8");

    const books: Book[] = JSON.parse(data);

    return res.status(200).json(books);
});


router.get("/books/:isbn", async (req: Request, res: Response) => {
  const { isbn } = req.params;

  const data = await fs.readFile("./books.json", "utf8");

  const books: Book[] = JSON.parse(data);

  const book = books.find(book => book.isbn === isbn);

  if (!book) return res.status(404).send(notFound);

  return res.status(200).json(book);
});

router.post("/books", (req: Request, res: Response) => {

});

router.put("/books/:isbn", (req: Request, res: Response) => {

});

router.delete("/books/:isbn", (req: Request, res: Response) => {

});

export default router;