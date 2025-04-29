import { Model, Optional } from "sequelize";
export interface AuthAttributes{
    id: string;
    name: string;
    second_name: string;
    cpf: string;
    email: string;
    birthday: Date;
    password: string;
}


export interface AuthCreationAttributes extends Optional<AuthAttributes, 'id'>{}


export class Auth extends Model<AuthAttributes, AuthCreationAttributes> implements AuthAttributes{
    id!: string;
    name!: string;
    second_name!: string;
    cpf!:string; 
    email!: string;
    birthday!: Date;
    password!: string;
} 

