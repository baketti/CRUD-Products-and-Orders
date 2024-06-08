import { Router } from 'express';
import{ 
    postOrderValidation,
    checkBodyProducts,
    checkPostOrderBody
} from './validations';
import { checkIdParam } from '@/middlewares';
import { 
    postOrders,
    getOrdersMe,
    putOrdersMe,
    deleteOrdersMe
 } from './handlers'

export const router = Router();

router.post('/',
    checkPostOrderBody,
    postOrderValidation,
    checkBodyProducts, 
    postOrders
);

router.get('/me', getOrdersMe);

router.put('/me', putOrdersMe);

router.delete('/me/:id', checkIdParam, deleteOrdersMe);