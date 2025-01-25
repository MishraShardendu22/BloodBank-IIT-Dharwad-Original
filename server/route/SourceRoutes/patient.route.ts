import {   
  login,
  register, 
  getBloodRequests,
  getBloodAvailable,
  deleteBloodRequest 
} from '../../controller/patient.controller';

import { Router } from 'express';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.get('/bloodRequests', getBloodRequests);
router.get('/bloodAvailable', getBloodAvailable);
router.delete('/bloodRequest/:id', deleteBloodRequest);

// Routes Go Here

export default router;
