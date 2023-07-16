import express from 'express'
import { AuthController } from './auth.controller'
const router = express.Router()

router.post('/auth/signup', AuthController.createUser)

export const AuthRoutes = router