"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const AuthModel_1 = __importDefault(require("../models/AuthModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
exports.authService = {
    createUser: async (body) => {
        try {
            if (!body) {
                throw ErrorMissingContent_1.ErrorMissingContent;
            }
            else if (!body.name || body.name === null) {
                console.error(`Please, Insert the name`);
            }
            else if (!body.email || body.email == null) {
                console.error(`Please, insert the email`);
            }
            else if (!body.cpf || body.cpf == null) {
                console.error(`Please, insert the cpf`);
            }
            else if (!body.birthday || body.birthday == null) {
                console.error(`Please, insert the birthday`);
            }
            const salt = await bcryptjs_1.default.genSalt(10);
            const passwordEncripted = await bcryptjs_1.default.hash(body.password, salt);
            body.password = passwordEncripted;
            const user = AuthModel_1.default.create(body);
            (await user).save();
            console.log(`User created: ${user}`);
            return user;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${err}`);
            }
            else {
                throw new Error(`Unknown Error`);
            }
        }
    },
    getAllUser: async () => {
        try {
            if (exports.authService.getUserValidator.length === 0) {
                console.error(`Array of Users is Empty`);
            }
            const user = await AuthModel_1.default.findAll();
            return user;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`ERROR:${err}`);
            }
            else {
                throw new Error(`Unknown Error`);
            }
        }
        {
        }
    },
    getUserValidator: async () => {
        try {
            const users = await AuthModel_1.default.findAll();
            let userArray = [users];
            console.log(`Users: ${userArray}`);
            return userArray;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${err}`);
            }
            else {
                throw new Error(`Unknow Error`);
            }
        }
    },
    getUserByEmail: async (email) => {
        try {
            if (!email || email === null) {
                console.error(`Please insert the Email`);
            }
            const mail = await AuthModel_1.default.findOne({ where: { email: email } });
            return mail;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${err}`);
            }
            else {
                throw new Error(`Unknow Error`);
            }
        }
    },
    getUserById: async (id) => {
        try {
            if (!id || id === null) {
                console.error(`Please insert the id`);
            }
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                console.error(`Invalid UUID format`);
                return;
            }
            const idUser = await AuthModel_1.default.findAll({ where: { id: id } });
            return idUser;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${err}`);
            }
            else {
                throw new Error(`Unknow Error`);
            }
        }
    },
    updateUser: async (id, body) => {
        try {
            if (!id || id === null) {
                console.error(`Please, insert the id`);
            }
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                console.error(`Invalid UUID format`);
                return;
            }
            const [update] = await AuthModel_1.default.update(body, { where: { id: id } });
            console.log(`User updated: ${body.id, body.name, body.cpf, body.email, body.cpf}`);
            return update;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${err}`);
            }
            else {
                throw new Error(`Unknow Error`);
            }
        }
    },
    deleteUserById: async (id) => {
        try {
            if (!id || id === null) {
                console.error(`Id is missing`);
            }
            const user = await exports.authService.getUserById(id);
            const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
            if (!uuidRegex.test(id)) {
                console.error(`INvalid UUID FORMAT!`);
                return;
            }
            const deletedUser = await AuthModel_1.default.destroy({ where: { id: id } });
            console.log(`Deleted User: ${user}`);
            return deletedUser;
        }
        catch (err) {
            console.error(`Error ${err}`);
        }
    }
};
