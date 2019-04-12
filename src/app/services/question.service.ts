import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuestionService implements OnInit{

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getQuizzes(bankOfQuestions) {
    this.http.get<any>('http://localhost:5000/question/random').subscribe(
      data => {
        data.forEach(quiz => bankOfQuestions.push(quiz))
      }
    )
  }
}
