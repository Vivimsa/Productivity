import {Router} from 'express'
import {cadastrarMeta} from "../controllers/metasController";

const router=Router()

router.route('/').post(cadastrarMeta)

export default router