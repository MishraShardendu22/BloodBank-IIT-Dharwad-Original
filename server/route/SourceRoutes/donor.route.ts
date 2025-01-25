import { 
  login,
  register, 
  getDonationHistory,
  getDonationLocation
} from '../../controller/donor.controller';
import { Router } from 'express';
import { donorMiddleware } from '../../middleware/donor.middleware';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.get('/donation-history',donorMiddleware ,getDonationHistory);
router.get('/donation-location',donorMiddleware ,getDonationLocation);

// Routes Go Here

export default router;
