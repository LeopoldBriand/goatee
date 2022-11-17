import { verify } from "jsonwebtoken";
import { Request, Response,NextFunction } from "express";
import { config } from "dotenv";
config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const SECRET: string = process.env.SECRET || "default-secret-key";
    let token: string = "";
    if (req.headers.authorization && typeof req.headers.authorization === 'string') { // Check if header authorization exists
        const matches = req.headers.authorization.match(/(bearer)\s+(\S+)/i)
        if (matches && matches[2]) { // Check if token looks like 'bearer <token>'
            token = matches[2] // Match extract token without 'bearer' prefix
            verify(token, SECRET, (err, decodedToken) => { // Check if token is valid
                console.log(decodedToken)
                if (err) {
                    res.status(401).json({ message: 'Invalid token' })
                } else {
                    return next()
                }
            })
        }
    }
    return res.status(401).json({ message: 'Need a token' })
}

export default authMiddleware;