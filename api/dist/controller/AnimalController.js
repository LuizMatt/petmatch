"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnimalController = void 0;
const Unkown_1 = require("../utils/Unkown");
const CreateError_1 = require("../utils/CreateError");
const ErrorMissingContent_1 = require("../utils/ErrorMissingContent");
const AnimalService_1 = require("../services/AnimalService");
const EmptyArrayError_1 = require("../utils/EmptyArrayError");
const Uuid_1 = require("../utils/Uuid");
const NotFoundError_1 = require("../utils/NotFoundError");
const FailedToDelete_1 = require("../utils/FailedToDelete");
let sucess = false;
class AnimalController {
    constructor() {
        this.createAnimalController = async (req, res) => {
            const { name, description, size, animal } = req.body;
            try {
                if (!name || !description || !size || !animal) {
                    res.status(400).json({ message: ErrorMissingContent_1.ErrorMissingContent });
                    return;
                }
                const animalCreate = await AnimalService_1.AnimalService.createAnimal({ name, description, size, animal });
                if (!animalCreate) {
                    res.status(400).json({ message: `${CreateError_1.FailedOnCreate}` });
                    return;
                }
                console.log(`Animal Created: ${animalCreate?.dataValues}`);
                res.status(201).json({
                    sucess: true,
                    message: `Sucess, Animal Created: `,
                    animalCreate
                });
                return;
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err}` });
                }
                else {
                    res.status(400).json({ message: `Error: ${Unkown_1.UnknowError}` });
                }
            }
        };
        this.getAnimalController = async (req, res) => {
            try {
                const animal = AnimalService_1.AnimalService.getAnimal();
                if (!animal) {
                    res.status(404).json({
                        sucess: false,
                        message: EmptyArrayError_1.EmptyArrayError,
                    });
                    return;
                }
                console.log(`All Animals: ${animal}`);
                res.status(200).json({
                    sucess: true,
                    message: `All Animals: `,
                    animal,
                });
                return;
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err}` });
                }
                else {
                    res.status(400).json({ message: `Error: ${Unkown_1.UnknowError}` });
                }
            }
        };
        this.getAnimalByIdController = async (req, res) => {
            const { id } = req.params;
            try {
                if (!id || id === null) {
                    res.status(400).json({
                        sucess: false,
                        message: Uuid_1.UUIDNotFoundError
                    });
                    return;
                }
                const animalId = AnimalService_1.AnimalService.getAnimalById(id);
                if (!animalId) {
                    res.status(400).json({
                        sucess: false,
                        message: `Error ${NotFoundError_1.NotFound}: `,
                    });
                }
                res.status(200).json({
                    sucess: true,
                    message: `Sucess, animal fonuded: `,
                    animalId,
                });
                console.log(`Animal: ${animalId}`);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ message: `Error: ${err}` });
                }
                else {
                    res.status(400).json({ message: `Error: ${Unkown_1.UnknowError}` });
                }
            }
        };
        this.updateAnimalController = async (req, res) => {
            const { name, description, size, animal } = req.body;
            const { id } = req.params;
            try {
                if (!id || id === null) {
                    res.status(400).json({
                        sucess: false,
                        message: Uuid_1.UUIDNotFoundError || `This is not an ID`,
                    });
                    return;
                }
                else if (!name || !description || !size || !animal) {
                    res.status(400).json({
                        sucess: false,
                        message: ErrorMissingContent_1.ErrorMissingContent || `Please insert a content`,
                    });
                    return;
                }
                const animalupdate = await AnimalService_1.AnimalService.updateAnimalById(id, { name, animal, description, size });
                res.status(201).json({
                    sucess: true,
                    message: `Animal Updated!!`,
                    animalupdate
                });
                console.log(`Animal updated: ${animalupdate}`);
                return;
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({
                        sucess: false,
                        message: `Error: ${err}`
                    });
                    return;
                }
                else {
                    res.status(400).json({
                        sucess: false,
                        message: Unkown_1.UnknowError,
                    });
                }
            }
        };
        this.deleteAnimalById = async (req, res) => {
            const { id } = req.params;
            try {
                if (id === null || !id) {
                    res.status(400).json({
                        sucess: false,
                        message: Uuid_1.UUIDNotFoundError || `This is not an ID`,
                    });
                    return;
                }
                const animalDeleted = await AnimalService_1.AnimalService.deleteAnimalById(id);
                if (!animalDeleted) {
                    res.status(400).json({ sucess: false,
                        message: FailedToDelete_1.FailedToDelete,
                    });
                    return;
                }
                res.status(200).json({
                    sucess: true,
                    message: `Sucess! Animal Deleted on ${id}: `,
                    animalDeleted,
                });
            }
            catch (err) {
                if (err instanceof Error) {
                }
            }
        };
    }
}
exports.AnimalController = AnimalController;
