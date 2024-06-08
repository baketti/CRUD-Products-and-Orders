import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../lib/interfaces';

export function checkUserAuthentication(req: Request, res: Response, next: NextFunction){
    if (!req.session || !req.session.userId) {
        const error: IError = {
            status: StatusCodes.UNAUTHORIZED,
            message: "You are not authorized! Please login first!"
        }
        return next(error);
    } else {
      next();
    }
  }

export function checkIdParam(req:Request,res:Response,next:NextFunction) {
  try{
    if(req.params.id && parseInt(req.params.id)) 
      next()
    else {
      let error: IError = {
        status: StatusCodes.BAD_REQUEST,
        message: "Invalid ID!"
      }
      next(error)
    }
  }catch(err){
    let error: IError = {
      status: StatusCodes.BAD_REQUEST,
      message: err
    };
    next(error);
  }
}

export function checkBody(req:Request,res:Response,next:NextFunction) {
  if(!req.body || Object.keys(req.body).length === 0){
    let error: IError = {
      status:StatusCodes.BAD_REQUEST,
      message: "Missing data!"
    }
    next(error)
  }else {
    next()
  }
}

export function routeNotFoundHandler(req:Request,res:Response,next:NextFunction){
  let error: IError = {
    status: StatusCodes.NOT_FOUND,
    message: "This route does not exist!"
  }
  next(error)
}

export function errorHandler(err: IError,req:Request,res:Response,next:NextFunction){
  if (res.headersSent) {
    return next(err);
  }
  res.status(
    err.status || StatusCodes.INTERNAL_SERVER_ERROR 
  ).send({
      message: err.message
    })
}