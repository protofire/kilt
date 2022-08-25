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

attesterRoute.get('/ctypes/all', authenticateToken, errorHandler(getCtypes));
attesterRoute.get('/ctypes', authenticateToken, errorHandler(getAttesterCtypesForAttester));
attesterRoute.post('/ctypes', authenticateToken, errorHandler(createAttesterCtype));
attesterRoute.delete('/ctypes/:id', authenticateToken, errorHandler(deleteAttesterCtype));
attesterRoute.get('/request/detail/:id', authenticateToken, errorHandler(getRequestDetail));
attesterRoute.post('/request/verify/:id', authenticateToken, errorHandler(verifyRequest));
attesterRoute.post('/request/confirm/:id', authenticateToken, errorHandler(confirmRequest));
attesterRoute.get('/request', authenticateToken, errorHandler(getRequests));



export { attesterRoute };
