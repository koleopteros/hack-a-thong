import { Injectable } from '@angular/core';
import { Store } from '../shared/store';
import { Users } from '../shared/users';

@Injectable({
    providedIn: 'root'
  })

export class UserService extends Store<Users>{
    constructor() {
        super(new Users());
    }
    addUser(id:string, name:string, role:string = 'player'):void{
        name = this.validateUsername(name)
        this.setState({...this.state, 
            userList: [...this.state.userList,{id:id, username:name, role:role, score:0, isConnected:true}]
            });
    }
    addToUserScore(name:string, points:number):void {
        this.setState({
          ...this.state,
          userList: this.state.userList.map(user => {
            if (user.username == name){
              return {...user, score: user.score+points};
            }
            return user;
          })
        });
    }
    disconnectedUser(id:string):void{
      this.setState({
        ...this.state,
        userList: this.state.userList.map(user => {
          if (user.id == id){
            return {...user, isConnected:false};
          }
          return user;
        })
      })
    }
    validID(id:string):boolean{
      var user = this.state.userList.filter((user)=>{
        return user.id == id;
      })
      return user.length == 0;
    }
    validateUsername(username:string, n:number = 0):string{
      var name = n>0 ? username+n:username;
      var user = this.state.userList.filter((user)=>{
        return user.username == name;
      })
      if(user.length == 0){
        name = this.validateUsername(username,n++)
      }
      return name;
    }
}