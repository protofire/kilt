import express from 'express';
import { Request, Response } from 'express';
import {
  getAttesterCtypeDetail,
  getAttesterCtypesForClaimer
} from '../controller/attesterCtypeController';
import { createCredential, getCredentialById, getCredentialsByDid } from '../controller/claimerController';

const claimerRoute = express.Router();

const errorHandler = (fn: any) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res))
    .catch(err => {
      console.error(err);
      res.status(500).send({ msg: err.message });
    });
};

claimerRoute.post('/credential', errorHandler(createCredential));
claimerRoute.get('/credential/:did', errorHandler(getCredentialsByDid));
claimerRoute.get('/credential/detail/:id', errorHandler(getCredentialById));
claimerRoute.get('/attesters/:did', errorHandler(getAttesterCtypesForClaimer));
claimerRoute.get('/attesters/detail/:id', errorHandler(getAttesterCtypeDetail));

export { claimerRoute };
