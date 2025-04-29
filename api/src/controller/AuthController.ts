import { authService } from "../services/AuthService";
import  jwt from "jsonwebtoken";
import { jwt_Secret, jwt_expires } from "../utils/baseurl/BaseUrll";
import { Request, Response } from "express";
import { UnknowError } from "../utils/Unkown";
import { JwtError } from "../utils/JwtError";
import bcrypt from 'bcryptjs';
import { FailedOnCreate } from "../utils/CreateError";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";



let sucess: boolean = false;

export const register = async(req: Request, res: Response): Promise<void>=>{
    const {name, second_name, email, cpf, birthday, password} = req.body;
    try{
        if(!jwt_Secret){
            res.status(400).json({message: `Error: ${JwtError}`});
            return; 
        }
        else if(!name|| !second_name|| !email|| !cpf || !birthday|| !password){
            res.status(402).json({message: `Error: ${ErrorMissingContent}`});
            return;
        }
        
        const userRegister = await authService.createUser({name, second_name, email,cpf, birthday, password});
        if(!userRegister){
            res.status(500).json({ message: `Failed on create the User`});
            return;
        }
        const playload = {
            id: userRegister?.dataValues.id,
            email: userRegister?.dataValues.email
        }
        const token = jwt.sign(playload, jwt_Secret, { expiresIn: jwt_expires });   //Ver tbm 

        console.log(`User Created: ${ userRegister?.dataValues}`);
        res.status(201).json({
            sucess: true,
            message: `User created: ${userRegister}`,
            token
            
        });
    }catch(err){
        if(err instanceof Error){
            console.error(`Error on Register`);
            res.status(400).json({message: `Error: ${err.message}`});
            return;
        }else{
            throw new UnknowError;
        }
    }
}


export const login = async(req: Request, res: Response): Promise<void>=>{
    const {email, password} = req.body;
    try{

        if(!email || !password){
            res.status(400).json({message: `Error: ${ErrorMissingContent}`});
            return;
        }
        const userLogin = await authService.getUserByEmail(email);
        if(!userLogin || userLogin ===null){
            res.status(400).json({message: `Error: ${ErrorMissingContent}`});   
            return;

        }
        const isPasswordCOrrect = await bcrypt.compare(password, userLogin.password)
        if(!userLogin || userLogin === null){
            res.status(404).json({message: `${FailedOnCreate}`});
        }
        const playload = {
            id: userLogin.id;      //Ver essa desgraça aqui desse erro, pq pqp 
            email: userLogin.email;
        }
        const token = jwt.sign(playload, jwt_Secret, {expiresIn: jwt_expires})
        res.status(200).json({
            sucess: true,
            message: `Login sucessful`,
            token
        })
        return;
    }catch(err){
        if(err instanceof Error){
            console.error(`failed to login`);
            res.status(400).json({message: `Error:  ${err}`})
        }else{
            res.status(400).json({message:`${UnknowError}`})
        }
    }
}

