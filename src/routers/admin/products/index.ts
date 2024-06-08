import { Router } from "express";
import { checkBody, checkIdParam } from "@/middlewares";
import { checkPostProductBody, postProductValidation, putProductValidation } from "./validations";
import {
    postAdminProducts,
    putAdminProductsByProductId,
    deleteAdminProductsByProductId
} from './handlers';

export const router = Router();

router.post("/", checkPostProductBody, postProductValidation, postAdminProducts);

router.put("/:id", checkIdParam, checkBody, putProductValidation, putAdminProductsByProductId);

router.delete("/:id", checkIdParam, deleteAdminProductsByProductId);