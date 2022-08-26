import express from 'express';
import {
  buildMessage,
  getLoginInfo,
  getSessionInfo,
  verifySignature,
  checkToken
} from '../controller/userController';
import { handleError } from './middleware/middleware';

const userRoutes = express.Router();

userRoutes.post('/verify', handleError(verifySignature));
userRoutes.get('/session', handleError(getSessionInfo));
userRoutes.get('/login', handleError(getLoginInfo));
userRoutes.post('/message', handleError(buildMessage));
userRoutes.get('/check/:token', handleError(checkToken));

export { userRoutes };
