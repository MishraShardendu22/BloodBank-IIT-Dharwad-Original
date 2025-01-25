import { 
  deleteDonationLocation,
  getDonationLocations,
  deleteOrganisation,
  deleteBloodRequest,
  getBloodRequests,
  getOrganistion,
  deletePatient,
  getAnalytics,
  deleteDonor,
  getPatients,
  getDonors,
  register, 
  login,
} from '../../controller/admin.controller';

import { Router } from 'express';
import { adminMiddleware } from '../../middleware/admin.middleware';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.get('/getDonors',adminMiddleware ,getDonors);
router.get('/getPatients',adminMiddleware ,getPatients);
router.get('/getAnalytics',adminMiddleware ,getAnalytics);
router.delete('/deleteDonor',adminMiddleware ,deleteDonor);
router.get('/getOrganistion',adminMiddleware ,getOrganistion);
router.delete('/deletePatient',adminMiddleware ,deletePatient);
router.get('/getBloodRequests',adminMiddleware ,getBloodRequests);
router.delete('/deleteOrganisation',adminMiddleware ,deleteOrganisation);
router.get('/getDonationLocations',adminMiddleware ,getDonationLocations);
router.delete('/deleteDonationLocation',adminMiddleware ,deleteDonationLocation);
router.delete('/deleteBloodRequest',adminMiddleware ,deleteBloodRequest);

// Routes Go Here

export default router;
