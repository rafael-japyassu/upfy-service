import { Router, Request, Response } from "express";

const userRoutes = Router();

userRoutes.get('/', (request: Request, response: Response) => {
    return response.json({ message: 'User GET router' })
});

export default userRoutes;
