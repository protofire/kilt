import express from 'express';
import { Request, Response } from 'express';
import {
  buildMessage,
  getLoginInfo,
  getSessionInfo,
  verifySignature
} from '../controller/userController';

const userRoutes = express.Router();

const errorHandler = (fn: any) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).send({ msg: err.message });
    });
};

userRoutes.post('/verify', errorHandler(verifySignature));
userRoutes.get('/session', errorHandler(getSessionInfo));
userRoutes.get('/login', errorHandler(getLoginInfo));
userRoutes.post('/message', errorHandler(buildMessage));

export { userRoutes };
