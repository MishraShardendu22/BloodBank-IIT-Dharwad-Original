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
  verifyAdmin,
} from '../../controller/admin.controller';

import { Router } from 'express';
import { adminMiddleware } from '../../middleware/admin.middleware';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);

router.get('/getDonors', adminMiddleware, getDonors);
router.get('/verifyAdmin', adminMiddleware, verifyAdmin);
router.get('/getPatients', adminMiddleware, getPatients);
router.get('/getAnalytics', adminMiddleware, getAnalytics);
router.get('/getOrganistion', adminMiddleware, getOrganistion);
router.get('/getBloodRequests', adminMiddleware, getBloodRequests);
router.get('/getDonationLocations', adminMiddleware, getDonationLocations);

router.delete('/deleteDonor', adminMiddleware, deleteDonor);
router.delete('/deletePatient', adminMiddleware, deletePatient);
router.delete('/deleteOrganisation', adminMiddleware, deleteOrganisation);
router.delete(
  '/deleteDonationLocation',
  adminMiddleware,
  deleteDonationLocation
);
router.delete('/deleteBloodRequest', adminMiddleware, deleteBloodRequest);

// Routes Go Here

export default router;
