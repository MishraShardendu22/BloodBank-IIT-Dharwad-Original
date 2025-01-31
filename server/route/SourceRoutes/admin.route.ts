import { 
  deleteDonationLocation,
  getDonationLocations,
  deleteOrganisation,
  deleteBloodRequest,
  getBloodRequests,
  getOrganisation,
  deletePatient,
  getAnalytics,
  deleteDonor,
  verifyAdmin,
  getPatients,
  deleteAdmin,
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
router.get('/verifyAdmin',adminMiddleware ,verifyAdmin);
router.get('/getAnalytics',adminMiddleware ,getAnalytics);
router.get('/getOrganisation',adminMiddleware ,getOrganisation);
router.get('/getBloodRequests',adminMiddleware ,getBloodRequests);
router.get('/getDonationLocations',adminMiddleware ,getDonationLocations);
router.delete('/deleteDonor',adminMiddleware ,deleteDonor);//
router.delete('/deletePatient',adminMiddleware ,deletePatient);//
router.delete('/deleteOrganisation',adminMiddleware ,deleteOrganisation);//
router.delete('/deleteDonationLocation',adminMiddleware ,deleteDonationLocation);//
router.delete('/deleteBloodRequest',adminMiddleware ,deleteBloodRequest);//
router.delete('/deleteAdmin',adminMiddleware ,deleteAdmin);//

// Routes Go Here


export default router;
