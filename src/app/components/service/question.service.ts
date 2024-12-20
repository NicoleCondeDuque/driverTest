import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient)  { }

  getQuestionsJson() {
    return this.http.get<any>('/assets/questions.json');
  }
}