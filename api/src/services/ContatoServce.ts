import  { Contato, ContatoAttributes, ContatoCreationAttributes } from "../interfaces/ContatoInterface";
import { FailedOnCreate } from "../utils/CreateError";
import { ServiceError } from "../utils/ServiceFailed";
import { ErrorMissingContent } from "../utils/ErrorMissingContent";
import { UnknowError } from "../utils/Unkown";
import { UUIDNotFoundError } from "../utils/Uuid";
import { NotFound } from "../utils/NotFoundError";
import { EmptyArrayError } from "../utils/EmptyArrayError";
export const ContatoService = {
    
    getAllContatos: async()=>{
        try{
            if(ContatoService.validateArray.length === 0){
                throw new EmptyArrayError();
            }
            const contato = await Contato.findAll();
            if(!contato){
                throw new NotFound;
            }
            console.log(`Sucess, All messages: ${contato} `);
            return contato;
        }catch(err){
            console.error(`Error: ${err}`);
        }
    },

    validateArray: async()=>{
        try{
            let array = []
            const contato = await Contato.findAll();
            if(!contato || contato.length == 0){
                throw new EmptyArrayError();
            }
            array.push(contato);
            return array;
        }catch(err){
            if(err instanceof Error){
                throw new EmptyArrayError();
            }
        }

},

    returnNamesOfArray: async()=>{
        let name = ''
        try{
            
            const userName = await ContatoService.getAllContatos();
            if(!userName){
                throw new EmptyArrayError();
            }
            for(let names of userName){
                name += `Nomes: \n ${names.nome}`;
            }
            if(!name || name === null){
                return `Nobody Contact`
            }
            return name;
        }catch(err){
            if(err instanceof Error){
                throw err;

            }else{
                throw new UnknowError();
            }
        }
    },



createContato : async(body: ContatoCreationAttributes)=>{


    try{
        if(!body){
            throw new ErrorMissingContent();
        }
        const contato = await Contato.create(body);
        if(contato ===null || !contato){
            throw new FailedOnCreate();
        }
        console.log(`Contato Criado: ${contato?.dataValues}`);
        return contato;
    }catch(err){
        if(err instanceof Error){
            throw err;
        }else{
            throw new UnknowError();
        }
    }
    
  
}
,

getContatoById: async(id: string)=>{
    try{
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            console.error(`Invalid UUID format`);
            return;
        }
        if(!id || id === null){
            throw new UUIDNotFoundError();
        }
        const userById = await Contato.findOne({where: {id: id}});
        if(!userById){
            throw new NotFound();
        }
        console.log(`User: ${userById?.dataValues}`);
        return userById;
    }catch(err){
        if(err instanceof Error){
            throw err;
        }else{
            throw new UnknowError();
        }
    }
},

deleteContatoById: async(id: string)=>{
    try{
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            console.error(`Invalid UUID format`);
            return;
        }
        if(!id || id === null){
            throw new UUIDNotFoundError();
        }
        const userDeletedById = await Contato.destroy({where: {id: id}});
        const userFind = await ContatoService.getContatoById(id);
        if(!userFind){
            throw new NotFound();
        }
        if(!userDeletedById){
            throw new NotFound();
        }
        console.log(`User: ${userFind?.dataValues}`);
        return userDeletedById;
    }catch(err){
        if(err instanceof Error){
            throw err;
        }else{
            throw new UnknowError();
        }
    }
}

,

updateContatoById: async(id: string, body: ContatoCreationAttributes)=>{
   
        try{
            if(!Contato){
                throw new ServiceError();
            }
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                console.error(`Invalid UUID format`);
                return;
            }
            else if(!id || id === null){
                throw new NotFound();
            }
            const contatoFind = await ContatoService.getContatoById(id);
            if(!contatoFind){
                throw new NotFound();
            }           

            const update = await Contato.update(body, {where: {id:id}});
            if(!update){
                throw new FailedOnCreate();
            }
            console.log(`Updated: ${contatoFind?.dataValues}`);
            return update;
        }catch(err){
            if(err instanceof Error){
                throw err;
            }else{
                throw new UnknowError();
            }
        }
    }
}
    




/* sem async se quiser testar ai p aprender, Luiz. Por tras de td Async func tem uma Promise com um resolve e um Reject. 
create: (body: ContatoAttributes) =>{
    return new Promise((resolve, reject)=>{
        try{
            Contato.create(body)
            .then((contato)=>{
                resolve(contato);
            })
            .catch((err)=>{
                reject(err);
            })
        }catch(err){
            if(err instanceof Error){
                throw err;
            }else{
                throw new UnknowError();
            }
        }
    })
   }
*/    

    
    /* 
    
    updateContatoById: (id: string, body: ContatoCreationAttributes)=>{
    return new Promise((resolve, reject)=>{
        try{
            if(!Contato){
                throw new ServiceError();
            }
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                console.error(`Invalid UUID format`);
                return;
            }
            Contato.update(body, {where: {id:id}})
            .then((contato)=>{
                return resolve(contato);
            })
            .catch((err)=>{
                return reject(err);
            })
        }catch(err){
            if(err instanceof Error){
                throw err;
            }else{
                throw new UnknowError();
            }
        }
    })
}
    
    */