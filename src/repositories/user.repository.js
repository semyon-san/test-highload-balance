import { User } from '../models/user.model.js'
import { Op } from 'sequelize'
import { RepositoryError } from './repository.error.js'

export class UserRepository {
  /**
   * @param {number} userId
   * @returns {Promise<number>} - returns user balance
   */
  async getBalance(userId) {
    const user = await User.findByPk(userId, { attributes: ['balance'] })
    if (!user) {
      throw new RepositoryError(`User not found: ${userId}`)
    }

    return user.balance
  }

  /**
   * @param {number} userId
   * @param {number} amount - positive or negative integer
   * @returns {Promise<boolean>} - returns false if user not found or balance is too low, true otherwise
   */
  async updateBalance(userId, amount) {
    const [[, updatedCount]] = await User.increment('balance', {
      by: amount,
      where: { id: userId, balance: { [Op.gte]: -amount } },
      returning: false,
    })

    return updatedCount > 0
  }
}

const userRepository = new UserRepository()

export default userRepository