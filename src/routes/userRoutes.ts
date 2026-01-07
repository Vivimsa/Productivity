import { Router } from 'express'
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController'
import {checkJwt} from "../middleware/checkJwt";

const router = Router()

router.route('/user')
    .get(checkJwt,getUsers)
    .post(createUser)

router.route('/user/:id')
    .all(checkJwt)
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser)

export default router

