import { Request, Response, NextFunction } from "express";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { UnknowError } from "../utils/Unkown";

export const contatoMiddleware = (req: Request, res: Response, next: NextFunction):Promise<void>  => {
    return new Promise((resolve, reject)=>{

        try {
            const { nome, email, telefone, texto } = req.body;
    
            if (!nome || !email || !telefone || !texto) {
                 res.status(400).json({
                    success: false,
                    message: ErrorMissingContent,
                });
                return;
                
            }
    
            console.log("Sucesso no middleware");
            next();
            return resolve();
        } catch (err) {
            if (err instanceof Error) {
                 res.status(400).json({
                    success: false,
                    message: `Erro: ${err.message}`,
                });
            return reject();

            } else {
                 res.status(400).json({
                    success: false,
                    message: UnknowError,
                });
            return reject();

            }
        }

    })
   
};
