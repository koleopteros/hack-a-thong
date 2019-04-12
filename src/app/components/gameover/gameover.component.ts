import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrls: ['./gameover.component.scss']
})
export class GameoverComponent implements OnInit {

  users = []
  constructor() { }

  ngOnInit() {
    for(var i =0 ; i< localStorage.length; i++) {
      console.log(localStorage.getItem(localStorage.key(i)))
      this.users.push({
        name: localStorage.key(i),
        score: localStorage.getItem(localStorage.key(i))
      })
    }
  }

}
