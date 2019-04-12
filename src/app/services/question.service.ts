import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements OnInit{

  constructor(private http: HttpClient) { }

  baseUrl: string = environment.url2;


  ngOnInit() {
  }

  getQuizzes(bankOfQuestions) {
    this.http.get<any>(`${this.baseUrl}question/random`).subscribe(
      data => {
        data.forEach(quiz => bankOfQuestions.push(quiz))
      }
    )
  }
}
