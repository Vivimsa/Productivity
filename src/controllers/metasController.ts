import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import { Meta } from '../models/Meta'
import { AppError } from '../middleware/errorHandler'

const metaRepository = AppDataSource.getRepository(Meta)

export const cadastrarMeta = async (req: Request, res: Response,next: NextFunction) => {
    const {descricao, data_inicio,data_fim} = req.body
    const metas = metaRepository.create({descricao, data_inicio,data_fim})
    await metaRepository.save(metas)
}