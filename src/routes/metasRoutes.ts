import {Router} from 'express'
import {cadastrarMeta, getMetasByUser, getUmaMetaByUser} from "../controllers/metasController";

const router=Router()

router.route('/').post(cadastrarMeta)
router.route('/user/:userId').get(getMetasByUser)
router.route('/user/:userId/meta/:metaId').get(getUmaMetaByUser)

export default router