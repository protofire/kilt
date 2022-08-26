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
import { handleError, auth } from './middleware/middleware';

const attesterRoute = express.Router();

attesterRoute.get('/ctypes/all', auth, handleError(getCtypes));
attesterRoute.get('/ctypes', auth, handleError(getAttesterCtypesForAttester));
attesterRoute.post('/ctypes', auth, handleError(createAttesterCtype));
attesterRoute.delete('/ctypes/:id', auth, handleError(deleteAttesterCtype));
attesterRoute.get('/request/detail/:id', auth, handleError(getRequestDetail));
attesterRoute.post('/request/verify/:id', auth, handleError(verifyRequest));
attesterRoute.post('/request/confirm/:id', auth, handleError(confirmRequest));
attesterRoute.get('/request', auth, handleError(getRequests));

export { attesterRoute };
