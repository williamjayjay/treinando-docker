import express from 'express'
import { config } from 'dotenv'

config()
const app = express()

app.listen(process.env.API_PORT, () => {
  return console.log(`teste 2Servidor inicializado, ouvindo na porta: ${process.env.API_PORT}, rodando em ${process.env.NODE_ENV}`
  )
})
