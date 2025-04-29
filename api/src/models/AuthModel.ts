import { Auth } from "../interfaces/AuthInterface";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database/Database";
import { v4 as uuidv4 } from 'uuid'; 

Auth.init({
    id: {
        type: DataTypes.UUID, 
        allowNull: false,
        primaryKey: true,
        defaultValue: uuidv4,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    second_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: DataTypes.STRING(14),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false 
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: false,
    }

}, {
    sequelize,
    tableName: 'usuarios',
    modelName: 'usuario',  
    timestamps: true,
    underscored: true, 
});

export default Auth;