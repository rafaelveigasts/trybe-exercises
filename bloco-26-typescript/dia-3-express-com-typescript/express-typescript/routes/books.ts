// ./routes/books.ts

import { Router, Request, Response } from "express";

const router = Router();

router.get("/books", (req: Request, res: Response) => {});

router.get("/books/:isbn", (req: Request, res: Response) => {});

router.post("/books", (req: Request, res: Response) => {});

router.put("/books/:isbn", (req: Request, res: Response) => {});

router.delete("/books/:isbn", (req: Request, res: Response) => {});

export default router;
