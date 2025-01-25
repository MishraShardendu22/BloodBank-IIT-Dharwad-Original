import { 
    login,
    register,
    addBloodDonated,
    updateInventory,
    getBloodRequests,
    addDonationLocation,
    completeBloodRequest,
    updateDonationLocation,
    deleteDonationLocation,
} from '../../controller/organisation.controller';
import { Router } from 'express';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.put('/updateInventory', updateInventory);
router.post('/addBloodDonated', addBloodDonated);
router.get('/getBloodRequests', getBloodRequests);
router.post('/addDonationLocation', addDonationLocation);
router.put('/completeBloodRequest', completeBloodRequest);
router.put('/updateDonationLocation', updateDonationLocation);
router.delete('/deleteDonationLocation', deleteDonationLocation);

// Routes Go Here

export default router;
