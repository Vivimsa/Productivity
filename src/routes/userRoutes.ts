import { Router } from 'express'
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/userController'

import {login} from '../controllers/authController'

const router = Router()

router.route('/').get(getUsers).post(createUser)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)
//router.route('/login').post(login)

export default router