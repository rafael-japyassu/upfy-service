import { getRepository } from 'typeorm'
import { Request, Response } from 'express'
import { FileUpload } from '../entity/FileUpload'
import * as AwsSdk from 'aws-sdk'

// interface IRequestFile extends Request{
//   location: string
//   key: string
// }

export const saveFile = async (request: any, response: Response): Promise<Response<any>> => {
  const { name, folder } = request.body
  try {
    const uploadFile = await getRepository(FileUpload).save({
      name,
      folder,
      path: request.file.location,
      size: request.file.size,
      key: request.file.key
    })

    return response.status(200).json(uploadFile)
  } catch (error) {
    return response.status(500).json({ message: 'Error in server' })
  }
}

export const listFiles = async (request: Request, response: Response): Promise<Response<any>> => {
  try {
    const uploadFiles = await getRepository(FileUpload).find()

    return response.status(200).json(uploadFiles)
  } catch (error) {
    return response.status(500).json({ message: 'Error in server' })
  }
}

export const getFile = async (request: Request, response: Response): Promise<Response<any>> => {
  const { id } = request.params
  try {
    const uploadFile = await getRepository(FileUpload).findOne(id)

    return response.status(200).json(uploadFile)
  } catch (error) {
    return response.status(404).json({ message: 'File not found' })
  }
}

export const deleteFile = async (request: Request, response: Response): Promise<Response<any>> => {
  const { id } = request.params
  const s3 = new AwsSdk.S3()

  try {
    const uploadFile = await getRepository(FileUpload).findOne(id)

    s3.deleteObject({
      Bucket: 'upfy/images',
      Key: uploadFile.key
    }).promise().then(() => {
      getRepository(FileUpload).delete(id).then(() => {
        return response.status(200).json({ message: 'File removed!' })
      })
    }).catch(() => {
      return response.status(500).json({ message: 'Error in delete File' })
    })
  } catch (error) {
    return response.status(404).json({ message: 'File not found' })
  }
}
