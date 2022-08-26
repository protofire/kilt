import express from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypesForClaimer
} from '../controller/attesterCtypeController';
import {
  createCredential,
  getCredentialById,
  getCredentialsByDid
} from '../controller/claimerController';
import { handleError, auth } from './middleware/middleware';

const claimerRoute = express.Router();

claimerRoute.post('/credential', auth, handleError(createCredential));
claimerRoute.get('/credential', auth, handleError(getCredentialsByDid));
claimerRoute.get('/credential/detail/:id', auth, handleError(getCredentialById));
claimerRoute.get('/attesters', auth, handleError(getAttesterCtypesForClaimer));
claimerRoute.get('/attesters/detail/:id', auth, handleError(getAttesterCtypeDetail));

export { claimerRoute };
