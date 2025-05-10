"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalService = void 0;
const AnimalModel_1 = __importDefault(require("../models/AnimalModel"));
const CreateError_1 = require("../utils/CreateError");
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const Unkown_1 = require("../utils/Unkown");
const Uuid_1 = require("../utils/Uuid");
const NotFoundError_1 = require("../utils/NotFoundError");
const EmptyArrayError_1 = require("../utils/EmptyArrayError");
exports.AnimalService = {
    createAnimal: async (body) => {
        try {
            if (!body) {
                throw new ErrorMissingContent_1.ErrorMissingContent();
            }
            const animal = await AnimalModel_1.default.create(body);
            if (!animal) {
                throw new CreateError_1.FailedOnCreate();
            }
            return animal;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`Error: ${err}`);
            }
            else {
            }
        }
    },
    getAnimal: async () => {
        try {
            const animal = await AnimalModel_1.default.findAll();
            if (animal.length === 0) {
                throw new EmptyArrayError_1.EmptyArrayError();
            }
            else {
                console.log(`Animals: ${animal}`);
            }
            return animal;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`${err}`);
            }
            else {
                throw new Unkown_1.UnknowError();
            }
        }
    },
    getAnimalById: async (id) => {
        try {
            if (id === null || !id) {
                throw new Uuid_1.UUIDNotFoundError();
            }
            const animalById = await AnimalModel_1.default.findOne({ where: { id: id } });
            if (!animalById) {
                throw new NotFoundError_1.NotFound();
            }
            console.log(`Animal Found: ${animalById?.dataValues}`);
            return animalById;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`${err}`);
            }
            else {
                throw new Unkown_1.UnknowError();
            }
        }
    },
    updateAnimalById: async (id, body) => {
        try {
            if (id === null || !id) {
                throw new Uuid_1.UUIDNotFoundError();
            }
            const animalId = await exports.AnimalService.getAnimalById(id);
            if (!animalId) {
                throw new NotFoundError_1.NotFound();
            }
            const [animalUpdate] = await AnimalModel_1.default.update(body, { where: { id: id } });
            console.log(`Animal Update: 
                ${animalId?.dataValues}`);
            return animalUpdate;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`${err}`);
            }
            else {
                throw new Unkown_1.UnknowError();
            }
        }
    },
    deleteAnimalById: async (id) => {
        try {
            if (id === null || !id) {
                throw new Uuid_1.UUIDNotFoundError();
            }
            const animalId = await exports.AnimalService.getAnimalById(id);
            if (!animalId) {
                throw new NotFoundError_1.NotFound();
            }
            const animalDeleted = await AnimalModel_1.default.destroy({ where: { id: id } });
            console.log(`Animal Deleted: ${animalId?.dataValues}`);
            return animalDeleted;
        }
        catch (err) {
            if (err instanceof Error) {
                console.error(`${err}`);
            }
            else {
                throw new Unkown_1.UnknowError();
            }
        }
    }
};
