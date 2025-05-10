import express, {Router} from 'express';
import {AuthController} from '../controller/AuthController'

const authController = new AuthController();

const router: Router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

export default router;