import { Component, OnInit } from '@angular/core';
import { style, state, trigger, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
  animations: [
    trigger('rotate', [
      state('true', style({
        transform: 'rotate(0)'
      })),

      state('false', style({
        transform: 'rotate(360deg)'
      })),

      transition('true => false', animate('1000ms ease-in'))
    ])
  ]
})
export class SideNavComponent implements OnInit {

  constructor() { }

  state = false
  ngOnInit() {
    setInterval(() => {
      this.state = !this.state
    }, 1000)
  }

}
