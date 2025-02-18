import { DataTypes, Op } from 'sequelize'

/**
 * @typedef {import('sequelize/types').QueryInterface} QueryInterface
 */

/**
 * @param {{ context: QueryInterface }} params
 */
export const up = async ({ context: queryInterface }) => {
  const transaction = await queryInterface.sequelize.transaction()

  try {
    await queryInterface.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    })

    await queryInterface.addConstraint('users', {
      fields: ['balance'],
      type: 'check',
      where: {
        balance: {
          [Op.gte]: 0,
        },
      },
    })

    await transaction.commit()
  } catch (e) {
    await transaction.rollback()
    throw e
  }
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable('users')
}
