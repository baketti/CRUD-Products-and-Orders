import { Router } from 'express';
import { User } from '../../db/models/User';
import { generateJWT } from '../../utils/generate-jwt';
import { StatusCodes } from 'http-status-codes';
import { checkAuthBody, checkAuthPassword } from './validations';
import { UserRoles } from '../../lib/interfaces';

export const router = Router();

router.post('/login',
    //authentication checks
    checkAuthBody,
    checkAuthPassword, 
    async (req ,res)=>{
        const { email } = req.body;
        try {
            const user = await User.findOne({
                where: {
                    email: email,
                }
            });      
            if(!req.session?.userId){        
                req.session.userId = user.getDataValue('id');
                req.session.userRole = user.getDataValue('role') as "admin" | "user";
                const { userId, userRole } = req.session;
                let token;
                if(userRole === UserRoles.ADMIN){
                    token = generateJWT({ userId, userRole });
                }
                req.session.save(err => {
                    if (err) {
                        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                            message: "Error while saving session: "+err
                        });
                    } else {
                        res.status(StatusCodes.ACCEPTED).json({
                            access_token: token || 'You don`t need the token! It`s only for admins!',
                            message: `You're logged in successfully! ${token ? 'Save the token to make requests!':''}`,
                        });
                    }
                });
            } else {
                return res.status(StatusCodes.OK).json({
                    user: user,
                    message: "You're already logged in!",
                });
            }
        }catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error while logging in user:" + error
            });
        }
    })