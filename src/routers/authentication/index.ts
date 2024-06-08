import { Router } from 'express';
import { checkAuthBody, checkAuthPassword } from './validations';
import { postUserLoginAuth, getUserLogout } from './handlers';

export const router = Router();

router.post('/login', checkAuthBody, checkAuthPassword, postUserLoginAuth);

router.get('/logout', getUserLogout);