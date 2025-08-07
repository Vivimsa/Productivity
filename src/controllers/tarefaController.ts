import { Request, Response, NextFunction } from 'express'
import { AppDataSource } from '../config/database'
import { Meta } from '../models/Meta'
import {validateOrReject} from "class-validator";
import {Tarefa} from "../models/Tarefa";

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
        return res.status(404).json({ status: 'error', message: 'Tarefa não encontrada' })
    }

    return res.json({ status: 'success', data: tarefa })
}













