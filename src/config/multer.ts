import { Options } from 'multer'
import * as AwsSdk from 'aws-sdk'
import * as multerS3 from 'multer-s3'
import { Request } from 'express'
import { randomBytes } from 'crypto'

const multerConfig = {
  storage: multerS3({
    s3: new AwsSdk.S3(),
    bucket: 'upfy/images',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (request: Request, file, callback) => {
      randomBytes(16, (err, hash) => {
        if (err) {
          callback(err, file.filename)
        }
        const filename = `${hash.toString('HEX')}.png`
        callback(null, filename)
      })
    }
  }),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (request: Request, file, callback) => {
    const allowedExt = [
      'image/jpeg',
      'image/jpg',
      'image/png'
    ]

    if (allowedExt.includes(file.mimetype)) {
      callback(null, true)
    } else {
      callback(new Error('Format not accepted'))
    }
  }
} as Options

export default multerConfig
