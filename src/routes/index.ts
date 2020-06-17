import { Router, Request, Response } from 'express'
import user from './user'
import session from './session'
import folder from './folder'
import upload from './upload'
import { auth } from '../middlewares/auth'

const routes = Router()

routes.get('/', (request: Request, response: Response) => {
  return response.json({ message: 'Code83 Project - Upfy' })
})

routes.use('/api/v1/', session)
routes.use(auth)
routes.use('/api/v1/users', user)
routes.use('/api/v1/folders', folder)
routes.use('/api/v1/uploads', upload)

export default routes
