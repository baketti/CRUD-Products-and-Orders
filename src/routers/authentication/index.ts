import { Router } from 'express';
import { checkAuthBody, checkAuthPassword } from './validations';
import { postUserLogin, getUserLogout } from './handlers';

export const router = Router();

router.post('/login', checkAuthBody, checkAuthPassword, postUserLogin);

router.get('/logout', getUserLogout);