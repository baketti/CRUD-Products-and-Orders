import { body, validationResult } from 'express-validator';
import { UserRoles } from '../../db/models/User/interfaces';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '../../lib/interfaces';

export const postUserValidation = [
    body('name').exists().withMessage('Name is required').isString().withMessage('Name must be a string'),
    body('surname').exists().withMessage('Surname is required').isString().withMessage('Surname must be a string'),
    body('email').exists().withMessage('Email is required').isEmail().withMessage('Email must be a valid email'),
    body('password').exists().withMessage('Password is required').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('role').optional().isIn(Object.values(UserRoles)).withMessage('Role must be user or admin'),
    // Handle validation errors
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error: IError = {
          status: StatusCodes.BAD_REQUEST,
          message: errors.array().map(error => error.msg).join(', ')
        }
        return next(error);
      }
      next();
    },
  ];

  export const putUserValidation = [
    body('name').optional().isString().withMessage('Name must be a string'),
    body('surname').optional().isString().withMessage('Surname must be a string'),
    body('email').optional().isEmail().withMessage('Email must be a valid email'),
    body('password').optional().isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('role').optional().isIn(Object.values(UserRoles)).withMessage('Role must be user or admin'),
    // Handle validation errors
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        let error: IError = {
          status: StatusCodes.BAD_REQUEST,
          message: errors.array().map(error => error.msg).join(', ')
        }
        return next(error);
      }
      next();
    },
  ];
  