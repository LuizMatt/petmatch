import  Auth  from "../models/AuthModel";
import AuthInterface from "../models/AuthModel";
import { AuthCreationAttributes,AuthAttributes } from "../interfaces/AuthInterface";
import bcrypt from 'bcryptjs';
import { ErrorMissingContent } from "../utils/ErrorMissingContent";

export const authService = {

    
    
createUser : async(body: AuthCreationAttributes)=>{
    try{
        if(!body){
            throw ErrorMissingContent;
        }
        else if(!body.name || body.name === null){
            console.error(`Please, Insert the name`);
        }
        else if(! body.email || body.email == null){
            console.error(`Please, insert the email`);
        }
        else if(! body.cpf || body.cpf == null){
            console.error(`Please, insert the cpf`);
        }
        else if(! body.birthday || body.birthday == null){
            console.error(`Please, insert the birthday`);
        }
        const salt = await bcrypt.genSalt(10);
        const passwordEncripted = await bcrypt.hash(body.password, salt);
        body.password = passwordEncripted;
        const user = Auth.create(body);
        (await user).save();
        console.log(`User created: ${user}`)
        return user;
    }catch(err){
        if(err instanceof Error){
            console.error(`Error: ${err}`);
        }else{
            throw new Error(`Unknown Error`);
        }
        
    }
},

 getAllUser: async()=>{
    try{
        if(authService.getUserValidator.length === 0){
            console.error(`Array of Users is Empty`)
        }
        const user = await Auth.findAll();
        return user;
    }catch(err){
        if(err instanceof Error){

            console.error(`ERROR:${err}`);
        }else{
            throw new Error(`Unknown Error`);
        }
    }{
        
    }
},

getUserValidator: async()=>{
    try{
        const users = await Auth.findAll();
        let userArray = [users];
        console.log(`Users: ${userArray}`);
        return userArray;
    }catch(err){
        if(err instanceof Error){
            console.error(`Error: ${err}`)
        }else{
            throw new Error(`Unknow Error`);
        }
    }
},


getUserByEmail: async(email: string )=>{
    try{
        if(!email || email === null){
            console.error(`Please insert the Email`);
        }
        const mail = await Auth.findOne({where: {email: email}});
        return mail;
    }catch(err){
        if(err instanceof Error){
            console.error(`Error: ${err}`)
        }else{
            throw new Error(`Unknow Error`);
        }
    }
},


getUserById: async(id: string )=>{
    try{
        if(!id || id === null){
            console.error(`Please insert the id`);
        }
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            console.error(`Invalid UUID format`);
            return;
        }
        const idUser = await Auth.findAll({where: {id: id}});
        return idUser;
    }catch(err){
        if(err instanceof Error){
            console.error(`Error: ${err}`)
        }else{
            throw new Error(`Unknow Error`);
        }
    }
},

updateUser: async(id: string, body: AuthCreationAttributes )=>{
    try{
        if(!id || id === null){
            console.error(`Please, insert the id`);
        }
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(id)) {
            console.error(`Invalid UUID format`);
            return;
        }
        const [update] = await Auth.update(body,{where: {id:id}});
        console.log(`User updated: ${body.id, body.name, body.cpf, body.email, body.cpf}`);
        return update;

    }catch(err){
        if(err instanceof Error){
            console.error(`Error: ${err}`)
        }else{
            throw new Error(`Unknow Error`);
        }
    }
},

 deleteUserById : async(id: string)=>{
    try{
       if(!id || id === null){
            console.error(`Id is missing`)
       }      
       const user = await authService.getUserById(id);
       
       const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
       
        if(!uuidRegex.test(id)){
            console.error(`INvalid UUID FORMAT!`);
            return;
        }   
        const deletedUser = await Auth.destroy({where:{id: id}});
        console.log(`Deleted User: ${user}`);
        return deletedUser;
    }catch(err){
        console.error(`Error ${err}`);
    }
}
};