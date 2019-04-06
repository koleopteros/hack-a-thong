import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  countDown: number = 10
  isStarted = false;
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
    },

    {
      quiz: 'What is the shape of Earth',
      a: 'Flat!!!',
      b: 'Earth Shape',
      c: 'I dont know',
      d: 'Bill Clinton'
    },

    {
      quiz: 'Most loved animal in the world',
      a: 'Dog',
      b: 'Cat',
      c: 'Doggo',
      d: 'Doge'
    },

  ]
  constructor(
    private timer: TimerService) { }

  ngOnInit() {
    // this.timer.startTimer()
    // this.updateCountDown()
  }

  //when the host clicks start game
  start() {
    this.isStarted = !this.isStarted
    this.timer.startTimer()
    this.updateCountDown()
  }

  //Countdown must be update every 1 second
  updateCountDown() {
    let interval = setInterval(() =>{

      if(this.countDown ===0) 
        {
          clearInterval(interval)
        }
      
      this.countDown = this.timer.getCountDown() 
    } , 1000)
  }
  
  //leave the room
  leaveRoom() {
    if(window.confirm("Are you sure you want to leave?"))
      window.location.assign('/home')
  }

}
