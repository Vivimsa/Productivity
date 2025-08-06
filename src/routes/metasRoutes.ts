import {Router} from 'express'
import {cadastrarMeta, deleteMeta, getMetasByUser, getUmaMetaByUser, updateMeta} from "../controllers/metasController";

const router=Router()

router.route('/').post(cadastrarMeta)
router.route('/user/:userId').get(getMetasByUser)
router.route('/user/:userId/meta/:metaId').get(getUmaMetaByUser).put(updateMeta).delete(deleteMeta)


export default router