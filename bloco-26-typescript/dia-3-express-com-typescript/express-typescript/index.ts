// ./index.ts

import express, { Request, Response } from "express";
import BookRoutes from "./routes/books";

const app = express();

const PORT = 8000;

app.get("/", (req: Request, res:Response) => {
  res.send("Express + TypeScript");
});

app.use(BookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
