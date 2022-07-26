import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Test');
});

app.get('/logout', (req: Request, res: Response) => {
  // implement logout.js here
  res.status(400).json({error: 'not implemented'})
});

app.get('/secret', (req: Request, res: Response) => {
  // implement secret.js here
  res.status(400).json({error: 'not implemented'})
});

app.get('/session', (req: Request, res: Response) => {
  // implement session.js here
  res.status(400).json({error: 'not implemented'})
});

app.get('/verify', (req: Request, res: Response) => {
  // implement verify.js here
  res.status(400).json({error: 'not implemented'})
});

app.get('/user', (req: Request, res: Response) => {
  // implement user.js here
  res.status(400).json({error: 'not implemented'})
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});