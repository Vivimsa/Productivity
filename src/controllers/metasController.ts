import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import { Meta } from '../models/Meta'
import { User } from '../models/User'
import { AppError } from '../middleware/errorHandler'
import {validateOrReject} from "class-validator";


const userRepository = AppDataSource.getRepository(User)
const metaRepository = AppDataSource.getRepository(Meta)
export const cadastrarMeta = async (req: Request, res: Response,next: NextFunction) => {

    const {titulo,descricao,prioridade,data_expiracao,concluida_em} = req.body

    const meta = metaRepository.create(
        {titulo,descricao,prioridade,data_expiracao,concluida_em, user: {id: req.user_id}})
    await validateOrReject(meta)
    await metaRepository.save(meta)

    return res.json(meta)
}

export const getMetasByUser = async (req: Request, res: Response)=> {

    const metas = await metaRepository.find({
        where: {user: {id: req.user_id}}
    })

   return res.json({status:'sucess', data: metas})
}

export const getMetasTarefas = async (req: Request, res: Response) => {
    const metasTarefas = await metaRepository.find({
        where: {user: {id:+req.params.userId}},
        relations: {
            tarefa: true,
        },
    })

    return res.json({status:'sucess', 'data': metasTarefas})
}

export const getUmaMetaByUser = async (req: Request, res: Response)=> {
     const UmaMeta = await metaRepository.findOne({
         where: {user: {id: req.user_id}, id: +req.params.metaId},
     })

    return res.json(UmaMeta)
 }

 export const updateMeta = async (req:Request, res:Response) => {
    const meta = await metaRepository.findOne({ where: {user: {id: req.user_id}, id: +req.params.metaId} });

    if (!meta) {
        return res.status(404).json({ status: 'error', message: 'Meta não encontrada' });
    }

    metaRepository.merge(meta, req.body);
    const updatedMeta = await metaRepository.save(meta);
    return res.json(updatedMeta);
}


export const deleteMeta = async(req: Request, res: Response)=> {
    const meta = await metaRepository.findOne({
        where: {user: {id: req.user_id}, id:+req.params.metaId}
    })

    if (meta) {
        await metaRepository.softDelete(meta.id)
        return res.json({message: "Meta excluída com sucesso!"})
    }

    return res.json({message: "Meta não encontrada!"})
}

















