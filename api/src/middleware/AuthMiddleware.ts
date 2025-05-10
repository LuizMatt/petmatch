import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { jwt_Secret } from '../utils/baseurl/BaseUrll';
import { UnknowError } from '../utils/Unkown';


export const authMiddleware = (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    
        return new Promise((resolve, reject)=>{
            try{
                const authHeader = req.headers.authorization;
                if(!authHeader){
                    res.status(401).json({
                        sucess: false,
                        message: `Error: missing Header Authorization`
                    })
                    return;
                }
                const token = authHeader?.split(' ')[1];

                if(!token){
                    res.status(403).json({
                        sucess: false,
                        message: `Error: missing Token`
                    })
                    return;
                }
                const decoded = jwt.verify(token, jwt_Secret);
                res.status(200).json({
                    sucess:true,
                    message: `Sucess, next!`,
                    decoded
                });
                next();
                return resolve();


            }catch(err){
                if(err instanceof Error){
                    res.status(400).json({
                        sucess:false,
                        message: `${err}`})
                        return reject();
                }else{
                    res.status(400).json({
                        sucess:false,
                        message: `${UnknowError}`})
                        return reject();
                }
            }
        })
    }