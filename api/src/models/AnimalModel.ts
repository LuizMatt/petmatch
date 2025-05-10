import { Animal as AnimalModel } from "../interfaces/AnimalInterface";
import { sequelize}from "../config/database/Database";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from 'uuid'; 


AnimalModel.init({
    id:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuidv4,

    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,

    },
     description: {
        type: DataTypes.STRING,
        allowNull: false

     },
        size: {
            type: DataTypes.ENUM('GRANDE', 'MEDIO', 'PEQUENO'),
            allowNull: false,
        },
        
        animal: {
            type: DataTypes.ENUM('CACHORRO', 'GATO', 'CAGADO'),
            allowNull: false,
        },

},
{   sequelize,
    tableName: "animal",
    modelName: "animalModel",
    timestamps: true,
})

export default AnimalModel;