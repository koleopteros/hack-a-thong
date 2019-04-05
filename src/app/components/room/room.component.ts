import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  countDown: number = 10
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
