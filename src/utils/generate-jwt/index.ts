import jwt from "jsonwebtoken";
import fs from "fs";
import { UserInfo } from "@/lib/interfaces";

export function generateJWT(payload: UserInfo):string {
    const PRIVATE_KEY = fs.readFileSync("./src/keys/jwtRS256.key")
    const token =  jwt.sign({
            ...payload,
            exp: Math.floor(Date.now() / 1000) + (60*10)//10min
        }, 
        PRIVATE_KEY,{ 
            algorithm: "RS256",
        },
    )
    return token;
}