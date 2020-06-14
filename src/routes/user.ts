import { Router } from "express";
import { saveUser, listUser } from "../controller/UserController";
const userRoutes = Router();

userRoutes.get("/", listUser);
userRoutes.post("/", saveUser);

export default userRoutes;
