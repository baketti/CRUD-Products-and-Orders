import { Router } from 'express';
import { checkBody } from '@/middlewares';
import{ checkPostUserBody, postUserValidation, putUserValidation } from './validations'; 
import {
    postUserRegistration,
    getUsersMe,
    putUsersMe,
    deleteUsersMe
} from './handlers';

export const router = Router();

router.post('/register', checkPostUserBody, postUserValidation, postUserRegistration);

router.get('/me', getUsersMe);

router.put('/me', checkBody, putUserValidation, putUsersMe);

router.delete('/me', deleteUsersMe);