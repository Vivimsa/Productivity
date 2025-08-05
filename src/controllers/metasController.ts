import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import { Meta } from '../models/Meta'
import { AppError } from '../middleware/errorHandler'
import {validateOrReject} from "class-validator";
import {User} from "../models/User";

const metaRepository = AppDataSource.getRepository(Meta)
export const cadastrarMeta = async (req: Request, res: Response,next: NextFunction) => {
    const {descricao, data_inicio,data_fim,user} = req.body
    const meta = metaRepository.create({descricao, data_inicio,data_fim, user})
    await validateOrReject(meta)
    await metaRepository.save(meta)

    res.status(201).json({
        status:'sucess',
            data:{
            id: meta.id,
            user: meta.user,
            descricao: meta.descricao,
            data_inicio: meta.data_inicio,
            data_fim: meta.data_fim
        }
    })
}

export const getMetasByUser = async (req: Request, res: Response)=> {
    const metas = await metaRepository.find({
        where: {user: {id: +req.params.userId}},
        select: {
            id: true,
            descricao: true,
            data_inicio: true,
            data_fim: true,
            user: { id: true }
        }
    })

   res.json({status:'sucess', data: metas})
}

export const getUmaMetaByUser = async (req: Request, res: Response)=> {
     const UmaMeta = await metaRepository.findOne({
         where: {user: {id: +req.params.userId}, id: +req.params.metaId},
         select: {
             id: true,
             user: true,
             descricao: true}
     })

    res.json({status: 'Sucess', data:UmaMeta})
 }



























