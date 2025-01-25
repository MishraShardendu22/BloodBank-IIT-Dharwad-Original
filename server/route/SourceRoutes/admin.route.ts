import { 
    login, 
    register 
} from '../../controller/admin.controller';

import { Router } from 'express';
const router = Router();

// Routes Go Here

router.post('/login', login);
router.post('/register', register);

// Routes Go Here

export default router;
