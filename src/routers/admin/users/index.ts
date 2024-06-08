import { Request, Router } from "express";
import { User } from "@/db/models/User";
import { StatusCodes } from "http-status-codes";
import { checkBody, checkIdParam } from "@/middlewares";
import { PutUserBodyRequest } from "@/lib/users.interfaces";
import { putUserValidation } from "./validations";
import {
    getUsers,
    getUsersByUserId,
    putUsersByUserId,
    deleteUsersByUserId
} from './handlers';

export const router = Router();

router.get('/', getUsers);

router.get('/:id', checkIdParam, getUsersByUserId);

router.put('/:id', checkIdParam, checkBody, putUserValidation, putUsersByUserId);

router.delete('/:id', checkIdParam, deleteUsersByUserId);