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
router.route('/tarefas').post(cadastrarTarefa)
router.route('/tarefas').get(getMetasTarefas)
router.route('/tarefas/:tarefaId/meta/:metaId').get(getTarefa).put(updateTarefa).delete(deleteTarefa)
router.route('/tarefas_por_meta/:metaId').get(getTarefas)
export default router

