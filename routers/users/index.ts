import { 
    Router, 
    Request, 
    Response, 
} from 'express';
import { StatusCodes } from 'http-status-codes';
import {
    //User,
    PutUserBodyRequest
} from './interfaces';
import { 
    checkIdParam,
    checkBody,
} from '../../middlewares';
import{
    postUserValidation,
    putUserValidation
} from './validations';
import { User } from '../../db/models/User';
import { hash } from "bcrypt";
import { PostUserBodyRequest, UserCreateOptions } from './interfaces';

export const router = Router();

router.post('/users/register',checkBody,postUserValidation, async (
    req: Request<{},{},PostUserBodyRequest>, res: Response) => {  
    try {
        const { name, surname, email, password, role } = req.body;
        const hashedPassword = await hash(password, 10);
        const user = await User.create({
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

router.get('/users', async (req, res) => {
    try {
        const users = await User.findAll<User>();
        return res.status(StatusCodes.OK).json({
            users: users,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while getting users from DB:" + error
        });
    }
});

router.get('/users/:id',checkIdParam, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findByPk<User>(id);
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

router.put('/users/:id',checkIdParam,checkBody,putUserValidation, async (
        req: Request<{id:any},{},PutUserBodyRequest>, 
        res
    ) => {
    const { id } = req.params;
    try {
        const updated_row = await User.update<User>(req.body, {
            where: { id: id }
        });
        if(!updated_row){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'This product does not exists!'
            });
            return;
        }
        const user = await User.findByPk<User>(id)
        return res.status(StatusCodes.OK).json({
            message: `User with id ${id} updated successfully!`,
            user: user,
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while updating user in DB: " + error
        });
    }
});

router.delete('/users/:id',checkIdParam, async (req, res) => {
    const { id } = req.params;
    try {
        const deleted_row = await User.destroy<User>({ where: { id: id } }); 
        if(!deleted_row){
            res.status(StatusCodes.NOT_FOUND).json({
                message: 'This product does not exists!'
            });
            return;
        }
        return res.status(StatusCodes.OK).json({
            message: `User deleted successfully!`
        });
    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "error while deleting user from DB:" + error
        });
    }
});