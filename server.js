const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoURI = 'mongodb://admin:admin123@ds121238.mlab.com:21238/sheepboxhackathon'

// Connect to Database
mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.log(err))

// Import routes
const questions = require('./back_end/questions_api')

const app = express()

// / parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Middleware
app.use(bodyParser.json())

// Create server instance
const server = http.createServer(app)

// Create IO using server instance
const io = socketIO(server)

app.use(cors())

// user connect to socket
io.on('connection', socket => {
  let room = '' // room name is created
  let user = '' // user name join the room
  console.log("a user connected")

  // user disconnect
  socket.on('disconnect', () => {
    if (room !== '') {
      io.to(room).emit('leftGroup', {
        user: user,
      })
    }
  })

  // user join room
  socket.on('join room', (data) => {
    socket.join(data.roomName)
    room = data.roomName
    console.log(`${data.userName} joined room "${data.roomName}"`)
  })

  socket.on('vote', data => {
    io.emit('vote', {
      user: data.user,
      question: data.question,
      answer: data.answer,
    })
  })

  // socket when user register successfully
  socket.on('registerUser', data => {
    // emit a socket after register
    io.emit('registerSuccess', {
      message: 'Register successfully',
      user: data.user,
    })
  })

  // socket when user join the room
  socket.on('joinRoom', data => {
    socket.join(data.room)
    room = data.room // save the room name
  })

  // Send activeUser to other members in the group
  socket.on('activeUser', data => {
    user = data.user
    io.in(data.room).emit('activeUser', data)
  })

  // Announce other members in the group "user has left the group"
  socket.on('leftGroup', data => {
    socket.to(data.room).emit('leftGroup', data)
    socket.leave(data.room)
  })
})

// Use route
app.use('/question', questions)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('build'))

  // Set default file for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

// Set port
const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

module.exports = io
