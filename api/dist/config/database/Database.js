"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startConnectionDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const db_URL = process.env.DATABASE_URL;
exports.sequelize = new sequelize_1.Sequelize(db_URL, {
    dialect: 'postgres',
    logging: true,
});
const startConnectionDatabase = () => {
    try {
        exports.sequelize.authenticate()
            .then(() => {
            console.log(`Conectou no banco de dados! ✔️✔️✔️`);
        })
            .catch((err) => {
            console.error(`Não conectou: ${err}`);
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Erro: ${err}`);
        }
        else {
            throw new Error(`Erro desconhecido`);
        }
    }
};
exports.startConnectionDatabase = startConnectionDatabase;
