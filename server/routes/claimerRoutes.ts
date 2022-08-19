import express from 'express';
import { Request, Response } from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypesForClaimer
} from '../controller/attesterCtypeController';
import { createCredential, getCredentialsByDid } from '../controller/claimerController';

const claimerRoute = express.Router();

const errorHandler = (fn: any) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res))
    .catch(err => {
      res.status(500).send({ msg: err.message });
    });
};

claimerRoute.post('/credential', errorHandler(createCredential));
claimerRoute.get('/credential/:did', errorHandler(getCredentialsByDid));
claimerRoute.get('/attesters/:did', errorHandler(getAttesterCtypesForClaimer));
claimerRoute.get('/attesters/detail/:id', errorHandler(getAttesterCtypeDetail));

export { claimerRoute };
