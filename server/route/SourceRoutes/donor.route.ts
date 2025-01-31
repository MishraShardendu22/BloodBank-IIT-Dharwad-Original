import { 
  login,
  register,
  verifyDonor,
  getDonationHistory,
  getDonationLocation,
  deleteDonor, 
  resetPassword, 
  sendOtpDonor, 
  verifyOtpDonor
} from '../../controller/donor.controller';
import { Router } from 'express';
import { donorMiddleware } from '../../middleware/donor.middleware';
const router = Router();

// Routes Go Here


router.post('/login', login);
router.post('/register', register);
router.post('/sendOtpDonor',sendOtpDonor);
router.post('/resetPassDonor',resetPassword);
router.post('/verifyOtpDonor',verifyOtpDonor);

router.get('/donation-location',donorMiddleware ,getDonationLocation);
router.get('/donation-history',donorMiddleware ,getDonationHistory);
router.get('/verifyDonor',donorMiddleware ,verifyDonor);

router.delete('/deleteDonor',donorMiddleware ,deleteDonor);


// Routes Go Here

export default router;
