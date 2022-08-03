import express from 'express';
import { getCredentialsByDid } from '../controller/claimController';
const claimerRoute = express.Router()

claimerRoute.get("/credential/:did", getCredentialsByDid);

export { claimerRoute };