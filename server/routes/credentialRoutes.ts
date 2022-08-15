
import express from 'express';
import { createCredential } from '../controller/credentialController';

const credentialRoute = express.Router();

credentialRoute.post('/', createCredential);

export { credentialRoute };
