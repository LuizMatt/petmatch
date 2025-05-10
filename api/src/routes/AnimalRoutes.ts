import {AnimalController} from "../controller/AnimalController";
import express, {Router} from 'express';
import { animalMiddleware } from "../middleware/AnimalMiddleware";
const animalController = new AnimalController();


const router: Router = express.Router();


router.get('/', animalController.getAnimalController);
router.get('/:id', animalController.getAnimalByIdController);
router.post('/', animalMiddleware, animalController.createAnimalController)
router.put('/', animalMiddleware, animalController.updateAnimalController)
router.delete('/:id', animalController.deleteAnimalById )

export default router;