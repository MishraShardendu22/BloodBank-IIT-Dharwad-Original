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
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.get('/getDonors', getDonors);
router.get('/getPatients', getPatients);
router.get('/getAnalytics', getAnalytics);
router.delete('/deleteDonor', deleteDonor);
router.get('/getOrganistion', getOrganistion);
router.delete('/deletePatient', deletePatient);
router.get('/getBloodRequests', getBloodRequests);
router.delete('/deleteOrganisation', deleteOrganisation);
router.get('/getDonationLocations', getDonationLocations);
router.delete('/deleteDonationLocation', deleteDonationLocation);
router.delete('/deleteBloodRequest', deleteBloodRequest);

// Routes Go Here

export default router;
