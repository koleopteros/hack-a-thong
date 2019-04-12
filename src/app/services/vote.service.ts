import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  votes = [0,0,0,0]
  canVote = true


  constructor() { }

  vote(option, socket: Socket, room) {
    this.canVote = false;
    [0,1,2,3].forEach(el=>{
      if(option === el)
      {
        this.votes[el]++;
        socket.emit('vote', {option: option, room: room})
      }
    })
  }

  scoreCalculate(option) {
      return this.votes[option]
  }

  getCurrentVote(option) {
    return option
  }

  resetVotes(socket: Socket) {
    this.votes = [0,0,0,0];
    socket.emit("resetVote")
  }
}
