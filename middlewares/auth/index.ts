import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IError } from "../../lib/interfaces";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import { UserRoles } from "../../lib/interfaces";

const PUBLIC_KEY = fs.readFileSync(path.resolve("jwtRS256.key.pub"));

export const checkAuthtHeader = (req: Request, res: Response, next: NextFunction) => {
    console.log("checkAuthtHeader", req.headers.authorization);
    if (req.headers.authorization) {
        req.authToken = req.headers.authorization.split(" ")[1]
        next()
    } else {
        const error : IError = {
            status: StatusCodes.UNAUTHORIZED, 
            message: req.session.userRole === UserRoles.ADMIN ? "Missing authorization header":"You are not authorized! Only admins can do this operation!"
        } 
        next(error)
    }
}

export const checkBearerToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("checkBearerToken", req.authToken);
        let token = req.authToken
        let decodedtoken = jwt.verify(token, PUBLIC_KEY)
        req.userInfo = decodedtoken
        next()
    }catch (err) {
        const error : IError = {
            status: StatusCodes.UNAUTHORIZED, 
            message: req.session.userRole === UserRoles.ADMIN ? "Invalid token":"You are not authorized! Only admins can do this operation!"
        } 
        next(error)
    }
}

export const checkUserRole = (req: Request, res: Response, next: NextFunction) => {
    console.log("checkUserRole", req.userInfo);
    //UserRole can be only ADMIN because the token is provided only to admins
    //Is a general middleware that can be used in all the routes that need to check the user role in future
    //It's one more security check
    if (req.userInfo && req.userInfo.userRole === UserRoles.ADMIN) {
        next()
    } else {
        const error : IError = {
            status: StatusCodes.UNAUTHORIZED, 
            message: "Something was wrong! You are not authorized!"
        } 
        next(error)
    }
}
