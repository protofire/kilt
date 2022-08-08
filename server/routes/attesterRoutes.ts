import express from 'express';
import { isAttester } from '../controller/attesterController';
import { getCtypes } from '../controller/ctypesController';
import {
  getRequestDetail,
  getRequests
} from '../controller/requestsController';
import {
  createAttesterCtype,
  deleteAttesterCtype,
  getAttesterCtypesForAttester
} from '../controller/attesterCtypeController';

const attesterRoute = express.Router();

attesterRoute.get('/isAttester/:did', isAttester);
attesterRoute.get('/ctypes/all/:did', getCtypes);
attesterRoute.get('/ctypes/:did', getAttesterCtypesForAttester);
attesterRoute.post('/ctypes', createAttesterCtype);
attesterRoute.delete('/ctypes/:did/:id', deleteAttesterCtype);
attesterRoute.get('/request/:did', getRequests);
attesterRoute.get('/request/detail/:id/:did', getRequestDetail);

export { attesterRoute };
