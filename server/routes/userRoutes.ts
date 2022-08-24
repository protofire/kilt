import express from 'express';
import {
  buildMessage,
  getLoginInfo,
  getSessionInfo,
  verifySignature,
  checkToken
} from '../controller/userController';
import { errorHandler } from './middleware';

const userRoutes = express.Router();


userRoutes.post('/verify', errorHandler(verifySignature));
userRoutes.get('/session', errorHandler(getSessionInfo));
userRoutes.get('/login', errorHandler(getLoginInfo));
userRoutes.post('/message', errorHandler(buildMessage));
userRoutes.get('/check/:token', errorHandler(checkToken));

export { userRoutes };
