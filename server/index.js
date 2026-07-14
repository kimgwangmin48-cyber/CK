import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'
import authRouter from './routes/auth.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, '..', 'dist')

const app = express()
app.use(express.json())

app.use('/api', authRouter)

app.use(express.static(distDir))
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(distDir, 'index.html'))
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Solarix AI server listening on port ${port}`)
})
