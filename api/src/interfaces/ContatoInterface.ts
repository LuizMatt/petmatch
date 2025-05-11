import { UUID } from "crypto";
import { Model, Optional } from "sequelize";


export interface ContatoAttributes{
    id: UUID 
    nome: string;
     email: string;
     telefone: string;
     texto: string;
}

export interface ContatoCreationAttributes extends Optional<ContatoAttributes, 'id'>{}


export class Contato extends Model<ContatoAttributes, ContatoCreationAttributes> implements ContatoAttributes{

    public id!: UUID;
    public nome!: string;
    public email!: string;
    public telefone!: string;
    public texto!: string;

}

export default Contato;