"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.animalMiddleware = void 0;
const Unkown_1 = require("../utils/Unkown");
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const animalMiddleware = (req, res, next) => {
    return new Promise((resolve, reject) => {
        const { name, size, description, animal } = req.body;
        try {
            if (!name || !size || !!description || !animal) {
                res.status(400).json({
                    sucess: false,
                    message: `${ErrorMissingContent_1.ErrorMissingContent}`,
                });
                return;
            }
            res.status(200).json({
                sucess: true,
                message: `Sucess, Next!`,
            });
            next();
            return resolve();
        }
        catch (err) {
            if (err instanceof Error) {
                res.status(400).json({
                    sucess: false, message: `Error: ${err}`
                });
                return reject();
            }
            else {
                res.status(400).json({
                    scuess: false,
                    message: `${Unkown_1.UnknowError}`
                });
            }
        }
    });
};
exports.animalMiddleware = animalMiddleware;
