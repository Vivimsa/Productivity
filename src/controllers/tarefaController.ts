import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import {Tarefa} from "../models/Tarefa";
import {AppError} from "../middleware/errorHandler";

const tarefaRepository = AppDataSource.getRepository(Tarefa)

export const cadastrarTarefa = async (req: Request, res: Response) => {
    const {descricao, registro_tempo, data_inicio, data_fim, metaId, userId} = req.body
    const tarefa = tarefaRepository.create({descricao, registro_tempo, data_inicio, data_fim, meta:{id:metaId}, user:{id:userId}})
    await tarefaRepository.save(tarefa)
    res.json({status:'sucess', data: tarefa})
}

export const getTarefa = async (req: Request, res: Response, next: NextFunction) => {
    const tarefa = await tarefaRepository.findOne({
        where: {
            user: { id: +req.params.userId },
            meta: { id: +req.params.metaId },
            id: +req.params.tarefaId
        },
        relations: {
            user: true,
            meta: true
        },
    })

    if (!tarefa) {
        return res.status(404).json({message: 'Tarefa não encontrada' })
    }

    return res.json({ status: 'success', data: tarefa})
}

export const getTarefas = async (req: Request, res: Response)=> {
    const tarefas = await tarefaRepository.find({
        where: {user: {id:+req.params.userId}, meta:{id:+req.params.metaId}},
        select: ['id','registro_tempo','descricao','data_inicio','data_fim' ]
    })

    if(!tarefas) throw new AppError('Tarefa não encontrada', 404)

    res.json({status:'sucess', 'data': tarefas})
}

export const getMetasTarefas = async (req: Request, res: Response) => {
    const tarefas = await tarefaRepository.find({
        where: {user: {id:+req.params.userId}},
        select: ['id','registro_tempo','descricao','data_inicio','data_fim' ],

            relations: {
                meta: true,
            },
    })

    return res.json({status:'sucess', 'data': tarefas})
}

export const updateTarefa = async (req: Request, res: Response) => {
    const tarefa = await tarefaRepository.findOne({
        where: {
            user: { id: +req.params.userId },
            meta: { id: +req.params.metaId },
            id: +req.params.tarefaId
        }
    })

    if(!tarefa) throw new AppError('tarefa não encontrada',404)
    tarefaRepository.merge(tarefa,req.body)
    const updateTarefa = await tarefaRepository.save(tarefa)
    res.json({updateTarefa})
}

export const deleteTarefa = async (req: Request, res: Response)=> {
    const tarefa = await tarefaRepository.findOne({
        where: {
            user: { id: +req.params.userId },
            meta: { id: +req.params.metaId },
            id: +req.params.tarefaId
        }
    })

    if(tarefa) await tarefaRepository.delete(tarefa)
    res.send({message: 'Tarefa excluída com sucesso'})
}













