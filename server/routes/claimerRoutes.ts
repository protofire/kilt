import express from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypesForClaimer
} from '../controller/attesterCtypeController';
import { getCredentialsByDid } from '../controller/claimerController';
import { createAttesterRequest } from '../controller/requestsController';

const claimerRoute = express.Router();

claimerRoute.get('/credential/:did', getCredentialsByDid);
claimerRoute.get('/attesters/:did', getAttesterCtypesForClaimer);
claimerRoute.get('/attesters/detail/:id', getAttesterCtypeDetail);
claimerRoute.post('/attesters/request', createAttesterRequest);

export { claimerRoute };
