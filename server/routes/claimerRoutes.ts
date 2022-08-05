import express from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypes,
  getCredentialsByDid,
  createAttesterRequest
} from '../controller/claimerController';

const claimerRoute = express.Router();

claimerRoute.get('/credential/:did', getCredentialsByDid);
claimerRoute.get('/attesters/:did', getAttesterCtypes);
claimerRoute.get('/attesters/detail/:id', getAttesterCtypeDetail);
claimerRoute.post('/attesters/request', createAttesterRequest);

export { claimerRoute };
