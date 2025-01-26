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
import { organisationMiddleware } from '../../middleware/organisation.middleware';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);
router.put('/updateInventory', organisationMiddleware, updateInventory);
router.post('/addBloodDonated', organisationMiddleware, addBloodDonated);
router.get('/getBloodRequests', organisationMiddleware, getBloodRequests);
router.post('/addDonationLocation', organisationMiddleware, addDonationLocation);
router.put('/completeBloodRequest', organisationMiddleware, completeBloodRequest);
router.put('/updateDonationLocation', organisationMiddleware, updateDonationLocation);
router.delete('/deleteDonationLocation', organisationMiddleware, deleteDonationLocation);

// Routes Go Here

export default router;
