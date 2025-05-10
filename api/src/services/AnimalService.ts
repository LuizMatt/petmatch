import { AnimalCreationAttributes } from "../interfaces/AnimalInterface";
import AnimalModel from "../models/AnimalModel";
import { AnimalTypes } from "../types/AnimalTypes";
import { FailedOnCreate } from "../utils/CreateError";
import { SizeTypes } from "../types/SizeTypes";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { UnknowError } from "../utils/Unkown";
import { UUIDNotFoundError } from "../utils/Uuid";
import { NotFound } from "../utils/NotFoundError";
import { EmptyArrayError } from "../utils/EmptyArrayError";
export const AnimalService = {

      createAnimal: async(body: AnimalCreationAttributes)=>{
        try{
            if(!body){
                throw new ErrorMissingContent();
            }
            const animal = await AnimalModel.create(body);
            if(!animal){
                throw new FailedOnCreate();
            }
            return animal;
            
        }catch(err){
            if(err instanceof Error){
                console.error(`Error: ${err}`);
            }else{
    
            }
        }
    }
,
    getAnimal: async()=>{
        try{
            const animal = await AnimalModel.findAll();
            if(animal.length === 0){
                throw new EmptyArrayError();
            }else{
                console.log(`Animals: ${animal}`);
            }
            return animal;
        }catch(err){
            if(err instanceof Error){
                console.error(`${err}`);
            }else{
                throw new UnknowError();
            }
        }
    }
,

    getAnimalById: async(id: string )=>{
        try{
        if(id === null || !id){
            throw new UUIDNotFoundError();
        }
        const animalById = await AnimalModel.findOne({where: {id:id}});
        if(!animalById){
            throw new NotFound();
        }
        console.log(`Animal Found: ${animalById?.dataValues}`);
        return animalById;
    }catch(err){
        if(err instanceof Error){
            console.error(`${err}`);
        }else{
            throw new UnknowError();
        }
    }
    },

    updateAnimalById : async(id: string, body: AnimalCreationAttributes)=>{
        try{    
            if(id === null || !id){
                throw new UUIDNotFoundError();
            }
            const animalId = await AnimalService.getAnimalById(id);
            if(!animalId){
                throw new NotFound();
            }
            const [animalUpdate] = await AnimalModel.update(body, {where: {id:id}});
            console.log(`Animal Update: 
                ${animalId?.dataValues}`);
                return animalUpdate;
        }catch(err){
            if(err instanceof Error){
                console.error(`${err}`);
            }else{
                throw new UnknowError();
            }
        }
    },

    deleteAnimalById: async(id: string)=>{
        try{
            if(id === null || !id){
                throw new UUIDNotFoundError();
            }
            const animalId = await AnimalService.getAnimalById(id);
            if(!animalId){
                throw new NotFound();
            }
            const animalDeleted = await AnimalModel.destroy({where : {id: id}});
            console.log(`Animal Deleted: ${animalId?.dataValues}`);
            return animalDeleted;
        }catch(err){
            if(err instanceof Error){
                console.error(`${err}`);
            }else{
                throw new UnknowError();
            }
        }
    }
}


