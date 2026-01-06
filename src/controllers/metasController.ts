import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import { Meta } from '../models/Meta'
import { User } from '../models/User'
import { AppError } from '../middleware/errorHandler'
import {validateOrReject} from "class-validator";


const userRepository = AppDataSource.getRepository(User)
const metaRepository = AppDataSource.getRepository(Meta)
export const cadastrarMeta = async (req: Request, res: Response,next: NextFunction) => {
    const userId = await userRepository.findOne({
        where: {id: req.userId},
        select : ['id']
    });
    const {descricao, data_inicio,data_fim} = req.body
    const meta = metaRepository.create({descricao, data_inicio,data_fim, user: userId!})
    await validateOrReject(meta)
    await metaRepository.save(meta)

    res.status(201).json({
        status:'sucess',
            data:{
            id: meta.id,
            user: req.userId,
            descricao: meta.descricao,
            data_inicio: meta.data_inicio,
            data_fim: meta.data_fim
        }
    })
}

export const getMetasByUser = async (req: Request, res: Response)=> {

    const metas = await metaRepository.find({
        where: {user: {id: req.userId}},
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

export const getMetasTarefas = async (req: Request, res: Response) => {
    const metasTarefas = await metaRepository.find({
        where: {user: {id:+req.params.userId}},
        select: ['id','descricao','data_inicio','data_fim' ],

        relations: {
            tarefa: true,
        },
    })

    return res.json({status:'sucess', 'data': metasTarefas})
}

export const getUmaMetaByUser = async (req: Request, res: Response)=> {
     const UmaMeta = await metaRepository.findOne({
         where: {user: {id: req.userId}, id: +req.params.metaId},
         select: {
             id: true,
             user: true,
             descricao: true}
     })

    res.json({status: 'Sucess', data:UmaMeta})
 }

 export const updateMeta = async (req:Request, res:Response) => {
    const meta = await metaRepository.findOne({ where: {user: {id: req.userId}, id: +req.params.metaId} });

    if (!meta) {
        return res.status(404).json({ status: 'error', message: 'Meta não encontrada' });
    }

    metaRepository.merge(meta, req.body);
    const updatedMeta = await metaRepository.save(meta);
    return res.json({ status: 'success',
        data: updatedMeta });
}


export const deleteMeta = async(req: Request, res: Response)=> {
    const meta = await metaRepository.findOne({
        where: {user: {id: req.userId}, id:+req.params.metaId}
    })

    if (meta) {
        await metaRepository.delete(meta)
        res.json({status:'sucess', message: "Meta excluída com sucesso!"})
    }

    res.json({status:'error', message: "Meta não encontrada!"})
}

















