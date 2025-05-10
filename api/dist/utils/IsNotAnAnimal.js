"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsNotAnimalError = void 0;
const AnimalTypes_1 = require("../types/AnimalTypes");
class IsNotAnimalError extends Error {
    constructor(message = "Is not an Animal") {
        if (!AnimalTypes_1.AnimalTypes.CACHORRO || !AnimalTypes_1.AnimalTypes.GATO || !AnimalTypes_1.AnimalTypes.CAGADO) {
            super(message);
        }
    }
}
exports.IsNotAnimalError = IsNotAnimalError;
