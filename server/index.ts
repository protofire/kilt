import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";


dotenv.config();

const app = express();


const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Kilt cookbook recipe");
});

// routes
app.use("/api/attesters", attesters);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
