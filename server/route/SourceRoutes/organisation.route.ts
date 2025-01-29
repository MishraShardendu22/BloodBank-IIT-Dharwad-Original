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
    getInventory,
    verifyOrganisation,
    getDonationLocations,
} from '../../controller/organisation.controller';
import { Router } from 'express';
import { organisationMiddleware } from '../../middleware/organisation.middleware';
const router = Router();

// Routes Go Here


router.post('/login', login);
router.post('/register', register);
router.get('/getInventory', organisationMiddleware, getInventory)
router.post('/addBloodDonated', organisationMiddleware, addBloodDonated);
router.get('/getBloodRequests', organisationMiddleware, getBloodRequests);
router.patch('/updateInventory', organisationMiddleware, updateInventory);
router.get('/verifyOrganisation', organisationMiddleware, verifyOrganisation);
router.post('/addDonationLocation', organisationMiddleware, addDonationLocation);
router.patch('/completeBloodRequest', organisationMiddleware, completeBloodRequest);
router.patch('/updateDonationLocation', organisationMiddleware, updateDonationLocation);
router.delete('/deleteDonationLocation', organisationMiddleware, deleteDonationLocation);
router.get('/getDonationLocations', organisationMiddleware, getDonationLocations)

// Routes Go Here

export default router;
