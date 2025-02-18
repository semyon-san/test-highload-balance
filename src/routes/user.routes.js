import express from 'express'
import * as userController from '../controllers/user.controller.js'

const router = express.Router()

router.post('/user/balance', userController.balance)

export default router