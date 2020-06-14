import { Router } from "express";
import { login } from "../controller/UserController";
const sessionRoutes = Router();

sessionRoutes.post("/session", login);

export default sessionRoutes;
