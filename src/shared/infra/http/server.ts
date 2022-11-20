import express from 'express'
import { config } from 'dotenv'
import { routes } from './routes'
import { createConnection } from 'typeorm'
import "reflect-metadata"
// import "../typeorm"

createConnection()

config()

const app = express()
app.use(express.json())
app.use(routes)

app.listen(process.env.API_PORT, () => {
  return console.log(`teste 2Servidor inicializado, ouvindo na porta: ${process.env.API_PORT}, rodando em ${process.env.NODE_ENV}`
  )
})
