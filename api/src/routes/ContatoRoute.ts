import express, {Router} from 'express';
import { ContatoController } from '../controller/ContatoController';

const router: Router = express.Router();

const contatoController = new ContatoController();

router.post('/', contatoController.createContatoController);

router.get('/', contatoController.getAllContatosController);

router.get('/:id', contatoController.getContatoByIdController);

router.put('/:id', contatoController.updateContatoController);

router.delete('/:id', contatoController.deleteContatoByIdController);

export default router;


