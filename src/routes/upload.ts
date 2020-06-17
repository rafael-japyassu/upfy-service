import { Router } from 'express'
import * as multer from 'multer'
import multerConfig from '../config/multer'
import { saveFile, deleteFile, listFiles, getFile } from '../controller/FileUploadController'

const fileRoutes = Router()

fileRoutes.post('/', multer(multerConfig).single('file'), saveFile)
fileRoutes.get('/', listFiles)
fileRoutes.get('/:id', getFile)
fileRoutes.delete('/:id', deleteFile)

export default fileRoutes
