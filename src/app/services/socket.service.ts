import { Injectable, OnInit } from '@angular/core';
import * as io from 'socket.io-client'

//Along the way, i noticed that service is not naturally a singleton as
// i thought. SocketService should be a singleton service
@Injectable({
  providedIn: 'root'
})
export class SocketService{
  
  baseUrl = "http://localhost:5000/"
  socket: any
  private constructor() {
    this.initSocket()
  }

  initSocket() {
    this.socket = io(this.baseUrl)
  }

  joinRoom(data) {
    this.socket.emit('joinRoom', data)
  }

  leaveRoom(data) {
    this.socket.emit('leftGroup', data)
  }

  //Notice that in javascript, objects and arrays are passed by ref
  //so this is acceptable, but for single value like number or string
  //it will pass by value thus the value won't change after function called
  activateUser(users: Object[], data) {
    this.socket.emit('activeUser', data)
    this.socket.on('activeUser', res => {
      if(res)
      {
        let role = (users.length === 0) ? 'host' : 'player'
        users.push({
          name: res.user,
          role: role  
        })
      }
    })
  }

  leftUser(users: any[]) {
    this.socket.on('leftGroup', (res) => {
      
      //deep dive object
      users.forEach(el => {
        if(el.name === res.user && el.role === "player")
          users.splice(users.indexOf(el), 1)
      })
  })
  }

  start(data) {
    this.socket.emit("start", data)
  }

  getSocket() {
    return this.socket
  }
}
