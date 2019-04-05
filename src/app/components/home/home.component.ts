import { Component, OnInit } from '@angular/core';
import { trigger, style, state, animate, transition } from '@angular/animations';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

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
export class HomeComponent implements OnInit {

  state =false
  loginForm: FormGroup
  constructor(private builder: FormBuilder) { }

  ngOnInit() {
    setInterval(() => {
      this.state = !this.state
    }, 1000)

    this.loginForm = this.builder.group({
      nickname: ['', Validators.required],
      code: ['', Validators.required]
    })
  }

  get nickname() { return this.loginForm.get('nickname')}
  get code() { return this.loginForm.get('code')}

  toRoom() {
    window.location.assign('/room')
  }

}
