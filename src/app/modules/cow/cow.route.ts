import express from 'express'
import { CowController } from './cow.controller'
const router = express.Router()

router.patch('/cows/:id', CowController.updatedCow)
router.delete('/cows/:id', CowController.deleteCow)
router.get('/cows/:id', CowController.getSingleCow)
router.post('/cows', CowController.createCow)
router.get('/cows', CowController.getAllCows)

export const CowRoutes = router