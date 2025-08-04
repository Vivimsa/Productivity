import {Router} from 'express'
import {cadastrarMeta, getMetasByUser} from "../controllers/metasController";

const router=Router()

router.route('/').post(cadastrarMeta)
router.route('/user/:userId').get(getMetasByUser)

export default router