import {   
  login,
  register, 
  postBloodRequest,
  getBloodRequests,
  getBloodAvailable,
  deleteBloodRequest, 
  verifyPatient
} from '../../controller/patient.controller';

import { Router } from 'express';
import { patientMiddleware } from '../../middleware/patient.middleware';
const router = Router();

// Routes Go Here


router.post('/login', login);
router.post('/register', register);
router.get('/verifyPatient',patientMiddleware, verifyPatient);
router.get('/bloodRequests',patientMiddleware, getBloodRequests);
router.post('/bloodRequest',patientMiddleware, postBloodRequest);
router.get('/bloodAvailable',patientMiddleware, getBloodAvailable);
router.delete('/bloodRequest/:requestId',patientMiddleware, deleteBloodRequest);

// Routes Go Here

export default router;
