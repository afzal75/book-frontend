import express from 'express'
import { AllUserController } from './user.controller'
const router = express.Router()

router.patch('/users/:id', AllUserController.updateUser)
router.delete('/users/:id', AllUserController.deleteUser)
router.get('/users/:id', AllUserController.getSingleUser)
router.get('/users', AllUserController.getAllUsers)

export const UserRoutes = router