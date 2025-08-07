import { Router } from 'express';

import {cadastrarTarefa, getTarefa} from "../controllers/tarefaController";

const router = Router();
router.route('/').post(cadastrarTarefa)
router.route('/user/:userId/meta/:metaId/tarefa/:tarefaId').get(getTarefa)
export default router;

