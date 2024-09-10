import { Router } from 'express';
import {
	getUserHandler,
	updateSettingsHandler,
} from '../controllers/user.controller';

const userRoutes = Router();

userRoutes.get('/', getUserHandler);
userRoutes.put('/settings', updateSettingsHandler);

export default userRoutes;
