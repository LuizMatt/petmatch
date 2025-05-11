import {Contato as ContatoModel} from "../interfaces/ContatoInterface";
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database/Database";

ContatoModel.init({
    id:{
        type:DataTypes.UUID,
        allowNull:false,
        primaryKey:true,
        defaultValue: DataTypes.UUIDV4

    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    texto:{
        type: DataTypes.STRING(200),
        allowNull: false
    }
},

    {
        sequelize,
        tableName: 'contato',
        modelName: 'contatos',
        timestamps: true,

    }
)

export default ContatoModel