import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {

    const { email, password } = request.body

    try {
        const user = await getRepository(User).find({
            where: {
                email
            }
        })
    
        if (user.length === 1) {
    
            if (await bcrypt.compare(password, user[0].password)) {
    
                const token = jwt.sign({ id: user[0].id }, process.env.APP_SECRET_KEY, {
                    expiresIn: '1d'
                })
    
                const data = {
                    id: user[0].id,
                    name: user[0].name,
                    email: user[0].email,
                    token
                }
    
                return response.json(data)
    
            } else {
    
                return response.status(404).json({ message: 'User not found' })
    
            }
    
        } else {
    
            return response.status(404).json({ message: 'User not found' })
        }
    } catch(error) {
        return response.status(500).json({ message: 'Error in server' })
    }


}

export const listUser = async (request: Request, response: Response) => {

    try {
        const users = await getRepository(User).find()

        return response.json(users)
    } catch(error) {
        return response.status(500).json({ message: 'Error in server' })
    }
}

export const saveUser = async (request: Request, response: Response) => {

    try {
        const { name, email, password } = request.body

        const passwordHash = await bcrypt.hash(password, 8)

        const user = await getRepository(User).save({
            name,
            email,
            password: passwordHash
        })

        return response.json(user)

    } catch(error) {
        return response.status(500).json({ message: 'Error in server' })
    }
}