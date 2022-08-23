import express from 'express';
import { Request, Response } from 'express';
import {
  buildMessage,
  getSessionInfo,
  getUserDetails,
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

userRoutes.get('/details/:did', errorHandler(getUserDetails));
userRoutes.post('/verify', errorHandler(verifySignature));
userRoutes.get('/session', errorHandler(getSessionInfo));
userRoutes.post('/message', errorHandler(buildMessage));

export { userRoutes };
