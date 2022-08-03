
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { attestersWhitelist } from "./constants";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT ?? 8000;

app.use("/api/attester/isAttester/:did",
  (req: Request, res: Response) => {
    const { did } = req.params;
    const attester = attestersWhitelist.find(a => a === did);
    const isAttester = !!attester;
    return res.status(200).json({ data: { isAttester } });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
 