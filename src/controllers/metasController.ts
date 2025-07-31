import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import { Meta } from '../models/Meta'
import { AppError } from '../middleware/errorHandler'

const metaRepoistory = AppDataSource.getRepository(Meta)

export const cadastrarMeta(req, Response: res) => {

}