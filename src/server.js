const express = require('express')
const socketIo = require('socket.io')
const cors = require('cors')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./model/user.js')
const http = require('http')
const path = require('path')
const { existsSync } = require('fs')
const { MONGO_URI } = require('./config/config.js')
const app = express()
const { createUser, getUser } = require('./controller/userController.js')

const server = http.createServer(app)

app.use(cors({
  origin : '*',
  methods : ['GET', 'POST'],
  allowedHeaders : ['Content-Type']
}))


const IO = socketIo(server, {
  cors : {
    origin : '*',
    methods : ['GET', 'POST'],
    allowedHeaders : ['Content-Type']
  }
})

app.get('/:namePic', (req, res) => {
  const namePic = req.params.namePic
  if (namePic.includes('/')) {
    return res.sendStatus(400)
  }
  const pathFile = path.join(__dirname, 'upload', namePic)
  if (existsSync(pathFile)) {
    res.sendFile(pathFile)
  } else {
    res.sendStatus(404)
  }
})

// Daftar
// Masuk
// Keluar
// ListChannel
// Channel 
// Send dan receive
// Send Date

app.use(express.static( path.join( __dirname, 'public' )))

app.get('/', (req,res) => {
  const index = path.join(__dirname, 'public', 'index.html')
  res.sendFile(index)
})


app.get('/api/user' , createUser)
app.get('/api/users' , getUser)

app.post('/api/user' ,(req, res) => {
  res.send('Connected API')
})

app.get('/api/chat' ,(req, res) => {
  res.send('Connected API')
})

app.post('/api/chat' ,(req, res) => {
  res.send('Connected API')
})

app.get('/api/message' ,(req, res) => { 
  res.send('Connected API')
})

app.post('/api/message' ,(req, res) => {
  res.send('Connected API')
})

app.use((req, res, next) => {
  res.json("Page not found")
})

// ================================================== SOCKET.IO Event ==================================================

IO.on('connection', (socket) => {
  console.log(' client is connect')

  socket.on('send_message', (message) => {
    IO.emit('send_message', message)
  })

  socket.on('disconnect' , () => {
    console.log('client is disconnect')
  })
})
console.log('Mongo URI : ', MONGO_URI, )

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
  console.log('Connected to mongoDB');
}).on('error', (error) => { 
  console.log('Connection error : ', error)
})

const PORT = process.env.NODE_PORT || 7575
server.listen(PORT, () => {
  console.log(`server is running on port = ${PORT}`)
})