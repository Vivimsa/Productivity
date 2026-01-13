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
router.route('/tarefa').post(cadastrarTarefa)
router.route('/tarefa').get(getMetasTarefas)
router.route('/tarefa/:tarefaId/meta/:metaId').get(getTarefa).put(updateTarefa).delete(deleteTarefa)
router.route('/:metaId').get(getTarefas)
export default router

