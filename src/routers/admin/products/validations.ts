import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '@/lib/interfaces';

export const checkPostProductBody =  [
    body('name').exists().withMessage('Name is required'),
    body('price').exists().withMessage('Price is required'),
    body('startDate').exists().withMessage('StartDate is required'),
    body('endDate').exists().withMessage('EndDate is required'),
    body('endDate').custom((value, { req }) => {
      if (value && req.body.startDate && new Date(value) <= new Date(req.body.startDate)) {
        return false;
      }
      return true;
    }).withMessage('Invalid date interval! End date must be after start date'),
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

export const postProductValidation = [
    body('name').isString().withMessage('Name must be a string'),
    body('price').isNumeric().withMessage('Price must be a number'),
    body('description').isString().withMessage('Description must be a string').optional(),
    body('startDate').isDate().withMessage('StartDate must be a valid date: yyyy-mm-dd or yyyy/mm/dd'),
    body('endDate').isDate().withMessage('EndDate must be a valid date: yyyy-mm-dd or yyyy/mm/dd'),
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
    body('startDate').isDate().withMessage('StartDate must be a valid date: yyyy-mm-dd or yyyy/mm/dd').optional(),
    body('endDate').isDate().withMessage('EndDate must be a valid date: yyyy-mm-dd or yyyy/mm/dd').optional(),
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
  