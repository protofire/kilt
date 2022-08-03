import express from 'express';
import { example, getCredentialsByDid } from '../controller/claimController';
const claimerRoute = express.Router()

// define the home page route
claimerRoute.get('/credential/example', example);
claimerRoute.get("/credential/:did", getCredentialsByDid);

export { claimerRoute };