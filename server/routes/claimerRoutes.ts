import express from 'express';
import { getCredentialsByDid } from '../controller/claimerController';

const claimerRoute = express.Router();

claimerRoute.get('/credential/:did', getCredentialsByDid);

export { claimerRoute };
