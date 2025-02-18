import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database.js'

export class User extends Model {
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL,
    allowNull: false,
    defaultValue: 0,
  },
}, { sequelize, tableName: 'users', timestamps: false })
