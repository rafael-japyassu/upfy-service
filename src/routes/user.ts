import { Router } from 'express'
import { saveUser, listUser, findUser } from '../controller/UserController'
const userRoutes = Router()

userRoutes.get('/', listUser)
userRoutes.get('/:id', findUser)
userRoutes.post('/', saveUser)

export default userRoutes
