import { Request, Router } from "express";
import { User } from "@/db/models/User";
import { StatusCodes } from "http-status-codes";
import { checkBody, checkIdParam } from "@/middlewares";
import { PutUserBodyRequest } from "@/lib/users.interfaces";
import { putUserValidation } from "./validations";

export const router = Router();

router.get('/',  
    async (req, res) => {
        try {
            console.log("GET /users", req.session);
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

router.get('/:id',checkIdParam, async (req, res) => {
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

router.put('/:id',checkIdParam,checkBody,putUserValidation, async (
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

router.delete('/:id',checkIdParam, async (req, res) => {
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