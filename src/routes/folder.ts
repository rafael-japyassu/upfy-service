import { Router } from 'express'
import { saveFolder, listFolders, getFolder, updateFolder, removeFolder } from '../controller/FolderController'
const folderRoutes = Router()

folderRoutes.get('/', listFolders)
folderRoutes.get('/:id', getFolder)
folderRoutes.post('/', saveFolder)
folderRoutes.put('/:id', updateFolder)
folderRoutes.delete('/:id', removeFolder)

export default folderRoutes
