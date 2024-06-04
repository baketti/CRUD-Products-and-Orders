import { 
    Router, 
} from 'express';;
import { compare } from "bcrypt";
import { randomBytes } from "crypto";
import { User } from '../../db/models/User';
import { SequelizeDB } from '../../db';

const router = Router();

router.post('/login', async (req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "Missing data, all data are required!"
        });
        return;
    }
    try {
        const user = await User.findOne({
            where: {
                email: email,
                password: password
            }
        });
        const isValid = await compare(password, user?.get('password'));
        if (!user || !isValid) {
            res.status(401).json({
                message: "Invalid credentials!"
            })
            return;
        }
        //TODO : ADD SESSION MANAGEMENT
        const token = randomBytes(20).toString('hex');
        const { Session } = SequelizeDB.getConnection().models;
        await Session.create({ 
            token,
            userId: user.get('id'),
            userRole: user.get('role')
        })
        return res.status(200).json({
            user: user,
            accss_token: token,
            message: "User logged in successfully!",
        });
    } catch (error) {
        return res.status(500).json({
            message: "error while logging in user:" + error
        });
    }
})