import { authService } from "../services/AuthService";
import { Request, Response } from "express";
import { UnknowError } from "../utils/Unkown";
import { JwtError } from "../utils/JwtError";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { FailedOnCreate } from "../utils/CreateError";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { jwt_Secret} from "../utils/baseurl/BaseUrll";

let success: boolean = false;
export class AuthController {
    constructor() {}

    register = async (req: Request, res: Response): Promise<void> => {
        const { name, second_name, email, cpf, birthday, password } = req.body;
    
        try {
            if (!jwt_Secret) {
                res.status(400).json({ message: `Error: ${JwtError}` });
                return;
            }
    
            if (!name || !second_name || !email || !cpf || !birthday || !password) {
                res.status(400).json({ message: `Error: ${ErrorMissingContent}` });
                return;
            }
    
            const userRegister = await authService.createUser({ name, second_name, email, cpf, birthday, password });
    
            if (!userRegister) {
                res.status(500).json({ message: `Error: ${FailedOnCreate}` });
                return;
            }
    
            const playload = {
                id: userRegister.id,
                email: userRegister.email,
            }

            const token = jwt.sign(playload, jwt_Secret, { expiresIn: '1h' });
    
            res.status(201).json({
                success: true,
                message: "User created successfully.",
                token
            });
    
        } catch (err) {
            if (err instanceof Error) {
                console.error(`Error on Register: ${err.message}`);
                res.status(400).json({ message: `Error: ${err.message}` });
            } else {
                throw new UnknowError();
            }
        }
    };
    
    login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
    
        try {
            if (!email || !password) {
                res.status(400).json({ message: `Error: ${ErrorMissingContent}` });
                return;
            }
    
            const userLogin = await authService.getUserByEmail(email);
    
            if (!userLogin) {
                res.status(404).json({ message: `User not found.` });
                return;
            }
    
            const isPasswordCorrect = await bcrypt.compare(password, userLogin.password);
    
            if (!isPasswordCorrect) {
                res.status(401).json({ message: `Invalid password.` });
                return;
            }
            const playLoad = {
                id: userLogin.id,
                email: userLogin.email,
            }
    
            const token = jwt.sign(playLoad, jwt_Secret, { expiresIn: '1h'});
    
            res.status(200).json({
                success: true,
                message: "Login successful.",
                token
            });
    
        } catch (err) {
            if (err instanceof Error) {
                console.error("Failed to login:", err.message);
                res.status(400).json({ message: `Error: ${err.message}` });
            } else {
                res.status(500).json({ message: `Error: ${UnknowError}` });
            }
        }
    };
}

  