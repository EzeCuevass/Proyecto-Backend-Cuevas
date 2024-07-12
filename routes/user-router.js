import { Router } from "express";
import * as controllers from "../controllers/user-controller.js"
const router = Router();

router.post('/register', controllers.createUser)

router.get('/register', controllers.viewRegister)

router.get('/login', controllers.logUser)

export default router;