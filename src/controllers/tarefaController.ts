import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import {Tarefa} from "../models/Tarefa";
import {AppError} from "../middleware/errorHandler";

const tarefaRepository = AppDataSource.getRepository(Tarefa)

export const cadastrarTarefa = async (req: Request, res: Response) => {

    const {titulo, descricao, concluida_em, data_expiracao, status, meta_id} = req.body
    const tarefa = tarefaRepository.create({titulo, descricao, concluida_em, data_expiracao, status, meta:{id:meta_id}, user:{id:req.user_id}})
    await tarefaRepository.save(tarefa)
    res.json(tarefa)
}

export const getTarefa = async (req: Request, res: Response, next: NextFunction) => {
    const tarefa = await tarefaRepository.findOne({
        where: {
            user: { id: req.user_id },
            meta: { id: +req.params.metaId },
            id: +req.params.tarefaId
        },
        relations: {
            meta: true
        },
    })

    if (!tarefa) {
        return res.status(404).json({message: 'Tarefa não encontrada' })
    }

    return res.json(tarefa)
}

export const getTarefas = async (req: Request, res: Response)=> {
    const tarefas = await tarefaRepository.find({
        where: {user: {id:req.user_id}, meta:{id:+req.params.metaId}}
    })

    if(!tarefas) throw new AppError('Tarefa não encontrada', 404)

    res.json(tarefas)
}

export const getMetasTarefas = async (req: Request, res: Response) => {
    const tarefas = await tarefaRepository.find({
        where: {user: {id:req.user_id}},
            relations: {
                meta: true,
            },
    })

    return res.json(tarefas)
}

export const updateTarefa = async (req: Request, res: Response) => {
    const tarefa = await tarefaRepository.findOne({
        where: {
            user: { id: req.user_id },
            meta: { id: +req.params.metaId },
            id: +req.params.tarefaId
        }
    })

    if(!tarefa) throw new AppError('tarefa não encontrada',404)
    tarefaRepository.merge(tarefa,req.body)
    const updateTarefa = await tarefaRepository.save(tarefa)
    res.json(updateTarefa)
}

export const deleteTarefa = async (req: Request, res: Response)=> {
    const tarefa = await tarefaRepository.findOne({
        where: {
            user: { id: req.user_id },
            meta: { id: +req.params.metaId },
            id: +req.params.tarefaId
        }
    })

    if(tarefa) await tarefaRepository.softDelete(tarefa.id)
    res.send({message: 'Tarefa excluída com sucesso'})
}













