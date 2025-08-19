import { Router } from 'express';

import {
    cadastrarTarefa,
    deleteTarefa,
    getMetasTarefas,
    getTarefa,
    getTarefas,
    updateTarefa
} from "../controllers/tarefaController"

const router = Router()
router.route('/').post(cadastrarTarefa)
router.route('/user/:userId').get(getMetasTarefas)
router.route('/user/:userId/meta/:metaId/tarefa/:tarefaId').get(getTarefa).put(updateTarefa).delete(deleteTarefa)
router.route('/user/:userId/meta/:metaId').get(getTarefas)
export default router

