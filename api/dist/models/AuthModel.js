"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AuthInterface_1 = require("../interfaces/AuthInterface");
const sequelize_1 = require("sequelize");
const Database_1 = require("../config/database/Database");
const uuid_1 = require("uuid");
AuthInterface_1.Auth.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: uuid_1.v4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    second_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cpf: {
        type: sequelize_1.DataTypes.STRING(14),
        allowNull: false,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    birthday: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    }
}, {
    sequelize: Database_1.sequelize,
    tableName: 'usuarios',
    modelName: 'usuario',
    timestamps: true,
    underscored: true,
});
exports.default = AuthInterface_1.Auth;
