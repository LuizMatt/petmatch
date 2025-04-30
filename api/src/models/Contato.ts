import { DataTypes } from "sequelize";
import { sequelize } from "../config/database/Database";

const Contato = sequelize.define(
  "Contato",
  {
    
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    telefone: {
      type: DataTypes.STRING(20),
      allowNull: false, 
    },
    mensagem: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "contatos",
    timestamps: true,
    underscored: true,
  }
);

export default Contato;
