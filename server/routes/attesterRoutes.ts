import express from 'express';
import { getCtypes } from '../controller/ctypesController';
import {
  createAttesterCtype,
  deleteAttesterCtype,
  getAttesterCtypesForAttester
} from '../controller/attesterCtypeController';
import {
  confirmRequest,
  getRequestDetail,
  getRequests,
  verifyRequest
} from '../controller/attesterController';
import { errorHandler, authenticateToken } from './middleware';

const attesterRoute = express.Router();

attesterRoute.get('/ctypes/all/:did', authenticateToken, errorHandler(getCtypes));
attesterRoute.get('/ctypes/:did', authenticateToken, errorHandler(getAttesterCtypesForAttester));
attesterRoute.post('/ctypes', authenticateToken, errorHandler(createAttesterCtype));
attesterRoute.delete('/ctypes/:did/:id', authenticateToken, errorHandler(deleteAttesterCtype));
attesterRoute.get('/request/detail/:id/:did', authenticateToken, errorHandler(getRequestDetail));
attesterRoute.post('/request/verify/:id/:did', authenticateToken, errorHandler(verifyRequest));
attesterRoute.post('/request/confirm/:id/:did', authenticateToken, errorHandler(confirmRequest));
attesterRoute.get('/request/:did', authenticateToken, errorHandler(getRequests));



export { attesterRoute };
