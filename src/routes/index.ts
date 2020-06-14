import { Router, Request, Response } from "express";
import user from "./user";

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'Code83 Project - Upfy' })
});

routes.use('/api/users', user);

export default routes;
