import userRepository from '../../repositories/user.repository.js'
import { BalanceServiceError } from './errors/balance.service.error.js'
import { UserNotFoundRepositoryError } from '../../repositories/repository.error.js'

export class BalanceService {
  async modify(userId, amount) {
    if (amount === 0) return

    try {
      const userBalance = await userRepository.getBalance(userId)

      if (
        (userBalance + amount) < 0
        || !await userRepository.updateBalance(userId, amount)
      ) {
        throw new BalanceServiceError('Balance is too low for this operation')
      }

    } catch (e) {
      if (e instanceof UserNotFoundRepositoryError) {
        throw new BalanceServiceError(`User not found: ${userId}`)
      }

      throw e
    }
  }
}

const balanceService = new BalanceService()

export default balanceService