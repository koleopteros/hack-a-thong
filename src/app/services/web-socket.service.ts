import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WebSocketService {

  socket: any;
  readonly uri: string = "http://localhost:5000";

  constructor() {
    this.socket = io(this.uri);
   }

   public listen(eventName: string) {
     return new Observable((subscriber) => {
       this.socket.on(eventName, (data) => {
         subscriber.next(data);
       })
     })
   }

   public emit(eventName: string, data: any) {
     this.socket.emit(eventName, data);
   }
}
