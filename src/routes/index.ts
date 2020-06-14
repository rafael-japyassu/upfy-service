import { Router, Request, Response } from "express";
import user from "./user";
import session from "./session";
import { auth } from "../middlewares/auth";

const routes = Router();

routes.get("/", (request: Request, response: Response) => {
    return response.json({ message: "Code83 Project - Upfy" })
});

routes.use("/api/v1/", session);
routes.use(auth);
routes.use("/api/v1/users", user);

export default routes;
