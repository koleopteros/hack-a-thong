import { Injectable} from '@angular/core';
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
