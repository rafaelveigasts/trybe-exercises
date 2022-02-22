// ./routes/books.ts

import { Router, Request, Response } from "express";
import { read } from "../functions";
import StatusCode from "../enums/StatusCode";

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

router.post("/books", (req: Request, res: Response) => {

});

router.put("/books/:isbn", (req: Request, res: Response) => {

});

router.delete("/books/:isbn", (req: Request, res: Response) => {

});

export default router;