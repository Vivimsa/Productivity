import {Router} from 'express'
import {
    cadastrarMeta,
    deleteMeta,
    getMetasByUser,
    getMetasTarefas,
    getUmaMetaByUser,
    updateMeta
} from "../controllers/metasController";

const router=Router()

router.route('/metas').post(cadastrarMeta)
router.route('/user/:userId').get(getMetasByUser)
router.route('/metasTarefas').get(getMetasTarefas)
router.route('/metas/:metaId').get(getUmaMetaByUser).put(updateMeta).delete(deleteMeta)


export default router