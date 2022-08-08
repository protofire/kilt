import express from 'express';
import {
  isAttester,
  getAttesterCtypes,
  createCtype,
  deleteCtype,
  getCtypes,
  getRequests
} from '../controller/attesterController';

const attesterRoute = express.Router();

attesterRoute.get('/isAttester/:did', isAttester);
attesterRoute.get('/ctypes/all/:did', getCtypes);
attesterRoute.get('/ctypes/:did', getAttesterCtypes);
attesterRoute.post('/ctypes', createCtype);
attesterRoute.delete('/ctypes/:did/:id', deleteCtype);
attesterRoute.get('/request/:did', getRequests);

export { attesterRoute };
