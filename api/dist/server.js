"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const Database_1 = require("./config/database/Database");
const PORT = process.env.PORT;
const url = process.env.FRONT;
const hop = process.env.HOPPSCOTCH;
const app = (0, express_1.default)();
app.use(express_1.default.json());
let allDomains = [url, hop];
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allDomains.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.get("/", (req, res) => {
    try {
        console.log(`Rota funcionando!!`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Erro: ${err}`);
        }
        else {
            throw new Error(`Erro desconhecido!`);
        }
    }
});
app.listen(PORT, async () => {
    try {
        await (0, Database_1.startConnectionDatabase)();
        console.log(`Servidor rodando na porta ${PORT}`);
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(`Erro: ${err}`);
        }
        else {
            throw new Error(`Erro desconhecido!`);
        }
    }
});
