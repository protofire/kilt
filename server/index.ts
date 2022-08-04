
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { claimerRoute } from "./routes/claimerRoutes";
import { attesterRoute } from "./routes/attesterRoutes";
import * as Kilt from '@kiltprotocol/sdk-js';
import { connect } from "mongoose";

async function connectDB() {
  const uri = process.env.DB_URI;
  if (!uri) throw Error("DB URI not exists")
  await connect(uri);
}

async function main() {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // ensures Kilt connected before running the app
  await Kilt.init({ address: 'wss://peregrine.kilt.io/parachain-public-ws' });
  await Kilt.connect();

  await connectDB();

  app.use('/api/claimer', claimerRoute)
  app.use("/api/attester", attesterRoute);

  const port = process.env.PORT ?? 8000;
  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
}

main();

