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
    deleteOrganisation,
    getAnalytics,
} from '../../controller/organisation.controller';
import { Router } from 'express';
import { organisationMiddleware } from '../../middleware/organisation.middleware';
const router = Router();

// Routes Go Here


router.get('/getInventory', organisationMiddleware, getInventory)
router.get('/getBloodRequests', organisationMiddleware, getBloodRequests);
router.get('/verifyOrganisation', organisationMiddleware, verifyOrganisation);
router.get('/getDonationLocations', organisationMiddleware, getDonationLocations)
router.get('/getAnalytics', organisationMiddleware, getAnalytics)

router.post('/login', login);
router.post('/register', register);
router.post('/addBloodDonated', organisationMiddleware, addBloodDonated);
router.post('/addDonationLocation', organisationMiddleware, addDonationLocation);

router.patch('/updateInventory', organisationMiddleware, updateInventory);
router.patch('/completeBloodRequest', organisationMiddleware, completeBloodRequest);
router.patch('/updateDonationLocation', organisationMiddleware, updateDonationLocation);

router.delete('/deleteDonationLocation', organisationMiddleware, deleteDonationLocation);
router.delete('/deleteOrganisation', organisationMiddleware, deleteOrganisation);

// Routes Go Here

export default router;
