import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import { Meta } from '../models/Meta'
import { AppError } from '../middleware/errorHandler'
import {validateOrReject} from "class-validator";
import {User} from "../models/User";

const metaRepository = AppDataSource.getRepository(Meta)
const userRepository = AppDataSource.getRepository(User)
export const cadastrarMeta = async (req: Request, res: Response,next: NextFunction) => {
    const {userId, descricao, data_inicio,data_fim} = req.body
    const meta = metaRepository.create({descricao, data_inicio,data_fim})
    await validateOrReject(meta)
    await metaRepository.save(meta)

    res.status(201).json({
        status:'sucess',
            data:{
            descricao: meta.descricao,
            data_inicio: meta.data_inicio,
            data_fim: meta.data_fim
        }
    })
}

