import { Component, OnInit, OnChanges } from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnChanges{

  countDown: number = 10
  isStarted = false;
  data: Object
  //Where we should obtain list of user from backend
  //This is mockup database
  //list of users
  users = [
    // {name: 'Bui Duy Hao', role : 'player'},
    // {name: 'Christopher Satin', role : 'player'},
    // {name: 'Quan Trinh', role : 'host'},
    // {name: 'Tam Dang', role : 'player'},
    // {name: 'Jerome Ching', role : 'player'}
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
    private timer: TimerService,
    private socket: SocketService,
    private route: ActivatedRoute) {
      this.data = {
        user: this.route.snapshot.paramMap.get('name'),
        room: this.route.snapshot.paramMap.get('room')
      }
    }

  //call shortly after constructor
  ngOnInit() {
    this.socket.joinRoom(this.data)
    this.socket.activateUser(this.users, this.data)
    this.socket.leftUser(this.users)
  }

  ngOnChanges() {

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
          //result display here for 10s
          this.showResult()
        }
        //if timer hits -10 then process to next quiz
      else if(this.countDown === -10 && this.nextQuiz()) {
        clearInterval(interval)
        this.updateCountDown()
      }
      
      this.countDown = this.timer.getCountDown()
    } , 1000)
  }

  //display result for 10s
  showResult() {
    //something must be done here to display vote result
    //need data...
    console.log("show result")
  }

  //process to next pop quiz
  nextQuiz() : boolean {
    if(this.bankOfQuestions.length > 1) {
      //Result should be displayed here before go to next
      this.bankOfQuestions.shift()
      this.timer.stopTimer()
      this.timer.resetTimer()
      this.timer.startTimer()
      return true
    }

    this.timer.stopTimer()
    this.timer.resetTimer()
    window.location.assign('/gameover')

    return false
  }
  
  //leave the room
  leaveRoom() {
    if(window.confirm("Are you sure you want to leave?"))
    {
      this.socket.leaveRoom(this.data)
      window.location.assign('/home')
    }
  }

}
