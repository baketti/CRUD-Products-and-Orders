import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { checkIdParam,checkBody } from '@/middlewares';
import{ checkPostUserBody, postUserValidation, putUserValidation } from './validations'; 
import { User } from '@/db/models/User';
import { hash } from "bcrypt";
import { PostUserBodyRequest, UserCreateOptions, PutUserBodyRequest } from '@/lib/users.interfaces';

export const router = Router();

router.post('/register',checkPostUserBody,postUserValidation, async (
    req: Request<{},{},PostUserBodyRequest>, res: Response) => {  
    try {
        const { name, surname, email, password, role } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = await User.create<User, UserCreateOptions>({
            name, 
            surname, 
            email, 
            password: hashedPassword, 
            role
        });
        return res.status(StatusCodes.OK).json({
            user: user,
            message: "User registered successfully!",
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while saving user to DB:" + error
        });
    }
});

router.get('/me', async (req, res) => {
    const { userId } = req.session;
    try {
        const user = await User.findByPk<User>(userId);
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User not found"
            });
        }
        return res.status(StatusCodes.OK).json({
            user: user,       
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while getting user from DB:" + error
        });
    }
});

router.put('/me',checkBody,putUserValidation, async (
        req: Request<{id:any},{},PutUserBodyRequest>, 
        res
    ) => {
        const { userId } = req.session;
    try {
        const updated_row = await User.update<User>(req.body, {
            where: { id: userId }
        });
        if(!updated_row){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'Not found!'
            });
            return;
        }
        const user = await User.findByPk<User>(userId)
        return res.status(StatusCodes.OK).json({
            message: `Updated successfully!`,
            user: user,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while updating user in DB: " + error
        });
    }
});

router.delete('/me',checkIdParam, async (req, res) => {
    const { userId } = req.session;
    try {
        const deleted_row = await User.destroy<User>({ where: { id: userId } }); 
        if(!deleted_row){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'Not found'
            });
            return;
        }
        return res.status(StatusCodes.OK).json({
            message: `Deleted successfully!`
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while deleting user from DB:" + error
        });
    }
});