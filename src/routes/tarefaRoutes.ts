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
router.route('/').get(getMetasTarefas)
router.route('/:tarefaId/meta/:metaId').get(getTarefa).put(updateTarefa).delete(deleteTarefa)
router.route('/:metaId').get(getTarefas)
export default router

