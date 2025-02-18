import { User } from '../models/user.model.js'

const initialBalance = 10000

export const seedTestUser = async () => {
  try {
    const [user, created] = await User.findOrCreate({
      where: { username: 'test' },
      defaults: {
        username: 'test',
        balance: initialBalance,
      },
    })

    if (!created) {
      user.balance = initialBalance
      await user.save()
    }

    console.log('Пользователь "test" успешно создан/обновлен')
  } catch (error) {
    console.error('Ошибка при выполнении сида:', error)
  }
}