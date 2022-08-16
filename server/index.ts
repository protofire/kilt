
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { claimerRoute } from './routes/claimerRoutes';
import { attesterRoute } from './routes/attesterRoutes';
import { websocket } from './services/websocket';
import { blockchain } from './services/blockchain';
import { database } from './services/database';
import { userRoutes } from './routes/userRoutes';

async function main() {
  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  // ensures Kilt connected before running the app
  await blockchain().init();
  // connects the Mongodb instance.
  await database().init();

  app.use('/api/claimer', claimerRoute);
  app.use('/api/attester', attesterRoute);
  app.use('/api/user', userRoutes);

  const port = process.env.PORT ?? 8000;
  const server = app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });

  // connects the server to a ws service for live updates
  websocket().init(server);
}

main();
