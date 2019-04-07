import { Injectable } from '@angular/core';
import { Users } from '../shared/users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  userList = {}

  constructor() { }

  /** signIn
   * Check if a userlist for specified room exists, if so, append, else create new room
   * Also checks if there is a duplicate user, if so, use checkDuplicate to alter the name.
   * @param username
   * @param room
   * @return Void
   */
  signIn(room:string, username:string){
    //check if userlist for room has been made, and ensure it is of the intended class
    if(this.userList[room] != undefined && this.userList[room].constructor.name === 'Users'){
      this.userList[room].addUser(username);
    } else { // insert first user into this new room
      this.userList[room] = new Users(username);
    }
  }
  /** updateScores
   * Calls the Users class in the specified room and updates a single user's score
   * @param room 
   * @param username 
   * @param score 
   */
  updateScores(room:string, username:string, score:number){
    if(this.userList[room] != undefined && this.userList[room].constructor.name === 'Users'){
      this.userList[room].updateUserScore(username,score);
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
  /** getList
   * Retrieves the list of Users within a specific room
   * If Room does not exist, returns empty list.
   * @param room
   */
  getList(room:string){
    if(this.userList[room] != undefined && this.userList[room].constructor.name === 'Users'){
      return this.userList[room].getUserList()
    }
    return []
  }
}