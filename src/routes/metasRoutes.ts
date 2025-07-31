import {Router} from 'express'
import {cadastrarMeta} from "../controllers/metasController";

const router=Router()

router.route('/metas').post(cadastrarMeta)

export default router