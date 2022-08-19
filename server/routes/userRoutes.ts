import express from 'express';
import { Request, Response } from 'express';
import {
  buildMessage,
  getSessionInfo,
  getUserDetails
} from '../controller/userController';

const userRoutes = express.Router();

const errorHandler = (fn: any) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res))
    .catch(err => {
      res.status(500).send({ msg: err.message });
    });
};

userRoutes.get('/details/:did', errorHandler(getUserDetails));
userRoutes.get('/session', errorHandler(getSessionInfo));
userRoutes.post('/message', errorHandler(buildMessage));

export { userRoutes };
