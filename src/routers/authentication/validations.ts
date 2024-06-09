import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IError } from "../../lib/interfaces";
import { compare,hash } from "bcrypt";

export function checkAuthBody(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
        const error: IError = {
            message: "Missing data, all data are required!",
            status: StatusCodes.BAD_REQUEST
        };
        next(error);
        return;
    }else if(req.session?.email === email){
        const error: IError = {
            message: "You are already logged in!",
            status: StatusCodes.OK
        };
        next(error);
        return;
    }else if(req.session?.userId && req.session?.email !== email){
        const error: IError = {
            message: "Please, logout first!",
            status: StatusCodes.OK
        };
        next(error);
        return;
    }
    else {
        next();
    }
}

export async function checkAuthPassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    const hashedPassword = await hash(password, 10);
    const isValid = await compare(password, hashedPassword);
    if (!isValid) {
        const error: IError = {
            message: "Invalid credentials!",
            status: StatusCodes.BAD_REQUEST
        };
        next(error);
        return;
    }
    next()
}
