import express from 'express';
import { isAttester } from '../controller/attesterController';
const attesterRoute = express.Router()

// define the home page route
attesterRoute.get('/isAttester/:did', isAttester);

export { attesterRoute };