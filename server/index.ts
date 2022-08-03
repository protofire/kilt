
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { claimerRoute } from "./routes/claimerRoutes";
import { attesterRoute } from "./routes/attesterRoutes";

dotenv.config();
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/claimer', claimerRoute)
app.use("/api/attester", attesterRoute);

const port = process.env.PORT ?? 8000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
 