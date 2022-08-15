import express from 'express';
import { getUserDetails } from '../controller/userController';

const userRoutes = express.Router();

userRoutes.get('/details/:did', getUserDetails);

export { userRoutes };
