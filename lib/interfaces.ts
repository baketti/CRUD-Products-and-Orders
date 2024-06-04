import { StatusCodes } from "http-status-codes";

export interface IError {
    status: StatusCodes,
    message: string
}