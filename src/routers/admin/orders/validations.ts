import { Response, Request, NextFunction } from "express";
import { query, validationResult } from "express-validator";
import { GetOrdersRequest, OrdersQueryParams } from "@/lib/orders.interfaces";
import { IError } from "@/lib/interfaces";
import { getAllProductsIds } from "@/db/models/Product";
import { StatusCodes } from "http-status-codes";

export const getOrdersQueryParamsValidation = [
    query('from').optional().isDate().withMessage('Invalid date format for from parameter'),
    query('to').optional().isDate().withMessage('Invalid date format for to parameter'),
    query('to').optional().custom((value, { req }) => {
      if(value && !req.query.from) {
        return false;
      }
      return true;
    }).withMessage('Cannot search only by end date'),
    query('to').optional().custom((value, { req }) => {
      if(req.query.from && new Date(value) < new Date(req.query.from)) {
        return false;
      }
      return true;
    }).withMessage('Invalid Date interval!'),
    query('productsIds').optional().custom((value) => {
      if (Array.isArray(value)) {
        if (!value.every(id => !isNaN(parseInt(id)))) {
          return false;
        }
      } else if (isNaN(parseInt(value))) {
        return false;
      }
      return true;
    }).withMessage('productsIds must be a string or an array of ids'),
    query().custom((value, { req }) => {
      const { from, productsIds } = req.query as OrdersQueryParams;
      if (from && productsIds) {
        return false;
      }
      return true;
    }).withMessage('Cannot search by date and products'),
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

//Middleware to check if there are query params and to define the type of search
  export async function checkQueryStringParams(
    request:Request,
    res:Response,
    next:NextFunction
  ) {    
      const req = request as GetOrdersRequest;
      //if there are no query params, skip this middleware
      if(!req.query || Object.keys(req.query).length === 0) return next();
      //if there are query params, we assume it's a filtered search
      req.isFilteredSearch = true;
      //if from and to are provided, we will query by date interval
      if(req.query.from && req.query.to) {
        req.byDateInterval = true;
        return next();
      //if only from is provided, we will query by date
      //from will be like createdAt
      }else if(req.query.from && !req.query.to) {
        req.byDate = true;
        return next();
      }
      //if productsIds are provided, we will query by products
        const { productsIds } = req.query;
      //get all products ids from the database to check if the provided ids are valid
      try{
        const allIds = await getAllProductsIds();
        //if productsIds is only one
        if(!Array.isArray(productsIds)) {
          //if the product is not in the database, return an error
          if(!allIds.includes(parseInt(productsIds))) {
            req.isFilteredSearch = false;
            let error:IError = {
              status: StatusCodes.BAD_REQUEST,
              message: "This product does not exist"
            }
            return next(error)
          }
          //the product exists, so we will query by products
          req.byProducts = true;
          return next();
        }
        //here productsIds is an array
          const productsExist = productsIds.every(
            productId => allIds.includes(parseInt(productId))
          );
          //if one or more products do not exist, return an error
          if(!productsExist) {
            req.isFilteredSearch = false;
            let error:IError = {
              status: StatusCodes.BAD_REQUEST,
              message: "One or more products do not exist"
            }
            return next(error)
          } 
        }catch(e){       
          req.isFilteredSearch = false;
          let error:IError = {
            status: StatusCodes.INTERNAL_SERVER_ERROR,
            message: e
          }
          return next(error)
        }
        //all ids are valid, so we will query by products
        req.byProducts = true;
        next()
      }