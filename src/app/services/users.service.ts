import { Injectable } from '@angular/core';
import { Users } from '../users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  userList = {}

  constructor() { }

  /** signIn
   * Check if a userlist for specified room exists, if so, append, else create new room
   * Also checks if there is a duplicate user, if so, use checkDuplicate to alter the name.
   * @param socket_id
   * @param username
   * @param room
   * @return Void
   */
  signIn(room:string, socket_id:string, username:string){
    //check if userlist for room has been made, and ensure it is of the intended class
    if(this.userList[room] != undefined && this.userList[room].constructor.name === 'Users'){
      this.userList[room].addUser(socket_id, username);
    } else { // insert first user into this new room
      this.userList[room] = new Users(socket_id,username);
    }
  }
  updateScores(room:string, socket_id:string, score:number){
    if(this.userList[room] != undefined && this.userList[room].constructor.name === 'Users'){
      this.userList[room].updateUserScore(socket_id,score);
    }
  }
  /** clearEmptyRoom
   * just deletes empty rooms.  Since there is no "remove User" from rooms, there isn't much use for this.
   * potentially useless
   * @param room 
   */
  clearEmptyRoom(room:string){
    if(this.userList[room].length == 0){
      delete this.userList[room]
    }
  }
}