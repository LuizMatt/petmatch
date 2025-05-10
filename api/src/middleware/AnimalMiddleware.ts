import { NextFunction } from 'express';
import { UnknowError } from '../utils/Unkown';
import { Request, Response } from 'express';
import { ErrorMissingContent } from '../utils/ErrorMissingContent';

export const animalMiddleware = (req: Request, res: Response, next: NextFunction): Promise<void> =>{
    return new Promise((resolve, reject)=>{
        const {name, size, description, animal} = req.body;

        try{
            if(!name || !size || !!description || !animal){
                res.status(400).json({
                    sucess: false, 
                    message: `${ErrorMissingContent}`,
                })
                return;
            }      
            res.status(200).json({
                sucess: true,
                message: `Sucess, Next!`,
            })       
            next();
            return resolve();
        }catch(err){
            if(err instanceof Error){
                res.status(400).json({
                    sucess:false, message: `Error: ${err}`});
                    return reject();
            }else{
                res.status(400).json({
                    scuess:false,
                    message:`${UnknowError}`})
            }
        }
    })
}