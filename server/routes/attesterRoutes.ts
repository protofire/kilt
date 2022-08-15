import express from 'express';
import { getCtypes } from '../controller/ctypesController';
import {
  confirmRequest,
  getRequestDetail,
  getRequests,
  verifyRequest
} from '../controller/credentialController';
import {
  createAttesterCtype,
  deleteAttesterCtype,
  getAttesterCtypesForAttester
} from '../controller/attesterCtypeController';

const attesterRoute = express.Router();

attesterRoute.get('/ctypes/all/:did', getCtypes);
attesterRoute.get('/ctypes/:did', getAttesterCtypesForAttester);
attesterRoute.post('/ctypes', createAttesterCtype);
attesterRoute.delete('/ctypes/:did/:id', deleteAttesterCtype);
attesterRoute.get('/request/detail/:id/:did', getRequestDetail);
attesterRoute.post('/request/verify/:id/:did', verifyRequest);
attesterRoute.post('/request/confirm/:id/:did', confirmRequest);
attesterRoute.get('/request/:did', getRequests);

export { attesterRoute };
