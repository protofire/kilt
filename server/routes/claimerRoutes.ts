import express from 'express';
import { getAttesterCtypes, getCredentialsByDid } from '../controller/claimerController';

const claimerRoute = express.Router();

claimerRoute.get('/credential/:did', getCredentialsByDid);
claimerRoute.get('/attesters/:did', getAttesterCtypes);

export { claimerRoute };
