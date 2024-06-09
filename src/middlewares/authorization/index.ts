import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IError, UserInfo } from "@/lib/interfaces";
import jwt from "jsonwebtoken";
import fs from "fs";
import { UserRoles } from "@/lib/interfaces";
import { globalStore } from "@/utils/global-store";

const PUBLIC_KEY = fs.readFileSync("./src/keys/jwtRS256.key.pub");

export const checkAuthorizationHeader = (req: Request, res: Response, next: NextFunction) => {
    if (req.headers.authorization && req.session.userRole === UserRoles.ADMIN) {
        if(!req.headers.authorization.startsWith("Bearer ")){
            const error : IError = {
                status: StatusCodes.UNAUTHORIZED, 
                message: "Invalid authorization header, it should be a Bearer token!"
            } 
            next(error)
        }
        const jwt = req.headers.authorization.split(" ")[1];
        globalStore.setData("authToken", jwt);
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
        let token = globalStore.getData("authToken");
        let decodedtoken = jwt.verify(token, PUBLIC_KEY,(err: any,user:UserInfo)=>{
            if(err){
                if(err.name === "TokenExpiredError"){
                    return res.status(StatusCodes.FORBIDDEN).json({
                        message: "Token expired"
                    })
                }
                return res.status(StatusCodes.FORBIDDEN).json({
                    message: "Invalid token"
                })
            }
            return user
        })
        globalStore.setData("userInfo", decodedtoken);
        next()
    }catch (err) {
        const error : IError = {
            status: StatusCodes.UNAUTHORIZED, 
            message: req.session.userRole === UserRoles.ADMIN ? "Invalid token":"You are not authorized! Only admins can do this operation!"
        } 
        next(error)
    }
}

//UserRole can be only ADMIN because the token is provided only to admins
//Is a general middleware that can be used in all the routes that need to check the user role in future
//At the moment it's one more security check
export const checkUserRole = (req: Request, res: Response, next: NextFunction) => {
    const userInfo: UserInfo = globalStore.getData("userInfo");
    if (userInfo.userRole === UserRoles.ADMIN) {
        next()
    } else {
        const error : IError = {
            status: StatusCodes.UNAUTHORIZED, 
            message: "Something was wrong! You are not authorized!"
        } 
        next(error)
    }
}
