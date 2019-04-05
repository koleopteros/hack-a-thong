import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  countDown: number = 10
  //Where we should obtain list of user from backend
  //This is mockup database
  //list of users
  private users = [
    {name: 'Bui Duy Hao', role : 'player'},
    {name: 'Christopher Satin', role : 'player'},
    {name: 'Quan Trinh', role : 'host'},
    {name: 'Tam Dang', role : 'player'},
    {name: 'Jerome Ching', role : 'player'}
  ]
  //bank of questions, should be obtained randomly. THIS IS BACKEND JOB! ^^
  private bankOfQuestions = [
    {
      quiz: 'What is the name of the first President of the USA?',
      a: 'Abraham Lincoln',
      b: 'Donald Trump',
      c: 'John F. Kennedy',
      d: 'Bill Clinton'
    }
  ]
  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog) { }

  ngOnInit() {
    let interval = setInterval(() =>{
      this.countDown !== 0 ? this.countDown-- : clearInterval(interval)
    } , 1000)
  }
  
  leaveRoom() {
    if(window.confirm("Are you sure you want to leave?"))
      window.location.assign('/home')
  }
  openDialog(message) {
  }

}
