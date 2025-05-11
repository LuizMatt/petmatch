"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const BaseUrll_1 = require("../utils/baseurl/BaseUrll");
const Unkown_1 = require("../utils/Unkown");
const authMiddleware = (req, res, next) => {
    return new Promise((resolve, reject) => {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader) {
                res.status(401).json({
                    sucess: false,
                    message: `Error: missing Header Authorization`
                });
                return;
            }
            const token = authHeader?.split(' ')[1];
            if (!token) {
                res.status(403).json({
                    sucess: false,
                    message: `Error: missing Token`
                });
                return;
            }
            const decoded = jsonwebtoken_1.default.verify(token, BaseUrll_1.jwt_Secret);
            res.status(200).json({
                sucess: true,
                message: `Sucess, next!`,
                decoded
            });
            next();
            return resolve();
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({
                    sucess: false,
                    message: `${err}`
                });
                return reject();
            }
            else {
                res.status(400).json({
                    sucess: false,
                    message: `${Unkown_1.UnknowError}`
                });
                return reject();
            }
        }
    });
};
exports.authMiddleware = authMiddleware;
