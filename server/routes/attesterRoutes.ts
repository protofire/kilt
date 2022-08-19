import express from 'express';
import { getCtypes } from '../controller/ctypesController';
import { Request, Response } from 'express';
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

const errorHandler = (fn: any) => (req: Request, res: Response) => {
  Promise.resolve(fn(req, res))
    .catch(err => {
      res.status(500).send({ msg: err.message });
    });
};

const attesterRoute = express.Router();

attesterRoute.get('/ctypes/all/:did', errorHandler(getCtypes));
attesterRoute.get('/ctypes/:did', errorHandler(getAttesterCtypesForAttester));
attesterRoute.post('/ctypes', errorHandler(createAttesterCtype));
attesterRoute.delete('/ctypes/:did/:id', errorHandler(deleteAttesterCtype));
attesterRoute.get('/request/detail/:id/:did', errorHandler(getRequestDetail));
attesterRoute.post('/request/verify/:id/:did', errorHandler(verifyRequest));
attesterRoute.post('/request/confirm/:id/:did', errorHandler(confirmRequest));
attesterRoute.get('/request/:did', errorHandler(getRequests));



export { attesterRoute };
