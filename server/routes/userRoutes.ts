import express from 'express';
import {
  buildMessage,
  getSessionInfo,
  getUserDetails
} from '../controller/userController';

const userRoutes = express.Router();

userRoutes.get('/details/:did', getUserDetails);
userRoutes.get('/session', getSessionInfo);
userRoutes.post('/message', buildMessage);

export { userRoutes };
