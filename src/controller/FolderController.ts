import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { Folder } from '../entity/Folrder'

export const listFolders = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const folders = await getRepository(Folder).find()

    return response.json(folders)
  } catch (error) {
    return response.status(500).json({ message: 'Error in server' })
  }
}

export const getFolder = async (request: Request, response: Response): Promise<Response<any>> => {
  const { id } = request.params

  try {
    const folder = await getRepository(Folder).findOne(id)

    return response.json(folder)
  } catch (error) {
    return response.status(404).json({ message: 'Folder not found!' })
  }
}

export const saveFolder = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const { name } = request.body

    const folder = await getRepository(Folder).save({
      name
    })
    return response.json(folder)
  } catch (error) {
    return response.status(500).json({ message: 'Error in server' })
  }
}

export const updateFolder = async (request: Request, response: Response): Promise<Response<any>> => {
  const { id } = request.params

  try {
    const { name } = request.body

    const folder = await getRepository(Folder).update(id, {
      name
    })
    if (folder.affected === 1) {
      return response.json({ message: 'Folder updated!' })
    } else {
      return response.json({ message: 'Error in update Folder!' })
    }
  } catch (error) {
    return response.status(404).json({ message: 'Folder not found!' })
  }
}

export const removeFolder = async (request: Request, response: Response): Promise<Response<any>> => {
  const { id } = request.params

  try {
    const folder = await getRepository(Folder).delete(id)

    if (folder.affected === 1) {
      return response.json({ message: 'Folder deleted!' })
    } else {
      return response.json({ message: 'Error in delete Folder!' })
    }
  } catch (error) {
    return response.status(404).json({ message: 'Folder not found!' })
  }
}
