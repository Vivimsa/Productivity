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

router.route('/')
    .get(checkJwt,getUsers)
    .post(createUser)

router.route('/:id')
    .all(checkJwt)
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

export default router

