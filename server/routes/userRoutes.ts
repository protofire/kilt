import express from 'express';
import {
  buildMessage,
  getLoginInfo,
  getSessionInfo,
  verifySignature
} from '../controller/userController';
import { errorHandler } from '../utils/middleware';

const userRoutes = express.Router();


userRoutes.post('/verify', errorHandler(verifySignature));
userRoutes.get('/session', errorHandler(getSessionInfo));
userRoutes.get('/login', errorHandler(getLoginInfo));
userRoutes.post('/message', errorHandler(buildMessage));

export { userRoutes };
