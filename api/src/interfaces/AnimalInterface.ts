import { UUID } from "crypto";
import { Model, Optional } from "sequelize";
import { AnimalTypes } from "../types/AnimalTypes";
import { SizeTypes } from "../types/SizeTypes";


export interface AnimalAttributes{
    id: string;
    name: string;
    description: string;
    size: SizeTypes;
    animal: AnimalTypes;
}


export interface AnimalCreationAttributes extends Optional<AnimalAttributes, 'id'>{}

export class Animal extends Model<AnimalAttributes, AnimalCreationAttributes> implements AnimalAttributes{
    id!: string;
    name!: string;
    description!: string;
    size!: SizeTypes;
    animal!: AnimalTypes;
}




