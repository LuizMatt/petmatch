import {AnimalController} from "../controller/AnimalController";
import express, {Router} from 'express';
const animalController = new AnimalController();

const router: Router = express.Router();


router.get('/', animalController.getAnimalController);
router.get('/:id', animalController.getAnimalByIdController);
router.post('/', animalController.createAnimalController)
router.put('/', animalController.updateAnimalController)
router.delete('/:id', animalController.deleteAnimalById )

export default router;