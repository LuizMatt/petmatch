import express, {Router} from 'express';
import {AuthController} from '../controller/AuthController'
import { authMiddleware } from '../middleware/AuthMiddleware';
const authController = new AuthController();

const router: Router = express.Router();

router.post("/register", authMiddleware, authController.register);
router.post("/login", authMiddleware, authController.login);

export default router;