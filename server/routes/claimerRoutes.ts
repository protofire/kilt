import express from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypes,
  getCredentialsByDid
} from '../controller/claimerController';

const claimerRoute = express.Router();

claimerRoute.get('/credential/:did', getCredentialsByDid);
claimerRoute.get('/attesters/:did', getAttesterCtypes);
claimerRoute.get('/attesters/detail/:id', getAttesterCtypeDetail);

export { claimerRoute };
