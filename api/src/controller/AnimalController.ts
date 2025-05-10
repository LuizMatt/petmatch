import { Request, Response } from "express";
import { UnknowError } from "../utils/Unkown";
import { FailedOnCreate } from "../utils/CreateError";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { AnimalService } from "../services/AnimalService";
import { EmptyArrayError } from "../utils/EmptyArrayError";
import { UUIDNotFoundError } from "../utils/Uuid";
import { NotFound } from "../utils/NotFoundError";
import { FailedToDelete } from "../utils/FailedToDelete";


let sucess: Boolean = false;
export class AnimalController{
    
    constructor(){}
    
      createAnimalController = async(req: Request, res: Response): Promise<void> =>{
        const {name, description, size, animal} = req.body;
        try{
            if(!name || !description || !size || !animal){
                res.status(400).json({message: ErrorMissingContent})
                return;
            }
            const animalCreate = await AnimalService.createAnimal({name, description, size, animal});
            if(! animalCreate){
                res.status(400).json({message: `${FailedOnCreate}`});
                return;
            }
            console.log(`Animal Created: ${animalCreate?.dataValues}`);     
            res.status(201).json({
                sucess: true,
                message: `Sucess, Animal Created: `,
                animalCreate
            })
            return;
        }catch(err){
            if(err instanceof Error){
                res.status(400).json({message: `Error: ${err}`});
            }else{
                res.status(400).json({message: `Error: ${UnknowError}`});
                
            }
    
        }
    }
    
         getAnimalController = async(req: Request, res: Response): Promise<void> => {
            try{
                const animal = AnimalService.getAnimal();
                if(!animal){
                    res.status(404).json({
                        sucess: false,
                        message: EmptyArrayError,
                    });
                    return;
                }
                console.log(`All Animals: ${animal}`);
                res.status(200).json({
                    sucess: true,
                    message: `All Animals: `,
                    animal,
                })
                return;
            }catch(err){
                if(err instanceof Error){
                    res.status(400).json({message: `Error: ${err}`});
                }else{
                    res.status(400).json({message: `Error: ${UnknowError}`});
                    
                }
        }
    }
    
    
    
      getAnimalByIdController = async(req: Request, res: Response): Promise<void> =>{ 
        const {id} = req.params;
        try{
            if(!id || id === null){
    
                res.status(400).json({ 
                    sucess: false,
                    message: UUIDNotFoundError
                    
                });
                
                return;
            }
            const animalId = AnimalService.getAnimalById(id);
            if(!animalId){
                res.status(400).json({
                    sucess: false,
                    message: `Error ${NotFound}: `,
                });
    
                
            }
            
            res.status(200).json({
                sucess: true,
                message: `Sucess, animal fonuded: `,
                animalId,
            })
            
            console.log(`Animal: ${animalId}`);
        }catch(err){
            if(err instanceof Error){
                res.status(400).json({message: `Error: ${err}`});
            }else{
                res.status(400).json({message: `Error: ${UnknowError}`});
                
            }
    }
    }
    
    
          updateAnimalController = async(req: Request, res: Response): Promise<void> =>{
            const {name, description, size, animal } = req.body;
            const {id} = req.params;
            try{
                if(!id || id === null){
                    res.status(400).json({
                        sucess:false,
                        message: UUIDNotFoundError || `This is not an ID`,
                    })
                    return;
                }
                else if(!name || !description || !size || !animal){
                    res.status(400).json({
                        sucess:false,
                        message: ErrorMissingContent || `Please insert a content`,
                    })
                    return;
                }
                const animalupdate = await AnimalService.updateAnimalById(id, {name, animal, description, size}); 
                res.status(201).json({
                    sucess:true,
                    message: `Animal Updated!!`,
                    animalupdate
                })
                console.log(`Animal updated: ${animalupdate}`);
                return;
            }catch(err){
                if(err instanceof Error){
                    res.status(400).json({
                        sucess: false,
                        message: `Error: ${err}`
                    })
                    return;
                }else{
                    res.status(400).json({
                        sucess: false,
                        message: UnknowError,
                    }
    )            }
            }
        }
    
          deleteAnimalById = async(req: Request, res: Response): Promise<void>=>{
            const {id} = req.params;
            try{
                if(id === null || !id){
                    res.status(400).json({
                        sucess: false,
                        message: UUIDNotFoundError ||  `This is not an ID`,
                    });
                    return;
                }
                const animalDeleted = await AnimalService.deleteAnimalById(id);
                if(!animalDeleted){
                   res.status(400).json({sucess: false,
                    message: FailedToDelete
                    ,
                   })
                   return; 
                }
                res.status(200).json({
                    sucess: true,
                    message: `Sucess! Animal Deleted on ${id}: `,
                    animalDeleted,
                })
            }catch(err){
                if(err instanceof Error){
    
                }
    
            }
        }
    
    

}

