"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const Unkown_1 = require("../utils/Unkown");
const JwtError_1 = require("../utils/JwtError");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CreateError_1 = require("../utils/CreateError");
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const BaseUrll_1 = require("../utils/baseurl/BaseUrll");
let success = false;
class AuthController {
    constructor() {
        this.register = async (req, res) => {
            const { name, second_name, email, cpf, birthday, password } = req.body;
            try {
                if (!BaseUrll_1.jwt_Secret) {
                    res.status(400).json({ message: `Error: ${JwtError_1.JwtError}` });
                    return;
                }
                if (!name || !second_name || !email || !cpf || !birthday || !password) {
                    res.status(400).json({ message: `Error: ${ErrorMissingContent_1.ErrorMissingContent}` });
                    return;
                }
                const userRegister = await AuthService_1.authService.createUser({ name, second_name, email, cpf, birthday, password });
                if (!userRegister) {
                    res.status(500).json({ message: `Error: ${CreateError_1.FailedOnCreate}` });
                    return;
                }
                const playload = {
                    id: userRegister.id,
                    email: userRegister.email,
                };
                const token = jsonwebtoken_1.default.sign(playload, BaseUrll_1.jwt_Secret, { expiresIn: '1h' });
                res.status(201).json({
                    success: true,
                    message: "User created successfully.",
                    userRegister,
                    token
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error(`Error on Register: ${err.message}`);
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    throw new Unkown_1.UnknowError();
                }
            }
        };
        this.login = async (req, res) => {
            const { email, password } = req.body;
            try {
                if (!email || !password) {
                    res.status(400).json({ message: `Error: ${ErrorMissingContent_1.ErrorMissingContent}` });
                    return;
                }
                const userLogin = await AuthService_1.authService.getUserByEmail(email);
                if (!userLogin) {
                    res.status(404).json({ message: `User not found.` });
                    return;
                }
                const isPasswordCorrect = await bcryptjs_1.default.compare(password, userLogin.password);
                if (!isPasswordCorrect) {
                    res.status(401).json({ message: `Invalid password.` });
                    return;
                }
                const playLoad = {
                    id: userLogin.id,
                    email: userLogin.email,
                };
                const token = jsonwebtoken_1.default.sign(playLoad, BaseUrll_1.jwt_Secret, { expiresIn: '1h' });
                res.status(200).json({
                    success: true,
                    message: "Login successful.",
                    token
                });
            }
            catch (err) {
                if (err instanceof Error) {
                    console.error("Failed to login:", err.message);
                    res.status(400).json({ message: `Error: ${err.message}` });
                }
                else {
                    res.status(500).json({ message: `Error: ${Unkown_1.UnknowError}` });
                }
            }
        };
    }
}
exports.AuthController = AuthController;
