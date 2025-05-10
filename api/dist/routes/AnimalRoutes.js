"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AnimalController_1 = require("../controller/AnimalController");
const express_1 = __importDefault(require("express"));
const animalController = new AnimalController_1.AnimalController();
const router = express_1.default.Router();
router.get('/', animalController.getAnimalController);
router.get('/:id', animalController.getAnimalByIdController);
router.post('/', animalController.createAnimalController);
router.put('/', animalController.updateAnimalController);
router.delete('/:id', animalController.deleteAnimalById);
exports.default = router;
