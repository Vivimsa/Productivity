import { Router } from 'express';

import {
    buscaTarefaPorMeta,
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
router.route('/tarefas_por_meta/:metaId').get(getTarefas)
export default router

