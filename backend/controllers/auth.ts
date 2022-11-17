import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import db from "../utils/surrealdb";
import {comparePassword, hashPassword} from '../utils/auth';
import { config } from "dotenv";
config();

const SECRET: string = process.env.SECRET || "default-secret-key";
const JWT_EXPIRES: string = process.env.JWT_EXPIRES || "2 hours";

const authController = {
    login: async (req: Request, res: Response) => {  // Connection to the app
        if (!req.body) return res.status(400).json({ message: 'No body send' });
        if (!req.body.name || !req.body.password) {
            return res.status(400).json({ message: 'Please enter username and password' })
        }

        const users: User[] = await db.select("user");
        const user = users.find(u => u.name === req.body.name && comparePassword(req.body.password, u.password));
        if (!user) {
            return res.status(400).json({ message: 'Wrong login or password' });
        }
        const token = sign({
            id: user.id,
            username: user.name
        }, SECRET, { expiresIn: JWT_EXPIRES });
        return res.json({ access_token: token });
    },
    signin: async (req: Request, res: Response) => {  // Create a new user
        try {
            // Get users and check if mail or login not used
            const signUpUserData = req.body;
            const users: User[] = await db.select("user") ;
            const userExist = users 
                ? users.find((user: User) => user.name === signUpUserData.name || user.email === signUpUserData.mail) 
                : false
            if (!userExist) {
                const id = uuidv4();
                const user: User = await db.create(`user:⟨${id}⟩`,{
                    name: signUpUserData.name,
                    email: signUpUserData.email,
                    password: hashPassword(signUpUserData.password)
                });
                // Send token access
                const token = sign({
                    id: user.id,
                    username: user.name
                }, SECRET, { expiresIn: JWT_EXPIRES });

                return res.json({ access_token: token });
            }
            return res.status(400).json({ message: 'User already exist' });
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Error while signin'});
        }
    },
}

export default authController;