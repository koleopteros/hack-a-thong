import { Component, OnInit} from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { VoteService } from 'src/app/services/vote.service';
import { UserService } from 'src/app/services/users.service';


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit{

  countDown: number = 10
  isStarted = false;
  data: any
  //Where we should obtain list of user from backend
  //This is mockup database
  //list of users
  users = []

  //bank of questions, should be obtained randomly. THIS IS BACKEND JOB! ^^
  private bankOfQuestions = [
    {
      quiz: 'What is the name of the first President of the USA?',
      a: 'Abraham Lincoln',
      b: 'Donald Trump',
      c: 'John F. Kennedy',
      d: 'Bill Clinton',
      e: 'Bill Clinton',
      f: 'Bill Clinton'
    },

    {
      quiz: 'What is the shape of Earth',
      a: 'Flat!!!',
      b: 'Earth Shape',
      c: 'I dont know',
      d: 'Bill Clinton',
      e: 'Bill Clinton',
      f: 'Bill Clinton'
    },

    {
      quiz: 'Most loved animal in the world',
      a: 'Dog',
      b: 'Cat',
      c: 'Doggo',
      d: 'Doge',
      e: 'Bill Clinton',
      f: 'Bill Clinton',
    },

  ]
  
  constructor(
    private timer: TimerService,
    private socket: SocketService,
    private route: ActivatedRoute,
    private voteSer: VoteService,
    private userStore: UserService) {
      this.data = {
        user: this.route.snapshot.paramMap.get('name'),
        room: this.route.snapshot.paramMap.get('room')
      }
    }

  //call shortly after constructor
  ngOnInit() {
    this.socket.joinRoom(this.data)
    this.socket.activateUser(this.data)
    this.socket.getSocket().on('activeUser', res => {
      this.users = []
      if (res) this.socket.on_activeUser(this.users, res)
    })

    this.socket.getSocket().on("start", data => {
      if(!this.isStarted)
        this.start()
    })

    this.socket.getSocket().on('leftGroup', (res) => {
      //deep dive object
      this.users.forEach(el => {
        if(el.name === res.user && el.role === "player")
          this.users.splice(this.users.indexOf(el), 1)
      })
  })
  }

  //when the host clicks start game
  start() {
    this.socket.start(this.data)
    this.isStarted = !this.isStarted
    this.timer.startTimer()
    this.updateCountDown()
  }

  //when user clicks on an answer
  vote(option){
    this.voteSer.vote(option, this.socket.getSocket(), this.data.room)
  }

  get canVote() { return this.voteSer.canVote}

  get votes() {return this.voteSer.votes}


  //Countdown must be update every 1 second
  updateCountDown() {
    let interval = setInterval(() =>{

      if(this.countDown ===0) 
        {
          this.socket.getSocket().emit('getVotes', this.data)
          this.socket.getSocket().on("getVotes", votes => {
            this.voteSer.votes = votes
          })
          //if time's up and user have yet chosen, disable all
          if(this.voteSer.canVote) this.voteSer.canVote = false
          //Display votes
        }
        //if timer hits -10 then process to next quiz
      else if(this.countDown === -10 && this.nextQuiz()) {
        clearInterval(interval)
        this.updateCountDown()
        this.voteSer.canVote = true
        this.voteSer.resetVotes(this.socket.getSocket())
      }
      
      this.countDown = this.timer.getCountDown()
    } , 1000)
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

  //conditions to make start button valid
  //conditions included:
  //number of users needed to start a game
  //only host can start a game
  canStart() {
    return (this.users.length >= 2) 
  }

}
