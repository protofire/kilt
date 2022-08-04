import express from 'express';
import { isAttester, getCtypes, createCtype, deleteCtype } from '../controller/attesterController';
const attesterRoute = express.Router()

attesterRoute.get('/isAttester/:did', isAttester);
attesterRoute.get('/ctypes/:did', getCtypes);
attesterRoute.post('/ctypes', createCtype);
attesterRoute.delete('/ctypes/:did/:id', deleteCtype);

export { attesterRoute };