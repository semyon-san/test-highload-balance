import express from 'express'
import userRoutes from './routes/user.routes.js'
import umzug from './migrate.js'
import { seedTestUser } from './seeders/users.seed.js'

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

const rootRoute = '/api'

app.use(rootRoute, userRoutes)

// Note: In test task it was required to run migrations at app start
console.log('Running migrations ...')
umzug.up().then(async (result) => {
    await seedTestUser()
    console.log('Migrations completed successfully!\n')

    app.listen(port, () => {
      console.log('Listening on port: ' + port)
    })
  },
)