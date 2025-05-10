"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AnimalInterface_1 = require("../interfaces/AnimalInterface");
const Database_1 = require("../config/database/Database");
const sequelize_1 = require("sequelize");
AnimalInterface_1.Animal.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: sequelize_1.DataTypes.ENUM('GRANDE', 'MEDIO', 'PEQUENO'),
        allowNull: false,
    },
    animal: {
        type: sequelize_1.DataTypes.ENUM('CACHORRO', 'GATO', 'CAGADO'),
        allowNull: false,
    },
}, { sequelize: Database_1.sequelize,
    tableName: "animal",
    modelName: "animalModel",
    timestamps: true,
});
exports.default = AnimalInterface_1.Animal;
