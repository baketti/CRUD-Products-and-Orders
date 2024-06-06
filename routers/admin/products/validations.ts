import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '@/lib/interfaces';

export const postProductValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').isString().withMessage('Description must be a string').optional(),
    body('startDate').isDate().withMessage('StartDate must be a valid date'),
    body('endDate').isDate().withMessage('EndDate must be a valid date'),
    body('endDate').custom((value, { req }) => {
      if (value && req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
        return false;
      }
      return true;
    }).withMessage('Invalid date interval! End date must be after start date'),
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
  
  export const putProductValidation = [
    body('name').isString().withMessage('Name must be a string').optional(),
    body('price').isNumeric().withMessage('Price must be a number').optional(),
    body('description').isString().withMessage('Description must be a string').optional(),
    body('startDate').isDate().withMessage('StartDate must be a valid date').optional(),
    body('endDate').isDate().withMessage('EndDate must be a valid date').optional(),
    body('endDate').custom((value, { req }) => {
      if (value && req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
        return false;
      }
      return true;
    }).withMessage('End date must be after start date'),
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
  