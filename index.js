import express from 'express'
import 'dotenv/config'
import router from './router.js'
import { runSqlFile } from './db/db.js'

const PORT = process.env.port || 8000

await runSqlFile('./seed.sql')

const app = express()

app.use(express.json())
app.use('/api',router)

app.listen(PORT,() => {
    console.log(`Server started on port ${PORT}`)
})

