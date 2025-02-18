import { validateRequestBody } from '../middlewares/validation.middleware.js'
import Joi from 'joi'
import balanceService from '../services/balance/balance.service.js'
import { BalanceServiceError } from '../services/balance/errors/balance.service.error.js'

const balanceValidateSchema = Joi.object({
  userId: Joi.number().integer().min(1).required(),
  amount: Joi.number().integer().disallow(0).required(),
})

export const balance = [
  validateRequestBody(balanceValidateSchema),
  async (req, res) => {
    const { userId, amount } = req.body

    try {
      await balanceService.modify(userId, amount)

      res.status(200).send()
    } catch (e) {
      if (e instanceof BalanceServiceError) {
        res.status(400).send(e.message)
      } else {
        console.error(e)
        res.status(500).send('Server error')
      }
    }
  },
]