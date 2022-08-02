
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { router as attesters} from './routes/attester';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Kilt cookbook recipe");
});

// routes
app.use("/api/attesters", attesters);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
 