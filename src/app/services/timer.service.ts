import { Injectable } from '@angular/core';
import { timer, Subscription } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class TimerService {

  timer: Subscription
  countDown: number = 10
  constructor() { }

  startTimer() {
    this.timer = timer(0, 1000).subscribe(
      () => {
        this.countDown !==0 ? this.countDown-- : this.stopTimer()
      }
    )
  }

  getCountDown() {
    return this.countDown
  }

  stopTimer() {
    if(this.timer && !this.timer.closed) this.timer.unsubscribe()
  }

  resetTimer() {
    this.countDown = 10
  }

}
