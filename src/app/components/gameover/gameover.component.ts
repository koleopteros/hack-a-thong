import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit {
  sortedScore = []
  sortedTime  = []
  constructor(private route : ActivatedRoute) {
  }

  ngOnInit() {
    let room = this.route.snapshot.paramMap.get('room')
    setTimeout(() =>{
    let data = JSON.parse(localStorage.getItem(room))
    data.forEach(el => {
      this.sortedTime.push(el)
      this.sortedScore.push(el)
    })
    this.sortedTime.sort((a,b) => {
      return a.time -b.time
    })

    this.sortedScore.sort((a,b) => {
      return b.score - a.score
     })
  }, 500)
  }

}
