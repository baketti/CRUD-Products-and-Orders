import jwt from "jsonwebtoken";
import fs from "fs";
import { UserInfo } from "../../lib/interfaces";

export function generateJWT(payload: UserInfo):string {
    const PRIVATE_KEY = fs.readFileSync("jwtRS256.key")
    const token =  jwt.sign(
        payload, 
        PRIVATE_KEY, 
        { 
            algorithm: "RS256",
            expiresIn: 600//10min
        },
    )
    return token;
}