import { login, register } from '../../controller/patient.controller';
import { Router } from 'express';
const router = Router();

// Routes Go Here

router.post('/register', register);
router.post('/login', login);

// Routes Go Here

export default router;
