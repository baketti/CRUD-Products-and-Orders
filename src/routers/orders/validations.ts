import { body, validationResult,query } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IError } from '@/lib/interfaces';
import { PostOrderBodyRequest } from '@/lib/orders.interfaces';
import { getAllProductsIds } from '@/db/models/Product';

export const checkPostOrderBody = [
  body('productsIds').exists().withMessage('No products in the order'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let error: IError = {
        status: StatusCodes.BAD_REQUEST,
        message: errors.array().map(error => error.msg).join(''),
      }
      return next(error);
    }
    next();
  },
]

export const postOrderValidation = [
    body('productsIds').isArray().withMessage('Products must be an array'),
    body('productsIds.*').isNumeric().withMessage('Product ID must be a number'),
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

//Middleware to check if products to add to the order exist
export async function checkBodyProducts(
    req:Request<{},{},PostOrderBodyRequest>,
    res:Response,
    next:NextFunction
   ) {
    const { productsIds } = req.body;
    const allIds = await getAllProductsIds();
    const productsExist = productsIds.map(productId => allIds.includes(productId));
    if (productsExist.some(exists => !exists)) {
      let error:IError = {
        status: StatusCodes.BAD_REQUEST,
        message: "One or more products do not exist in the database."
      }
      next(error);
    }else {
      next();
    }
  }  