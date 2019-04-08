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

let userNames = []
// user connect to socket
io.on('connection', socket => {
  let room = '' // room name is created
  let user = '' // user name join the room
  votes = [0,0,0,0]
  // user disconnect
  socket.on('disconnect', () => {
    if (room !== '') {
      io.to(room).emit('leftGroup', {
        user: user,
      })
    }
  })

  //vote rules
  socket.on('vote', data => {
    [0,1,2,3].forEach(el => {
      if(data.option === el) votes[el]++
    })
  })

  socket.on('getVotes', data => {
    console.log("getVote!!!")
    io.in(data.room).emit('getVotes', votes)
  })

  socket.on('resetVote', () => {
    console.log("Votes are reseted")
    votes = [0,0,0,0]
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
    userNames.push({
      name: data.user,
      id: socket.id
    })
  })

  // Send activeUser to other members in the group
  socket.on('activeUser', data => {
    user = data.user
    console.log(userNames)
    io.in(data.room).clients((err, clients)=>{
      let activeUsers = []
      userNames.forEach(user => {
        if(clients.indexOf(user.id) > -1){
          activeUsers[activeUsers.length] = user.name
        }
      })
      io.in(data.room).emit('activeUser', activeUsers)
    })
  })

  // Announce other members in the group "user has left the group"
  socket.on('leftGroup', data => {
    socket.to(data.room).emit('leftGroup', data)
    socket.leave(data.room)
  })

  //testing - by Franklin
  socket.on("start", data => {
    socket.to(data.room).emit('start', data)
  })

})

// Use route
app.use('/question', questions)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(__dirname + '/dist/jack-box'))

  // Set default file for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist/jack-box/index.html'))
  })
}

// Set port
const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

module.exports = io
