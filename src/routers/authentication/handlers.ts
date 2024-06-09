import { User } from '@/db/models/User';
import { generateJWT } from '@/utils/generate-jwt';
import { StatusCodes } from 'http-status-codes';
import { UserRoles } from '@/lib/interfaces';

async function postUserLogin(req ,res) {
    const { email } = req.body;
    try {
        const user = await User.findOne({
            where: {
                email: email,
            }
        });   
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: `No user found with email: ${email}`
            });
        } 
        const currentId = user.getDataValue('id');
        if(!req.session?.userId){        
            req.session.userId = currentId;
            req.session.userRole = user.getDataValue('role') as "admin" | "user";
            req.session.email = email;
            req.session.timestamp = Date.now();
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
                        message: `You're logged in successfully! ${token ? "Save the token to make requests!":""}`,
                    });
                }
            });
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({
                message: "Please, logout first!",
            });
        }
    }catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Error while logging in user:" + error
        });
    }
}

async function getUserLogout(req, res) {
    if (!req.session?.userId) {
        return res.status(StatusCodes.METHOD_NOT_ALLOWED).json({
            message: "You're already logged out!"
        });
    }
    req.session.destroy(err => {
        if(err) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: "Error while logging out user: "+err
            });
        }
        res.clearCookie('connect.sid');
        res.status(StatusCodes.OK).json({
            message: "You're logged out successfully!"
        });
    });
}

export {
    postUserLogin,
    getUserLogout,
}