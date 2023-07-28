const http = require('http')
const express = require('express')

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())

const server = http.createServer(app)

server.listen(PORT, () =>{
    console.log(`Server started in PORT:${PORT}`)
})