import { SequelizeStorage, Umzug } from 'umzug'
import sequelize from './config/database.js'
import { fileURLToPath } from 'url'
import * as path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const umzug = new Umzug({
  migrations: {
    glob: path.join(__dirname, 'migrations/*.js'),
  },
  context: sequelize.getQueryInterface(),
  storage: new SequelizeStorage({ sequelize }),
  logging: console.log,
})

if (import.meta.url === `file://${process.argv[1]}`) {
  umzug.runAsCLI()
}

export default umzug