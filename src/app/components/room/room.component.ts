import { Component, OnInit} from '@angular/core';
import { TimerService } from 'src/app/services/timer.service';
import { SocketService } from 'src/app/services/socket.service';
import { ActivatedRoute } from '@angular/router';
import { VoteService } from 'src/app/services/vote.service';
import { UserService } from 'src/app/services/users.service';
import { QuestionService } from 'src/app/services/question.service';


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
  option = 0

  //bank of questions, should be obtained randomly. THIS IS BACKEND JOB! ^^
  public bankOfQuestions = []
  
  constructor(
    private timer: TimerService,
    private socket: SocketService,
    private route: ActivatedRoute,
    private voteSer: VoteService,
    private quizSer: QuestionService,
    private userStore: UserService) {
      this.data = {
        user: this.route.snapshot.paramMap.get('name'),
        room: this.route.snapshot.paramMap.get('room'),
        score: 0,
        time : 0
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

    this.socket.getSocket().on("start", quizzes => {
      // If isStarted is false, it means that this is not the host so quizzes are added to the bank 
      if(!this.isStarted) {
        quizzes.forEach(el => {
            this.bankOfQuestions.push(el)
        })
        this.start()
      }
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
    // the start event must only be fired once and by the host
    this.users.forEach(user => {
      if (user.name === this.data.user && user.role === 'host') {
        this.quizSer.getQuizzes(this.bankOfQuestions)
        setTimeout(()=>{
          this.socket.start({data: this.data, quizzes : this.bankOfQuestions})
        }, 300)
      }
    })
    this.isStarted = !this.isStarted
    this.timer.startTimer()
    this.updateCountDown()
  }

  //when user clicks on an answer
  vote(option){
    this.data.time += this.countDown
    this.option = option
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
        }
        //if timer hits -10 then process to next quiz
      else if(this.countDown === -3 && this.nextQuiz()) {
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
    this.data.score += this.voteSer.scoreCalculate(this.option)
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
    this.socket.getSocket().emit("addScore", {
      name: this.data.user,
      score: this.data.score,
      time: 30 - this.data.time
    })

    this.socket.getSocket().emit("getScoreBoard")
    this.socket.getSocket().on("returnScoreBoard", data => {
      localStorage.setItem(this.data.room, JSON.stringify(data))
      window.location.assign('/gameover/'+this.data.room)
    })

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
    var canStart: boolean = false
    this.users.forEach(user => {
      if (user.role === 'host' && user.name === this.data.user && this.users.length >= 3) {
        canStart = true
      }
    })
    return canStart
  }

}
