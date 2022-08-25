import express from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypesForClaimer
} from '../controller/attesterCtypeController';
import { createCredential, getCredentialById, getCredentialsByDid } from '../controller/claimerController';
import { authenticateToken, errorHandler } from './middleware';

const claimerRoute = express.Router();

claimerRoute.post('/credential', authenticateToken, errorHandler(createCredential));
claimerRoute.get('/credential', authenticateToken, errorHandler(getCredentialsByDid));
claimerRoute.get('/credential/detail/:id', authenticateToken, errorHandler(getCredentialById));
claimerRoute.get('/attesters', authenticateToken, errorHandler(getAttesterCtypesForClaimer));
claimerRoute.get('/attesters/detail/:id', authenticateToken, errorHandler(getAttesterCtypeDetail));

export { claimerRoute };
